import styled from 'styled-components';
import TopBar from '../component/TopBar';
import SideBar from '../component/SideBar';
import Footer from '../component/Footer';
import OpinionCard from '../component/OpinionCard';
import { useParams } from 'react-router-dom';
import AskBtn from '../component/AskBtn';
import AddAnswer from '../component/AddAnswer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { readQuestion } from '../redux/slice/questionSlice';
import SideBarWidget from '../component/SideBarWidget';

const Question = () => {
  const [questionEditMode, setQuestionEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [originalTitle, setOriginalTitle] = useState('');
  const params = useParams();
  const themeState = useSelector((state) => state.themeSlice).theme;
  const questionState = useSelector((state) => state.questionSlice);
  const dispatch = useDispatch();

  const {
    questionId,
    questionWriterId,
    questionContent,
    questionLikesCount,
    questionCreatedAt,
    questionModifiedAt,
    questionTitle,
    questionQuestionComments,
    questionAnswers,
    questionBestAnswerId,
    questionWriter,
  } = questionState;

  useEffect(() => {
    dispatch(readQuestion(params.questionId));
    setTitle(questionTitle);
    setOriginalTitle(questionTitle);
  }, [dispatch, params.questionId, questionTitle]);

  let year = null;
  let month = null;
  let day = null;
  let hour = null;
  let min = null;
  let sec = null;

  if (questionCreatedAt !== null) {
    year = questionCreatedAt[0];
    month = questionCreatedAt[1];
    day = questionCreatedAt[2];
    hour =
      questionCreatedAt[3] > 12
        ? '오후 ' + (questionCreatedAt[3] - 12)
        : '오전 ' + questionCreatedAt[3];
    min = questionCreatedAt[4];
    sec = questionCreatedAt[5];
  }

  const handelEditTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleQuestionEditMode = () => {
    setQuestionEditMode(!questionEditMode);
    setTitle(questionTitle);
  };
  return (
    <>
      <TopBar />
      <Container>
        <SideBar pageName={'Questions'} />
        <Content>
          <TitleLayout>
            <TitleContainer>
              <Title themeState={themeState}>
                {questionEditMode ? (
                  <form>
                    <label id='editText'></label>
                    <textarea
                      id='editText'
                      value={title}
                      onChange={handelEditTitle}
                    />
                  </form>
                ) : (
                  <>
                    <a href='/questions/questionId'>{questionTitle}</a>
                  </>
                )}
              </Title>
              <AskBtn />
            </TitleContainer>
            <CreatedAt themeState={themeState}>
              {`${year}년 ${month}월 ${day}일 ${hour}시 ${min}분 ${sec}초`}
            </CreatedAt>
          </TitleLayout>
          <OpinionCard
            key={questionId}
            id={questionId}
            likes={questionLikesCount}
            content={questionContent}
            modifiedAt={questionModifiedAt}
            writer={questionWriter}
            //email 필요없을지도
            // email={questionWriter.userEmail}
            comment={questionQuestionComments}
            isQuestion={true}
            questionEditMode={questionEditMode}
            setQuestionEditMode={setQuestionEditMode}
            handleQuestionEditMode={handleQuestionEditMode}
            title={title}
            questionBestAnswerId={questionBestAnswerId}
          />
          <AnswerSummay>{questionAnswers.length} Answers</AnswerSummay>
          {questionAnswers.map((el) => (
            <OpinionCard
              key={el.answerId}
              id={el.answerId}
              likes={el.answerLikesCount}
              content={el.answerContent}
              modifiedAt={el.answerModifiedAt}
              writer={el.answerWriter}
              comment={el.answerAnswerComments}
              questionId={questionId}
              isQuestion={false}
              questionBestAnswerId={questionBestAnswerId}
              questionWriter={questionWriter.userId}
            />
          ))}
          <AddAnswer questionId={questionId} />
        </Content>
        <SideBarWidget />
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.div`
  height: auto;
  min-height: 100%;
  position: relative;
  flex: 1 0 auto;
  max-width: 126.4rem;
  width: 100%;
  background: none;
  display: flex;
  margin: 0 auto;
  padding-top: 5rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid #d6d9dc;
  border-bottom: 1px solid #d6d9dc;
  /* padding: 2.4rem; */
  padding: 2.4rem 0;
  width: 72.5rem;
  /* max-width: 110rem; */
  line-height: 1.7rem;
`;

//TitleLayout
const TitleLayout = styled.div`
  padding-left: 2rem;
`;
const TitleContainer = styled.div`
  display: flex;
`;
//Title 태그는 실제로는 본인의 질문페이지로 이동하는 a 태그이다 이후 수정할 것.
const Title = styled.h1`
  font-size: 2.7rem;
  margin: 0 0 0.8rem 0;
  width: 60rem;
  line-height: 3.645rem;
  textarea {
    width: 100%;
    border: 1px solid #d6d9dc;
    color: ${(props) => (props.themeState === 'light' ? '#0c0d0e' : '#F2F2F3')};
    background-color: ${(props) =>
      props.themeState === 'light' ? '#FFFFFF' : '#2D2D2D'};
  }
  a {
    text-decoration: none;
    color: ${(props) =>
      props.themeState === 'light' ? ' #3b4045' : '#E7E9EB'};
  }
`;

const CreatedAt = styled.div`
  font-size: 1.3rem;
  margin: 0 0 1.6rem 0;
  padding: 0 0 0.8rem 0;
  color: ${(props) => (props.themeState === 'light' ? '#232629' : '#E7E9EB')};
`;
const AnswerSummay = styled.div`
  font-size: 1.9rem;
  margin: 3rem 1.5rem;
`;

export default Question;
