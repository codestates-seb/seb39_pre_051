import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialToken = localStorage.getItem('token')
const initialEmail = localStorage.getItem('emil')
const LOGIN_URL = '/users/login'
export const logIn = createAsyncThunk(
    'userInfo/logIn',
    async (loginInfo) => {
        console.log(loginInfo)
        const response = await axios.post(LOGIN_URL, loginInfo)
        const data = await response.data
        return data
    }
)


let initialState = {
    status : null,
    error: null,
    isLoggedIn : !!initialToken, 
    memberName : null,
    email : initialEmail,
    profileImage:'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png',
    token : initialToken
}



export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        logOut:(state, action) => {
            state.memberName = null
            state.email = null
            // state.profileImage = null
            state.token = null
            state.isLoggedIn = false
            localStorage.removeItem('token')
            localStorage.removeItem('emil')
        }
    },
    extraReducers: (builder) => {
        builder.addCase(logIn.pending, (state, action) => {
            state.status = 'Loading'
        })
        builder.addCase(logIn.fulfilled,(state, action) => {
            console.log(action.payload)
            state.memberName = action.payload.memberName
            state.email  = action.payload.memberEmail
            // state.profileImage = action.payload.memberProfileImage
            // state.token = action.payload.memberToken
            localStorage.setItem('emil',action.payload.memberEmail)
            localStorage.setItem('token', '1234')
            state.token = '1234'
            state.isLoggedIn = true
        })
        builder.addCase(logIn.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    }
})

export const {logOut} = userInfoSlice.actions
export default userInfoSlice.reducer
