import type { User, ServiceResponseObj, PaginationResponse } from '@repo/shared';

export type UserState = {
  data: ServiceResponseObj<PaginationResponse<User>> | null;
  loading: boolean;
  error: string | { message: string } | null;
};
