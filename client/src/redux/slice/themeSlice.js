import { createSlice } from '@reduxjs/toolkit';
const initialTheme = localStorage.getItem('theme') || 'light';
let initialState = {
  theme: initialTheme,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state, action) => {
      if (state.theme === 'light') {
        state.theme = 'dark';
        window.localStorage.setItem('theme', 'dark');
      } else {
        state.theme = 'light';
        window.localStorage.setItem('theme', 'light');
      }
    },
    lightTheme: (state, action) => {
      state.theme = 'light';
      window.localStorage.setItem('theme', 'light');
    },
    darkTheme: (state, action) => {
      state.theme = 'dark';
      window.localStorage.setItem('theme', 'dark');
    },
  },
});

export const { toggleTheme, lightTheme, darkTheme } = themeSlice.actions;
export default themeSlice.reducer;
