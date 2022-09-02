import styled from 'styled-components';
import Comment from './Comment';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addQuestionComment, addAnswerComment} from '../redux/slice/questionSlice'

const OpinionCard = ({
  id,
  likes,
  content,
  modifiedAt,
  writer,
  comment,
  questionId,
  isQuestion,
}) => {
  const commentInput = useRef();
  const themeState = useSelector((state)=>state.themeSlice).theme
  const userState = useSelector((state)=>state.userInfoSlice)
  const dispatch = useDispatch()
  console.log(userState.email, email)
  const handleCommentSubmit =(e, id) => {
    e.preventDefault();
    const enteredComment = commentInput.current.value
    //입력값이 없을 경우
    if(!enteredComment){
      console.log('댓글 입력하세요');
      commentInput.current.value = ''
      return
    }
    if(isQuestion){
      console.log(`${id}번 질문에 대한 댓글 ${enteredComment}입니다.`)
      dispatch(addQuestionComment({questionId : id, questionComment : {
        // questionCommentWriter : userState.displayName,
        questionCommentWriter : userState.email,
        questionCommentContent : enteredComment,
        token : userState.token
      }}))
      commentInput.current.value = ''
    } else{
      console.log(`${questionId}번 질문 ${id}번 답변에 대한 댓글 ${enteredComment}입니다.`)
      dispatch(addAnswerComment({questionId, answerId : id, answerComment: {
        answerCommentWriter : userState.displayName,
        // answerCommentWriter : userState.email,
        answerCommentContent : enteredComment,
        token : userState.token
      }}))
      commentInput.current.value = ''
    }
  }
  
  const handleEnterPress = (e) => {
    if(e.key === 'Enter') {
      return (e) =>handleCommentSubmit()
    }else{
      return
    }
  }
  return (
    <OpinionLayout>
      <OpinionContainer>
        <VoteContainer>
          <button>⬆︎</button>
          <div>{likes}</div>
          <button>⬇︎</button>
        </VoteContainer>
        <OpinionContentContainer>
          <ContentContainer>
            <Content>{content}</Content>
            <ContentInfoContainer>
              {userState.email === email && <><span>edit</span><span>delete</span></>} 
              <ContentInfo themeState={themeState}>
                <InfoModified themeState={themeState}>{modifiedAt}</InfoModified>
                <InfoBox themeState={themeState}>
                  <img src='https://w7.pngwing.com/pngs/981/645/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol.png' alt='프로필사진'></img>
                  <div id='writer'>{writer}</div>
                </InfoBox>
              </ContentInfo>
            </ContentInfoContainer>
          </ContentContainer>
          <CommentLayout>
            {isQuestion
              ? comment.map((el) => (
                  <Comment
                    key={el.questionCommentId}
                    id={el.questionCommentId}
                    writer={el.questionCommentWriter}
                    email={el.questionCommentEmail}
                    content={el.questionCommentContent}
                    likes={el.questionCommentLikes}
                    modifiedAt={el.questionCommentModifiedAt}
                  />
                ))
              : comment.map((el) => (
                  <Comment
                    key={el.answerCommentId + 200}
                    id={el.answerCommentId}
                    writer={el.answerCommentWriter}
                    email={el.answerCommentEmail}
                    content={el.answerCommentContent}
                    likes={el.answerCommentLikes}
                    modifiedAt={el.answerCommentModifiedAt}
                  />
                ))}
          </CommentLayout>
          <AddCommentContainer themeState={themeState}>
            <form onSubmit={(e) => handleCommentSubmit(e, id)}>
              <input type='text' ref={commentInput} onKeyDown={handleEnterPress}></input>
              <button>Add a comment</button>
            </form>
            </AddCommentContainer>
        </OpinionContentContainer>
      </OpinionContainer>
    </OpinionLayout>
  );
};

const OpinionLayout = styled.div`
  width: 72.5rem;
  border-top: 1px solid #D6D9DC;
`;
const OpinionContainer = styled.div`
  display: flex;
`;


const VoteContainer = styled.div`
  margin: 1rem 1.6rem 1rem 1rem;
  div {
    text-align:center;
    font-size: 2.1rem;
    color: #6A737C;
    margin: 0.2rem;
  }
  button{
    margin: 0.2rem;
    height:3.6rem;
    width: 3.6rem;
  }
`;

const OpinionContentContainer = styled.div`
  width: 66.2rem;
`;


const ContentContainer = styled.div`
  font-size: 1.5rem;
  padding: 0 1.6rem 0 0;
  margin: 1rem 0;
`;

const Content = styled.div`
  margin: 1.5rem 0;
  
`;

const ContentInfoContainer = styled.div`
  display:flex;
  margin: 1.6rem 0;
  padding: 0.4rem 0 0 0;
  justify-content: space-between;
`

const ContentInfo = styled.div`
  width: 20rem;
  height: 6.72rem;
  border-radius: 0.3rem;
  font-size: 1.2rem;
  line-height: 1.7rem;
  background-color: #d9eaf7;
  background-color:${(props)=>props.themeState==='light' ? '#D9EAF7' : '#0C63A9'};
  padding: 0.5rem 0.6rem 0.7rem 0.7rem;
`;

const InfoModified = styled.div`
  color: #6a737c;
  color: ${(props)=> props.themeState ==='light' ? '#6a737c' : '#ACB3B9' };
  margin: 0.1rem 0px 0.4rem 0;
`

const InfoBox = styled.div`
  display: flex;
  img {
    height: 3.2rem;
    width: 3.2rem;
  }
  #writer {
    color: ${(props)=> props.themeState ==='light' ? ':hsl(206,100%,40%)' : '#2F9BFF'};
    font-size: 1.3rem;
    margin: 0 0 0 0.8rem;
  }
`;


const CommentLayout = styled.div`
  margin: 1.2rem 0 0 0;
`;

const AddCommentContainer = styled.div`
  font-size: 1.3rem;
  input{
    display: block;
    width:99%;
    border : 1px solid #D6D9DC;
    border-radius: 0.3rem;
    margin: 1rem 0 1rem 1rem;
  }
  button{
  color: ${(props)=>props.themeState === 'light' ? '#D6D9DC' : '#60666c'};
  background-color: ${(props)=>props.themeState==='light'? '#ffffff' : '#2D2D2D'};
  border: none;
  &:hover{
    color: #0a95ff;;
  }
}
`;

export default OpinionCard;