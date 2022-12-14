import styled from 'styled-components';
import Comment from './Comment';
import BestAnswerMark from './BestAnswerMark';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getUserId } from '../getUserInfo';
const OpinionCard = ({
  id,
  likes,
  content,
  modifiedAt,
  writer,
  comment,
  questionId,
  isQuestion,
  handleQuestionEditMode,
  questionEditMode,
  setQuestionEditMode,
  title,
  questionWriter,
  questionBestAnswerId,
  //태그
  tagsArray,
  setStringTags,
  stringTags,
  setTagsArr,
  //좋아요
  likesPressedQuestionIdFromToken,
  likesPressedAnswersIdFromToken,
  answerLikes,
}) => {
  const commentInput = useRef();
  const themeState = useSelector((state) => state.themeSlice).theme;
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [answerEditMode, setAnswerEditMode] = useState(false);
  const [originalText, setOriginalText] = useState('');
  const [isClick, setIsClick] = useState(false);
  const [isAnswerClick, setIsAnswerClick] = useState(false);
  const [like, setLike] = useState(likes);
  const [answerLike, setAnswerLike] = useState(answerLikes);

  const userId = getUserId();
  const year = modifiedAt[0];
  const month = modifiedAt[1];
  const day = modifiedAt[2];
  const hour =
    modifiedAt[3] > 12
      ? '오후 ' + (modifiedAt[3] - 12)
      : '오전 ' + modifiedAt[3];
  const min = modifiedAt[4];
  const sec = modifiedAt[5];

  //태그
  const handleStringTags = (e) => {
    setStringTags(e.target.value);
  };

  useEffect(() => {
    setText(content);
    setOriginalText(content);
  }, [content]);

  // 답변, 질문 코멘트 작성
  const handleCommentSubmit = async (e, id) => {
    e.preventDefault();
    const enteredComment = commentInput.current.value;
    if (userId) {
      //입력값이 없을 경우
      if (!enteredComment) {
        alert('댓글 입력하세요');
        commentInput.current.value = '';
        return;
      }
      if (isQuestion) {
        await axios
          .post(`/questionComments/${id}`, {
            questionCommentWriterId: userId,
            questionCommentContent: enteredComment,
          })
          .then((res) => res)
          .catch((err) => err);
        commentInput.current.value = '';
        window.location.reload(`/questions/${questionId}`)
      } else {
        await axios
          .post(`/answerComments/${id}`, {
            answerCommentWriterId: userId,
            answerCommentContent: enteredComment,
          })
          .then((res) => res)
          .catch((err) => err);
        commentInput.current.value = '';
        window.location.reload(`/questions/${questionId}`)
      }
    } else {
      if (
        window.confirm(
          'You must be logged in to add a comment on Stack Overflow'
        )
      ) {
        navigate('/login');
        window.location.reload();
        return;
      }
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
  const handleQuestionEditSubmit = async () => {
    const response = await axios.patch(`/questions/${id}/edit`, {
      questionTitle: title,
      questionContent: text,
      questionTags: stringTags,
    });
    setQuestionEditMode(!questionEditMode);
    window.location.reload(`/questions/${questionId}`)
    return response;
  };

  //답변 수정
  const handleAnswerEditSubmit = async () => {
    const response = await axios.patch(`/answer/${id}/edit`, {
      answerContent: text,
    });
    setAnswerEditMode(!answerEditMode);
    window.location.reload(`/questions/${questionId}`)
    return response;
  };

  //질문, 답변 삭제
  const handleDelete = async () => {
    if (isQuestion) {
      try {
        if (window.confirm('Delete this question?')) {
          const response = await axios.delete(`/questions/${id}`);
          navigate('/');
          window.location.reload();
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
          const response = await axios.delete(`/answer/${id}`);
          window.location.reload(`/questions/${questionId}`)
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
    setText(e.target.value);
  };

  const handleAnswerEditMode = () => {
    setAnswerEditMode(!answerEditMode);
    setText(originalText);
  };

  //질문에 대한 Like관리 함수
  const handleQuestionLikes = async () => {
    if (userId) {
      const response = await axios.patch(`/questionLikes/${id}/${userId}`);

      if (likesPressedQuestionIdFromToken === 0) {
        if (isClick) {
          setLike(like - 1);
          setIsClick(!isClick);
        } else {
          setLike(like + 1);
          setIsClick(!isClick);
        }
      } else {
        if (isClick) {
          setLike(like + 1);
          setIsClick(!isClick);
        } else {
          setLike(like - 1);
          setIsClick(!isClick);
        }
      }

      return response;
    }
    navigate('/login');
    window.location.reload();
  };

  //답변에 대한 좋아요
  const handleAnswersLikes = async () => {
    if (userId) {
      const response = await axios.patch(`/answerLikes/${id}/${userId}`);

      if (likesPressedAnswersIdFromToken.includes(id)) {
        if (isAnswerClick) {
          setAnswerLike(answerLike + 1);
          setIsAnswerClick(!isAnswerClick);
        } else {
          setAnswerLike(answerLike - 1);
          setIsAnswerClick(!isAnswerClick);
        }
      } else {
        if (isAnswerClick) {
          setAnswerLike(answerLike - 1);
          setIsAnswerClick(!isAnswerClick);
        } else {
          setAnswerLike(answerLike + 1);
          setIsAnswerClick(!isAnswerClick);
        }
      }

      return response;
    }
    navigate('/login');
    window.location.reload();
  };

  return (
    <OpinionLayout>
      <OpinionContainer>
        <VoteContainer>
          {isQuestion ? (
            <>
              <LikesButton
                themeState={themeState}
                onClick={handleQuestionLikes}
              >
                <svg
                  class='svg-icon iconArrowUpLg'
                  width='2.4rem'
                  height='2.4rem'
                  viewBox='0 0 36 36'
                >
                  <path d='M2 25h32L18 9 2 25Z'></path>
                </svg>
              </LikesButton>
              <div>{like}</div>
            </>
          ) : (
            <>
              <LikesButton themeState={themeState} onClick={handleAnswersLikes}>
                <svg
                  class='svg-icon iconArrowUpLg'
                  width='2.4rem'
                  height='2.4rem'
                  viewBox='0 0 36 36'
                >
                  <path d='M2 25h32L18 9 2 25Z'></path>
                </svg>
              </LikesButton>
              <div>{answerLike}</div>
            </>
          )}
          {isQuestion ? (
            <></>
          ) : //답변에대해서
          userId === questionWriter ? (
            //작성자의 시점
            <BestAnswerMark
              isQuestionWriter={userId === questionWriter}
              isBestAnswer={questionBestAnswerId === id}
              questionId={questionId}
              id={id}
            /> //true / 참거짓
          ) : (
            //작성자가 아닐 시
            <BestAnswerMark isBestAnswer={questionBestAnswerId === id} />
          )}
        </VoteContainer>
        <OpinionContentContainer>
          <ContentContainer themeState={themeState}>
            {questionEditMode && isQuestion ? (
              <>
                {/* 질문수정모드 이면서 질문 일 때  */}
                <form>
                  <label id='editText' />
                  <textarea
                    id='editText'
                    value={text}
                    onChange={handleEditText}
                  />
                  <label id='input' />
                  <textarea
                    id='input'
                    value={stringTags}
                    onChange={handleStringTags}
                  />
                </form>
              </>
            ) : //질문수정모드가아닐때
            answerEditMode ? (
              <>
                {/*질문수정모드가 아니면서 질문이아니면서(답변이면서) 답변 수정모드 일 때*/}
                <form>
                  <label id='editText' />
                  <textarea
                    id='editText'
                    value={text}
                    onChange={handleEditText}
                  />
                </form>
              </>
            ) : isQuestion ? (
              <>
                {/*질문수정모드가 아닐 때, 답변수정모드도 아닐 */}
                <Content>{content}</Content>
                <div>
                  {tagsArray.map((el, key) => (
                    <Tag key={key} themeState={themeState}>
                      {el}
                    </Tag>
                  ))}
                </div>
              </>
            ) : (
              <>
                <Content>{content}</Content>
              </>
            )}
            <ContentInfoContainer>
              {userId === writer.userId ? (
                isQuestion ? (
                  questionEditMode ? (
                    <>
                      <EditWrapper themeState={themeState}>
                        <span onClick={() => handleQuestionEditSubmit()}>
                          수정하기
                        </span>
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
                      <span onClick={() => handleAnswerEditSubmit()}>
                        수정하기
                      </span>
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
                  <div id='writer'>{writer.userName}</div>
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
                    content={el.questionCommentContent}
                    modifiedAt={el.questionCommentModifiedAt}
                    isQuestion={isQuestion}
                  />
                ))
              : comment.map((el) => (
                  <Comment
                    key={el.answerCommentId}
                    id={el.answerCommentId}
                    writer={el.answerCommentWriter}
                    content={el.answerCommentContent}
                    modifiedAt={el.answerCommentModifiedAt}
                    likes={el.answerLikesCount}
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
    background-color: ${(props) =>
      props.themeState === 'light' ? '#FFFFFF' : '#2D2D2D'};
    border-radius: 0.3rem;
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
  div {
    color: hsl(206, 100%, 40%);
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

const LikesButton = styled.button`
  display: flex;
  border: none;
  background-color: transparent;

  svg {
    fill: ${(props) => (props.themeState === 'light' ? '#babfc4' : '#696f75')};
  }

  cursor: pointer;
`;

//tag

const Tag = styled.a`
  border: ${(props) =>
    props.themeState === 'light' ? '1px solid #ffffff' : 'none'};
  color: ${(props) =>
    props.themeState === 'light' ? 'hsl(205, 47%, 41%)' : '#CDE1EE'};
  background-color: ${(props) =>
    props.themeState === 'light' ? 'hsl(205, 46%, 92%)' : 'hsl(205,14%,28%)'};
  padding: 0.5rem 0.6rem;
  text-align: center;
`;

export default OpinionCard;
