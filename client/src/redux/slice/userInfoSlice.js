import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialToken = localStorage.getItem('token');
const initialEmail = localStorage.getItem('email');
const initialName = localStorage.getItem('memberName');
const initailId = localStorage.getItem('memberId');
const LOGIN_URL = '/users/login';

export const logIn = createAsyncThunk('userInfo/logIn', async (loginInfo) => {
  console.log(loginInfo);
  const response = await axios.post(LOGIN_URL, loginInfo);
  const data = await response.data;
  return data;
});

let initialState = {
  status: null,
  error: null,
  // isLoggedIn: !!initialToken,
  isLoggedIn: false,
  memberId: 100,
  memberName: initialName,
  // email: initialEmail,
  email:'test1@gmail.com',
  profileImage:
    'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png',
  token: initialToken,
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    logOut: (state, action) => {
      state.memberName = null;
      state.email = null;
      // state.profileImage = null
      state.token = null;
      state.memberId = null;
      state.isLoggedIn = false;
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('memberName');
      localStorage.removeItem('memberId');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logIn.pending, (state, action) => {
      state.status = 'Loading';
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      console.log(action.payload);
      // state.profileImage = action.payload.memberProfileImage
      // state.token = action.payload.memberToken
      localStorage.setItem('email', action.payload.userEmail);
      localStorage.setItem('memberName', action.payload.memberName);
      localStorage.setItem('memberId', action.payload.memberId);
      localStorage.setItem('token', '1234');
      state.memberId = action.payload.memberId;
      state.memberName = action.payload.memberName;
      state.email = action.payload.userEmail;
      state.token = '1234';
      state.isLoggedIn = true;
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export const { logOut } = userInfoSlice.actions;
export default userInfoSlice.reducer;
