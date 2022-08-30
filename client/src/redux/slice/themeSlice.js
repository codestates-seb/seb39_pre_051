import { createSlice } from "@reduxjs/toolkit";
const initialTheme = localStorage.getItem('theme') || 'dark';

let initialState = {
    theme : initialTheme,
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: (state, action) => {
            state.theme = action.payload
        }
    }
})

export const {changeTheme} = themeSlice.actions
export default themeSlice.reducer