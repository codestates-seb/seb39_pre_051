import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
    status:null,
    error:null,
    questionId: null,
    questionWriter: null,
    questionContent: null,
    questionLikes: null,
    questionCreatedAt: null,
    questionModifiedAt : null,
    questionTitle: null,
    questionComment: [],
    answer:[]
}

export const readQuestion = createAsyncThunk(
    'questions/readQuestion',
    async(questionId) => {
        const response =  await axios.get(`/questions/${questionId}`)
        const data = await response.data
        console.log(data)
        return data
    }
)

export const createAnswer = createAsyncThunk(
    'questions/createAnswer',
    async(answerData) => {
        const response = await axios.post(`/answer/${answerData.questionId}`,answerData.answer, {
            headers : answerData.token
        })
        const data = await response.data
        console.log(data)
        return data
    }
)

export const addQuestionComment = createAsyncThunk(
    'questions/addQuestionComment',
    async(questionCommentData) => {
        const response = await axios.post(`/questionComments/${questionCommentData.questionId}`,questionCommentData.questionComment, {
            headers : questionCommentData.token
        })
        const data = await response.data
        console.log(data)
        return data
    }
    // (questionCommentData) => {
    //     console.log(questionCommentData)
    // }
)

export const addAnswerComment = createAsyncThunk(
    'questions/addAnswerComment',
    // async(answerCommentData) => {
    //     const response = await axios.post('/url',answerCommentData.answerComment, {
    //         headers : answerCommentData.token
    //     })
    //     const data = await response.data
    //     return data
    // }
    (answerCommentData)=> {
        console.log(answerCommentData)
    }
)


export const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder.addCase(readQuestion.pending, (state,action)=>{
            state.status = 'Loading'
        })
        builder.addCase(readQuestion.fulfilled, (state, action) => {
            state.questionId = action.payload.questionId
            state.questionWriter = action.payload.questionWriter
            state.questionContent = action.payload.questionContent
            state.questionLikes = action.payload.questionLikes
            state.questionCreatedAt = action.payload.questionCreatedAt
            state.questionModifiedAt = action.payload.questionModifiedAt
            state.questionTitle = action.payload.questionTitle
            state.questionComment = action.payload.questionComment
            state.answer = action.payload.answer
        })
        builder.addCase(readQuestion.rejected, (state,action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        builder.addCase(createAnswer.pending, (state,action) => {
            state.status = 'Loading'
        })
        builder.addCase(createAnswer.fulfilled, (state,action) => {
            // state.answer.push(action.pay)
        })
    }
})

export const {} = questionSlice.actions
export default  questionSlice.reducer