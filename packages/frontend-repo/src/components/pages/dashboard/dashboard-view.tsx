'use client';

import type { User } from '@repo/shared';
import type { RootState, AppDispatch } from 'src/store';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { getUserData } from 'src/store/slice/user';

import { AnimateLogo1 } from 'src/components/atoms/animate';
import { DashboardContent } from 'src/components/templates/dashboard';
import { UserCardList } from 'src/components/organisms/user-card-list';

// ----------------------------------------------------------------------

export function DashboardView() {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.user);

  const { items, ...pagination } = data?.responseObject || {};

  return (
    <DashboardContent maxWidth="xl">
      <Stack spacing={3} alignItems="start">
        <Typography variant="h4"> User List </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch(getUserData({ page: 1 }))}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Fetch Users'}
        </Button>

        {error && (
          <Typography color="error">
            {typeof error === 'object' && error?.message ? error.message : (error as string)}
          </Typography>
        )}

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ margin: 'auto', my: 2 }}
        >
          {loading && <AnimateLogo1 />}

          {data && !loading && (
            <UserCardList
              users={items as User[]}
              pagination={pagination}
              handleChangePage={(page) => {
                dispatch(getUserData({ page }));
              }}
            />
          )}
        </Box>
      </Stack>
    </DashboardContent>
  );
}
