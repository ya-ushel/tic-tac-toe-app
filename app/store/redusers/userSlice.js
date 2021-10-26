import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    login: state => {
      state.user = 'test';
    },
  },
});

export const { login } = userSlice.actions;

export const userReducer = userSlice.reducer;

export default userSlice;
