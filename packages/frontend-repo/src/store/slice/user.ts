import type { User } from '@repo/shared';
import type { UserState } from 'src/types/user';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchUserData, updateUserData } from 'src/apis/user';

// ----------------------------------------------------------------

export const getUserData = createAsyncThunk(
  'user/fetchUser',
  async ({ page }: { page: string | number }, { rejectWithValue }) => {
    try {
      const response = await fetchUserData(page);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ userId, data }: { userId: string; data: User }, { rejectWithValue }) => {
    try {
      const response = await updateUserData(userId, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ----------------------------------------------------------------

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch user list
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update user data
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
