import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

let initialState = {
  status: 'null',
  isLoggedIn: false,
  displayName: 'changhoon',
  profileImage:
    'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png',
  token: null,
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {},
});

export const { logOut } = userInfoSlice.actions;
export default userInfoSlice.reducer;
