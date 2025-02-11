import axios, { fetcher, endpoints } from 'src/utils/axios';

// Fetch user data
export const fetchUserData = async (page: string | number) => {
  try {
    const url = `${endpoints.user.fetch}?page=${page || 1}`;
    return await fetcher(url);
  } catch (error) {
    throw new Error(error?.message || 'Failed to fetch user data');
  }
};

// Update user data
export const updateUserData = async (userId: string, data: Record<string, unknown>) => {
  try {
    const response = await axios.patch(`${endpoints.user.update}?userId=${userId}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error?.message || 'Failed to update user data');
  }
};
