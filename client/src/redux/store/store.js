import { configureStore } from '@reduxjs/toolkit';
import questionSlice from '../slice/questionSlice';
import themeSlice from '../slice/themeSlice';
import userInfoSlice from '../slice/userInfoSlice';

export const store = configureStore({
  reducer: {
    themeSlice,
    userInfoSlice,
    questionSlice
  },
});
