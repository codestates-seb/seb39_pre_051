import styled from 'styled-components';
import TopBar from '../component/TopBar';
import SideBar from '../component/SideBar';
import Footer from '../component/Footer';
import OpinionCard from '../component/OpinionCard';
import { useParams } from 'react-router-dom';
import AskBtn from '../component/AskBtn';
import AddAnswer from '../component/AddAnswer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { readQuestion } from '../redux/slice/questionSlice';

const question = [
  {
    questionId: 0,
    questionWriter: 'kyle1030',
    questionEmail: 'test1@gmail.com',
    questionContent:
      'I do not  kno nI do not  know howktI do not  know how to do ',
    questionLikes: 25,
    questionCreatedAt: '2025년 10월 20일',
    questionModifiedAt: '2025년 3월 14일',
    questionTitle: 'How to do I do not  know',
    questionComment: [
      {
        questionCommentId: 0,
        questionCommentWriter: 'Robin',
        questionCommentEmail:'test1@gmail.com',
        questionCommentContent:
          'HelloI do not  know how to do javascriptI do not  know how to do javascriptI do not  know how to do javascriptI do not  know how to do javascriptI do not  know how to do javascriptI do not  know how to do javascriptI do not  know how to do javascriptI do not  know how to do javascriptI do not  know how to do javascriptI do not  know how to do javascriptI do not  know how to do javascriptI do not  know how to do javascriptI do not  know how to do javascriptI do not  know how to do javascriptI do not  know how to do javascriptI do not  know how to do javascriptI do not  know how to do javascript',
        questionCommentLikes: 6,
        questionCommentCreatedAt: '2023년 2월 12일',
      },
    ],
    answer: [
      {
        answerId: 0,
        answerWriter: 'john',
        answerEmail:'test1@gmail.com',
        answerContent: 'It is not a big problem',
        answerLikes: 5,
        answerCreatedAt: '’2022년 3월 12일',
        answerComment: [
          {
            answerCommentId: 0,
            answerCommentWriter: 'Scholes',
            answerCommentContent: 'Good For you',
            answerCommentEmail:'test1@gmail.com',
            answerCommentLikes: 3,
            answerCommentModifiedAt: '2023년 3월 15일',
            answerCommentCreatedAt: '2034년 12월',
          },
          {
            answerCommentId: 1,
            answerCommentWriter: 'Scholes',
            answerCommentContent: 'Good For you',
            answerCommentLikes: 3,
            answerCommentModifiedAt: '2023년 3월 15일',
            answerCommentCreatedAt: '2034년 12월',
          },
          {
            answerCommentId: 2,
            answerCommentWriter: 'Scholes',
            answerCommentContent: 'Good For you',
            answerCommentLikes: 3,
            answerCommentModifiedAt: '2023년 3월 15일',
            answerCommentCreatedAt: '2034년 12월',
          },
        ],
      },
      {
        answerId: 1,
        answerWriter: 'kate',
        answerContent: 'you can do it',
        answerLikes: 335,
        answerCreatedAt: '2022년 3월 12일',
        answerComment: [],
      },
    ],
  },
];


const Question = () => {
  const params = useParams();
  const themeState = useSelector((state) => state.themeSlice).theme;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(readQuestion(params.questionId))
  },[]);
  return (
    <>
      <TopBar />
      <Container>
        <SideBar pageName={'Questions'} />
        <Content>
          <TitleLayout>
            <TitleContainer>
              <Title themeState={themeState}>
                {question[params.questionId].questionTitle}
              </Title>
              <AskBtn />
            </TitleContainer>
            <CreatedAt themeState={themeState}>
              {question[params.questionId].questionCreatedAt}
            </CreatedAt>
          </TitleLayout>
          <OpinionCard
            key = {question[params.questionId].questionId}
            id={question[params.questionId].questionId}
            likes={question[params.questionId].questionLikes}
            content={question[params.questionId].questionContent}
            modifiedAt={question[params.questionId].questionModifiedAt}
            writer={question[params.questionId].questionWriter}
            email={question[params.questionId].questionEmail}
            comment={question[params.questionId].questionComment}
            isQuestion={true}
          />
          <AnswerSummay>
            {question[params.questionId].answer.length} Answers
          </AnswerSummay>
          {question[params.questionId].answer.map((el) => (
            <OpinionCard
              key = {el.answerId}
              id={el.answerId}
              likes={el.answerLikes}
              content={el.answerContent}
              modifiedAt={el.answer_modifiedAt}
              writer={el.answerWriter}
              email={el.answerEmail}
              comment={el.answerComment}
              questionId = {question[params.questionId].questionId}
              isQuestion={false}
            />
          ))}
          <AddAnswer questionId={params.questionId}/>
        </Content>
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
  max-width: 110rem;
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
  color: ${(props) => (props.themeState === 'light' ? ' #3b4045' : '#E7E9EB')};
  margin: 0 0 0.8rem 0;
  width: 80rem;
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
