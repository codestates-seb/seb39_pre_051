import axios from 'axios';
import { useEffect, useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {readQuestion} from '../redux/slice/questionSlice'
const Comment = (props) => {
  const userState = useSelector((state)=>state.userInfoSlice)
  const themeState = useSelector((state)=>state.themeSlice).theme
  const dispatch = useDispatch();
  const questionState = useSelector((state)=>state.questionSlice)
  const {questionId} = questionState
  const [commentEditMode, setCommentEditMode] = useState(false)
  const [editedComment, setEditedComment] =useState('') 
  const [originalComment, setOriginalComment] = useState('')

  const handleDelete = async() => {
    console.log(props.id, props.isQuestion)
    if(props.isQuestion){
      console.log(`/questionComments/${props.id}`)
      const response = await axios.delete(`/questionComments/${props.id}`)
      dispatch(readQuestion(questionId))
      return response 
    } else{
      console.log(`/answerComments/${props.id}`)
      const response = await axios.delete(`/answerComments/${props.id}`)
      dispatch(readQuestion(questionId))
      return response 
    }
  }
  const year = props.modifiedAt[0] 
  const month = props.modifiedAt[1] 
  const day = props.modifiedAt[2] 
  const hour =
  props.modifiedAt[3] > 12
    ? '오후 ' + (props.modifiedAt[3] - 12)
    : '오전 ' + props.modifiedAt[3]
  const min = props.modifiedAt[4]
  const sec = props.modifiedAt[5]

  useEffect(() => {
    setEditedComment(props.content)
    setOriginalComment(props.content);
  }, [props.content]);

  const handleCommentEditMode = () => {
    console.log('hello', commentEditMode)
    setCommentEditMode(!commentEditMode)
    setEditedComment(originalComment);
  }

  const handleEditComment = (e) => {
    console.log(e.target.value)
    setEditedComment(e.target.value)
  }

  const handleCommentEditSubmit = async() => {
    if(props.isQuestion){
      //질문의 댓글 수정
      const response = await axios.patch(`/questionComments/${props.id}/edit`,{
        questionCommentContent : editedComment
      })
      handleCommentEditMode()
      dispatch(readQuestion(questionId))
      return response
    }else{
      const response = await axios.patch(`/answerComments/${props.id}/edit`,{
        answerCommentContent : editedComment
      })
      handleCommentEditMode()
      dispatch(readQuestion(questionId))
      return response
    }
  }

  return (
    <CommentLayout key={props.id}>
      <CommetnLikes>
        <span>{props.likes}</span>
      </CommetnLikes>
      <CommentContainer>
        {commentEditMode ? (
          <>
          <form>
            <label id='editComment' />
            <input id='editComment' value={editedComment} onChange={handleEditComment}/>
          </form>
          </>
        ) : (
          <>
          <CommentSpan id='content'>{props.content}</CommentSpan>
          </>
        )}
        <CommentInfo>
          {' '}
          - <a href='/'> {props.writer}</a>
          <CommentSpan id='modifiedAt'>{`${year}년 ${month}월 ${day}일 ${hour}시 ${min}분 ${sec}초`}</CommentSpan>
          {/* {userState.email===props.email && (
            <>
            <CommentSpan id='editdelete' themeState={themeState} onClick={()=>handleCommentEditMode()}>edit</CommentSpan>
            <CommentSpan id='editdelete' themeState={themeState} onClick={() =>handleDelete() }>delete</CommentSpan>
            </>
          )} */}
          {userState.email===props.email ? 
    commentEditMode ? (
        <>
        <CommentSpan id='editdelete' themeState={themeState} onClick={()=>handleCommentEditSubmit()}>수정하기</CommentSpan>
        <CommentSpan id='editdelete' themeState={themeState} onClick={() =>handleCommentEditMode() }>cancel</CommentSpan>
        </>
    ) : (
        <>
        <CommentSpan id='editdelete' themeState={themeState} onClick={()=>handleCommentEditMode()}>edit</CommentSpan>
        <CommentSpan id='editdelete' themeState={themeState} onClick={() =>handleDelete() }>delete</CommentSpan>
        </>
    )
    : (
        <>
        </>
    )
}
        </CommentInfo>
      </CommentContainer>
    </CommentLayout>
  );
};

const CommentLayout = styled.div`
  display: flex;
  width: 66.2rem;
  border-top: 0.1rem solid #e3e6e8;
  font-size: 1.3rem;
`;

const CommetnLikes = styled.div`
  padding: 0.6rem 0.2rem 0.6rem 0;
  color: #f48225;
  span {
    line-height: 1.7rem;
  }
`;

const CommentContainer = styled.div`
  border-bottom: 0.1rem  solid #e3e6e8;
  width: 100%;
  padding: 0.6rem;
  line-height: 1.82rem;
`;

const CommentSpan = styled.span`
  &#content {
    margin-right: 0.3rem;
  }
  &#modifiedAt {
    font-size: 1rem;
    color: #9199a1;
  }
  &#editdelete{
    font-size: 1rem;
    margin: 0 0.1rem;
    color: ${(props)=> props.themeState ==='light' ? '#6a737c' : '#ACB3B9' };
    :hover{
      color: ${(props)=> props.themeState ==='light' ? '#0a95ff' : '#9FA6Ad' };
    }
  }
`;

const CommentInfo = styled.div`
  display: inline-flex;
  text-align: left;
  a {
    margin-left: 0.3rem;
    text-decoration: none;
    color: hsl(206, 100%, 40%);
  }
`;

export default Comment;
