import { configureStore } from '@reduxjs/toolkit';
import questionSlice from '../slice/questionSlice';
import themeSlice from '../slice/themeSlice';

export const store = configureStore({
  reducer: {
    themeSlice,
    questionSlice
  },
});
