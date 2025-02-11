import type { User, PaginationResponse } from '@repo/shared';

import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

import { UserCard } from 'src/components/molecules/user-card';

// ----------------------------------------------------------------------

type Props = {
  users: User[];
  pagination: Partial<PaginationResponse<User>>;
  handleChangePage: (page: number) => void;
};

export function UserCardList({ users, pagination, handleChangePage }: Readonly<Props>) {
  const rowsPerPage = 12;

  return (
    <>
      <Box
        gap={4}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
      >
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </Box>

      <Pagination
        page={pagination.currentPage ?? 1}
        shape="circular"
        count={
          pagination.totalPages
            ? Math.ceil((pagination.totalItems ?? 0) / (pagination.limit ?? rowsPerPage))
            : 1
        }
        onChange={(_, value) => {
          handleChangePage(value);
        }}
        sx={{ mt: { xs: 5, md: 8 }, mx: 'auto' }}
      />
    </>
  );
}
