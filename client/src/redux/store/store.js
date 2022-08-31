import { configureStore } from '@reduxjs/toolkit';
import themeSlice from '../slice/themeSlice';
import userInfoSlice  from '../slice/useInfoSlice';

export const store = configureStore({
  reducer: {
    themeSlice,
    userInfoSlice
  },
});
