import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
    status:null,
    error:null,
    questionId: null,
    questionWriterId: null,
    questionContent: null,
    questionLikes: null,
    questionCreatedAt: null,
    questionModifiedAt : null,
    questionTitle: null,
    questionQuestionComments: [],
    questionAnswers:[]
}

//질문 R
export const readQuestion = createAsyncThunk(
    'questions/readQuestion',
    async(questionId) => {
        const response =  await axios.get(`/questions/${questionId}`)
        const data = await response.data.data
        console.log(data)
        return data
    }
)

//답변 C
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
        console.log(questionCommentData.questionId,{"questionCommentWriterId" : questionCommentData.questionComment.questionCommentWriterId,
        "questionCommentContent" : questionCommentData.questionComment.questionCommentContent})
        const response = await axios.post(`/questionComments/${questionCommentData.questionId}`,questionCommentData.questionComment)
        const data = await response.data
        console.log(data)
        return data
    }
)

export const addAnswerComment = createAsyncThunk(
    'questions/addAnswerComment',
    async(answerCommentData) => {
        console.log(answerCommentData)
        const response = await axios.post(`/answerComments/${answerCommentData.answerId}`,answerCommentData.answerComment)
        const data = await response.data
        return data
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
            state.questionWriterId = action.payload.questionWriterId
            state.questionContent = action.payload.questionContent
            state.questionLikes = action.payload.questionLikes
            state.questionCreatedAt = action.payload.questionCreatedAt
            state.questionModifiedAt = action.payload.questionModifiedAt
            state.questionTitle = action.payload.questionTitle
            state.questionQuestionComments = action.payload.questionQuestionComments
            state.questionAnswers = action.payload.questionAnswers
            // console.log(action.payload.data)
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

// export const {} = questionSlice.actions
export default  questionSlice.reducer