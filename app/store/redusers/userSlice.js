import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { data: null },
  reducers: {
    login: (state, action) => {
      state.data = action.payload;
    },
    update: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { login, update } = userSlice.actions;

export const userReducer = userSlice.reducer;

export default userSlice;
