import type { PaginationResponse, User } from "@repo/shared";

import { StatusCodes } from "http-status-codes";

import { calculateScore } from "@repo/shared";
import { ServiceResponse } from "../common/models/serviceResponse";
import { db } from "../config/firebaseConfig";
import { logger } from "../core/app";

// ----------------------------------------------------------------

const USERS_COLLECTION = "USERS";

export const updateUserData = async (
  userId: string,
  userData: Partial<User>
): Promise<ServiceResponse<User | null>> => {
  try {
    const userRef = db.collection(USERS_COLLECTION).doc(userId);
    await userRef.update(userData);

    const updatedUser = await userRef.get();
    return ServiceResponse.success<User>(
      "User updated",
      updatedUser.data() as User
    );
  } catch (ex) {
    const errorMessage = `Error updating user: ${(ex as Error).message}`;
    logger.error(errorMessage);
    return ServiceResponse.failure(
      "An error occurred while updating user.",
      null,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const fetchUserData = async (
  page: number,
  limit: number
): Promise<ServiceResponse<PaginationResponse<User> | null>> => {
  try {
    const offset = (page - 1) * limit;

    const usersSnapshot = await db.collection(USERS_COLLECTION).get();
    const totalUsers = usersSnapshot.size;
    const totalPages = Math.ceil(totalUsers / limit);

    if (page < 1 || page > totalPages) {
      return ServiceResponse.failure(
        "Invalid page number",
        null,
        StatusCodes.BAD_REQUEST
      );
    }

    const users: User[] = usersSnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as User
    );

    // Find the min and max epoch times for normalization
    const minRecentlyActive = Math.min(
      ...users.map((user) => user.recentlyActive ?? 0)
    );
    const maxRecentlyActive = Math.max(
      ...users.map((user) => user.recentlyActive ?? 0)
    );
    const rangeRecentlyActive = maxRecentlyActive - minRecentlyActive;

    // calculate score for each user
    for (const user of users) {
      user.normalizedRecentlyActive =
        (user.recentlyActive ?? 0 - minRecentlyActive) / rangeRecentlyActive;
      user.score = calculateScore(user);
    }

    users.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

    const paginatedUsers = users.slice(offset, offset + limit);

    if (paginatedUsers.length === 0) {
      return ServiceResponse.failure(
        "No Users found",
        null,
        StatusCodes.NOT_FOUND
      );
    }

    return ServiceResponse.success<{
      items: User[];
      totalPages: number;
      totalItems: number;
      currentPage: number;
      limit: number;
    }>("Users found", {
      items: paginatedUsers,
      totalPages,
      totalItems: totalUsers,
      currentPage: page,
      limit,
    });
  } catch (ex) {
    const errorMessage = `Error finding all users: ${(ex as Error).message}`;
    logger.error(errorMessage);
    return ServiceResponse.failure(
      "An error occurred while retrieving users.",
      null,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// export const fetchUserData = async (): Promise<ServiceResponse<User[] | null>> => {
//   try {
//     const usersRef = db.collection(USERS_COLLECTION);
//     const snapshot = await usersRef.get();

//     if (snapshot.empty) {
//       return ServiceResponse.failure("No Users found", null, StatusCodes.NOT_FOUND);
//     } else {
//       const users: User[] = [];
//       snapshot.forEach((doc) => {
//         users.push({ id: doc.id, ...doc.data() } as User);
//       });

//       return ServiceResponse.success<User[]>("Users found", users);
//     }
//   } catch (ex) {
//     const errorMessage = `Error finding all users: $${(ex as Error).message}`;
//     logger.error(errorMessage);
//     return ServiceResponse.failure(
//       "An error occurred while retrieving users.",
//       null,
//       StatusCodes.INTERNAL_SERVER_ERROR,
//     );
//   }
// };

export const bulkInsertUser = async (
  users: User[]
): Promise<ServiceResponse<User[] | null>> => {
  try {
    const batch = db.batch();
    const usersRef = db.collection(USERS_COLLECTION);

    for (const user of users) {
      const userRef = usersRef.doc();
      batch.set(userRef, user);
    }

    await batch.commit();
    return ServiceResponse.success<User[]>("Users created", users);
  } catch (ex) {
    const errorMessage = `Error creating users: ${(ex as Error).message}`;
    logger.error(errorMessage);
    return ServiceResponse.failure(
      "An error occurred while creating users.",
      null,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
