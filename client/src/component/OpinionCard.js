import styled from 'styled-components';
import Comment from './Comment';
import BestAnswerMark from './BestAnswerMark';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readQuestion } from '../redux/slice/questionSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OpinionCard = ({
  id,
  likes,
  content,
  modifiedAt,
  writer,
  email,
  comment,
  questionId,
  isQuestion,
  handleQuestionEditMode,
  questionEditMode,
  setQuestionEditMode,
  title,
  questionWriter,
  questionBestAnswerId
}) => {
  const commentInput = useRef();
  const themeState = useSelector((state) => state.themeSlice).theme;
  const userState = useSelector((state) => state.userInfoSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [answerEditMode, setAnswerEditMode] = useState(false);
  const [originalText, setOriginalText] = useState('')
  const year = modifiedAt[0];
  const month = modifiedAt[1];
  const day = modifiedAt[2];
  const hour =
    modifiedAt[3] > 12
      ? '오후 ' + (modifiedAt[3] - 12)
      : '오전 ' + modifiedAt[3];
  const min = modifiedAt[4];
  const sec = modifiedAt[5];


  useEffect(() => {
    setText(content);
    setOriginalText(content);
  }, [content]);

  // 답변, 질문 코멘트 작성
  const handleCommentSubmit = async(e, id) => {
    e.preventDefault();
    const enteredComment = commentInput.current.value;
    if(window.confirm('You must be logged in to add a comment on Stack Overflow')){
      navigate('/login')
      return
    }
    //입력값이 없을 경우
    if (!enteredComment) {
      alert('댓글 입력하세요');
      commentInput.current.value = '';
      return;
    }
    if (isQuestion) {
      console.log(`${id}번 질문에 대한 댓글 ${enteredComment}입니다.`);
      console.log(typeof enteredComment);
      await axios
        .post(`/questionComments/${id}`, {
          questionCommentWriterId: 1,
          questionCommentContent: enteredComment,
        })
        .then((res) => console.log(res))
        .catch((err) => {
          console.log(err);
        });
      commentInput.current.value = '';
      dispatch(readQuestion(questionId));
    } else {
      console.log(
        `${questionId}번 질문 ${id}번 답변에 대한 댓글 ${enteredComment}입니다.`
      );
      await axios
        .post(`/answerComments/${id}`, {
          answerCommentWriterId: 2,
          answerCommentContent: enteredComment,
        })
        .then((res) => console.log(res))
        .catch((err) => {
          console.log(err);
        });
      commentInput.current.value = '';
      dispatch(readQuestion(questionId));
    }
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      return (e) => handleCommentSubmit();
    } else {
      return;
    }
  };


  //질문 수정
  const handelQuestionEditSubmit = async () => {
    const response = await axios.patch(`/questions/${id}/edit`, {
      questionTitle: title,
      questionContent: text,
    });
    setQuestionEditMode(!questionEditMode);
    dispatch(readQuestion(id));
    return response;
  };

  //답변 수정
  const handleAnswerEditSubmit = async () => {
    const response = await axios.patch(`/answer/${id}/edit`, {
      answerContent: text,
    });
    setAnswerEditMode(!answerEditMode);
    dispatch(readQuestion(questionId));
    return response;
  };

  //질문, 답변 삭제
  const handleDelete = async () => {
    if (isQuestion) {
      try {
        if (window.confirm('Delete this question?')) {
          console.log(`${id}번 질문 삭제 입니다.`);
          const response = await axios.delete(`/questions/${id}`);
          navigate('/');
          return response;
        } else {
          return;
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        if (window.confirm('Delete this post?')) {
          console.log(`${questionId}번 질문의 ${id}번 답변 삭제 버튼입니다. `);
          const response = await axios.delete(`/answer/${id}`);
          dispatch(readQuestion(questionId));
          return response;
        } else {
          return;
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  const handleEditText = (e) => {
    console.log(e.target.value);
    setText(e.target.value);
  };

  const handleAnswerEditMode = () => {
    setAnswerEditMode(!answerEditMode);
    setText(originalText);
  };

// console.log(email===userState.email, isQuestion)
  return (
    <OpinionLayout>
      <OpinionContainer>
        <VoteContainer>
          <button>⬆︎</button>
          <div>{likes}</div>
          <button>⬇︎</button>
          {isQuestion ? (
            <></>
          ) : 
          //답변에대해서
          userState.email === questionWriter ? (
            //작성자의 시점
            <BestAnswerMark
              isQuestionWriter={userState.email === questionWriter}
              isBestAnswer={questionBestAnswerId === id}
              questionId={questionId}
              id={id}
            /> //true / 참거짓
          ) : (
            //작성자가 아닐 시
            <BestAnswerMark
              isBestAnswer={questionBestAnswerId === id}
            />
          ) 
          }
        </VoteContainer>
        <OpinionContentContainer>
          <ContentContainer themeState={themeState}>
            {questionEditMode && isQuestion ? (
              <>
                {/* 질문수정모드 이면서 질문 일 때  */}
                <form>
                  <label id='editText'/>
                  <textarea id='editText'value={text} onChange={handleEditText}/>
                </form>
              </>
            ) : //질문수정모드가아닐때
            answerEditMode ? (
              <>
                {/*질문수정모드가 아니면서 질문이아니면서(답변이면서) 답변 수정모드 일 때*/}
                <form>
                  <label id='editText'/>
                  <textarea id='editText' value={text} onChange={handleEditText}/>
                </form>
              </>
            ) : (
              <>
                    {/*질문수정모드가 아닐 때, 답변수정모드도 아닐 */}
                    <Content>{content}</Content>
                    </>
            )}
            <ContentInfoContainer>
              {userState.email === email ? (
                isQuestion ? (
                  questionEditMode ? (
                    <>
                      <EditWrapper themeState={themeState}>
                        <span onClick={() => handelQuestionEditSubmit()}>수정하기</span>
                        <span onClick={() => handleQuestionEditMode()}>
                          cancel
                        </span>
                      </EditWrapper>
                    </>
                  ) : (
                    <>
                      <EditWrapper themeState={themeState}>
                        <span onClick={() => handleQuestionEditMode()}>
                          edit
                        </span>
                        <span onClick={() => handleDelete()}>delete</span>
                      </EditWrapper>
                    </>
                  )
                ) : answerEditMode ? (
                  <>
                    <EditWrapper themeState={themeState}>
                    <span onClick={()=>handleAnswerEditSubmit()}>수정하기</span>
                      <span onClick={() => handleAnswerEditMode()}>cancel</span>
                    </EditWrapper>
                  </>
                ) : (
                  <>
                    <EditWrapper themeState={themeState}>
                      <span onClick={() => handleAnswerEditMode()}>edit</span>
                      <span onClick={() => handleDelete()}>delete</span>
                    </EditWrapper>
                  </>
                )
              ) : (
                <>
                  {/* 로그인상태가 아니거나, 자신이 작성한게 아닐 때 */}
                  <EditWrapper themeState={themeState}>
                    <span></span>
                    <span></span>
                  </EditWrapper>
                </>
              )}

              <ContentInfo themeState={themeState}>
                <InfoModified themeState={themeState}>
                  {`${year}년 ${month}월 ${day}일 ${hour}시 ${min}분 ${sec}초`}
                </InfoModified>
                <InfoBox themeState={themeState}>
                  <img
                    src='https://w7.pngwing.com/pngs/981/645/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol.png'
                    alt='프로필사진'
                  ></img>
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
                    writer={el.questionCommentWriter.userName}
                    email='test1@gmail.com'
                    content={el.questionCommentContent}
                    // likes={el.questionCommentLikes}
                    modifiedAt={el.questionCommentModifiedAt}
                    isQuestion={isQuestion}
                  />
                ))
              : comment.map((el) => (
                  <Comment
                    key={el.answerCommentId}
                    id={el.answerCommentId}
                    writer={el.answerCommentWriter.userName}
                    // email={el.answerCommentEmail}
                    email='test1@gmail.com'
                    content={el.answerCommentContent}
                    modifiedAt={el.answerCommentModifiedAt}
                    isQuestion={isQuestion}
                  />
                ))}
          </CommentLayout>
          <AddCommentContainer themeState={themeState}>
            <form onSubmit={(e) => handleCommentSubmit(e, id)}>
              <input
                type='text'
                ref={commentInput}
                onKeyDown={handleEnterPress}
              ></input>
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
  border-top: 1px solid #d6d9dc;
`;
const OpinionContainer = styled.div`
  display: flex;
`;

const VoteContainer = styled.div`
  margin: 1rem 1.6rem 1rem 1rem;
  div {
    text-align: center;
    font-size: 2.1rem;
    color: #6a737c;
    margin: 0.2rem;
  }
  button {
    margin: 0.2rem;
    height: 3.6rem;
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
  textarea {
    width: 100%;
    border: 1px solid #d6d9dc;
    color: ${(props) => (props.themeState === 'light' ? '#0c0d0e' : '#F2F2F3')};
    background-color: ${(props) =>props.themeState === 'light' ? '#FFFFFF' : '#2D2D2D'};
    border-radius:0.3rem;
  }
`;

const Content = styled.div`
  margin: 1.5rem 0;
`;

const ContentInfoContainer = styled.div`
  display: flex;
  margin: 1.6rem 0;
  padding: 0.4rem 0 0 0;
  justify-content: space-between;
`;
const EditWrapper = styled.div`
  span {
    cursor: pointer;
    margin-right: 1rem;
    font-size: 1.3rem;
    color: ${(props) => (props.themeState === 'light' ? '#6a737c' : '#ACB3B9')};
    :hover {
      color: ${(props) =>
        props.themeState === 'light' ? '#0a95ff' : '#9FA6Ad'};
    }
  }
`;

const ContentInfo = styled.div`
  width: 20rem;
  height: 6.72rem;
  border-radius: 0.3rem;
  font-size: 1.2rem;
  line-height: 1.7rem;
  background-color: #d9eaf7;
  background-color: ${(props) =>
    props.themeState === 'light' ? '#D9EAF7' : '#0C63A9'};
  padding: 0.5rem 0.6rem 0.7rem 0.7rem;
`;

const InfoModified = styled.div`
  color: #6a737c;
  color: ${(props) => (props.themeState === 'light' ? '#6a737c' : '#ACB3B9')};
  margin: 0.1rem 0px 0.4rem 0;
`;

const InfoBox = styled.div`
  display: flex;
  img {
    height: 3.2rem;
    width: 3.2rem;
  }
  #writer {
    color: ${(props) =>
      props.themeState === 'light' ? ':hsl(206,100%,40%)' : '#2F9BFF'};
    font-size: 1.3rem;
    margin: 0 0 0 0.8rem;
  }
  div{
    color : hsl(206, 100%, 40%);
  }
`;

const CommentLayout = styled.div`
  margin: 1.2rem 0 0 0;
`;

const AddCommentContainer = styled.div`
  font-size: 1.3rem;
  input {
    display: block;
    width: 99%;
    border: 1px solid #d6d9dc;
    border-radius: 0.3rem;
    margin: 1rem 0 1rem 1rem;
  }
  button {
    color: ${(props) => (props.themeState === 'light' ? '#D6D9DC' : '#60666c')};
    background-color: ${(props) =>
      props.themeState === 'light' ? '#ffffff' : '#2D2D2D'};
    border: none;
    &:hover {
      color: #0a95ff;
    }
  }
`;

export default OpinionCard;
