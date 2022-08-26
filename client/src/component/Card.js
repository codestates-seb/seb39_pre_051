import styled from 'styled-components';

const tagArray = ['java', 'javascript', 'python', 'GO', 'C++'];

const CardLayout = styled.div`
  height: 12.4rem;
  width: 72.5rem;
  border-bottom: 1px solid #e3e6e8;
  border-left: 1px solid #e3e6e8;
  font-size: 1.3rem;
  line-height: 1.7rem;
  text-align: left;
  padding: 1.6rem;
`;
const CardContainer = styled.div`
  display: flex;
`;

const VoteContainer = styled.div`
  color: #6a737c;
  margin: 0 1.6rem 0.4rem 0;
  width: 10.8rem;
`;
const Votes = styled.div`
  color: #0c0d0e;
`;
const Answers = styled.div``;
const Views = styled.div``;
const QuestionContainer = styled.div``;
const QuestionTitle = styled.a`
  color: var('--color-blue');
  text-decoration: none;
  font-size: 1.7rem;
  line-height: 2.2rem;
`;
const QuestionSummary = styled.div``;

const QuestionInfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 1.2rem;
`;
const Tag = styled.a`
  border: 1px solid #ffffff;
  color: hsl(205, 47%, 41%);
  background-color: hsl(205, 46%, 92%);
  padding: 0.5rem 0.6rem;
`;
const Writer = styled.a`
  color: var('--color-blue');
  text-decoration: none;
`;
const CreatedAt = styled.div``;

const Card = () => {
  return (
    <CardLayout>
      <CardContainer>
        <VoteContainer>
          <Votes>0 votes</Votes>
          <Answers>0 answers</Answers>
          <Views>0 views</Views>
        </VoteContainer>
        <QuestionContainer>
          <QuestionTitle href='naver.com'>질문 제목</QuestionTitle>
          <QuestionSummary>질문 요약</QuestionSummary>
          <QuestionInfoContainer>
            {tagArray.map((el, key) => (
              <Tag key={key}>{el}</Tag>
            ))}
            <Writer href='naver,com'>작성자</Writer>
            <CreatedAt>작성 일자</CreatedAt>
          </QuestionInfoContainer>
        </QuestionContainer>
      </CardContainer>
    </CardLayout>
  );
};

export default Card;
