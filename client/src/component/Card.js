import styled from 'styled-components';
import { useSelector } from 'react-redux';

const tagArray = ['java', 'javascript', 'python', 'GO', 'C++'];

const Card = ({
  questionId,
  questionTitle,
  questionWriterId,
  questionContent,
  questionLikes,
  questionAnswers,
  questionCreatedAt,
}) => {
  const themeState = useSelector((state) => state.themeSlice).theme;

  const year = questionCreatedAt[0];
  const month = questionCreatedAt[1];
  const day = questionCreatedAt[2];
  const hour =
    questionCreatedAt[3] > 12
      ? '오후 ' + (questionCreatedAt[3] - 12)
      : '오전 ' + questionCreatedAt[3];
  const min = questionCreatedAt[4];
  const sec = questionCreatedAt[5];

  return (
    <CardLayout>
      <CardContainer>
        <VoteContainer>
          <Votes themeState={themeState}>{questionLikes} votes</Votes>
          <Answers>{questionAnswers} answers</Answers>
          <Views>0 views</Views>
        </VoteContainer>
        <QuestionContainer>
          <QuestionTitle href={`/questions/${questionId}`}>
            {questionTitle}
          </QuestionTitle>
          <QuestionSummary>{questionContent}</QuestionSummary>
          <QuestionInfoContainer>
            <TagWrapper>
              {tagArray.map((el, key) => (
                <Tag key={key} themeState={themeState}>
                  {el}
                </Tag>
              ))}
            </TagWrapper>
            <InfoWrapper>
              <img
                src='https://w7.pngwing.com/pngs/981/645/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol.png'
                alt='프로필사진'
              ></img>
              <Writer href='naver,com'>{questionWriterId}</Writer>
              <CreatedAt>{`${year}년 ${month}월 ${day}일 ${hour}시 ${min}분 ${sec}초`}</CreatedAt>
            </InfoWrapper>
          </QuestionInfoContainer>
        </QuestionContainer>
      </CardContainer>
    </CardLayout>
  );
};

const CardLayout = styled.div`
  height: 12.4rem;
  width: 72.5rem;
  border-bottom: 1px solid #e3e6e8;
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
  min-width: 7.5rem;

  div {
    margin: 0.6rem 0;
  }
`;
const Votes = styled.div`
  color: ${(props) => (props.themeState === 'light' ? '#0c0d0e' : '#F2F2F3')};
`;
const Answers = styled.div``;
const Views = styled.div``;
const QuestionContainer = styled.div`
  padding: 0.4rem;
`;
const QuestionTitle = styled.a`
  color: hsl(206, 100%, 40%);
  text-decoration: none;
  font-size: 1.7rem;
  line-height: 2.2rem;
  margin: 0.6rem 0;
`;
const QuestionSummary = styled.div`
  margin: 0.7rem 0;
  line-height: 1.4rem;
  max-height: 2.6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const QuestionInfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 1.2rem;
  width: 59.5rem;
  margin: 0.6rem 0;
  justify-content: space-between;
`;

const TagWrapper = styled.div``;

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

const InfoWrapper = styled.div`
  display: flex;
  img {
    height: 1.6rem;
    width: 1.6rem;
    border-radius: 0.3rem;
    margin-right: 0.3rem;
  }
`;
const Writer = styled.a`
  color: hsl(206, 100%, 40%);
  text-decoration: none;
  margin-right: 0.3rem;
`;
const CreatedAt = styled.div`
  margin-right: 0.3rem;
`;

export default Card;
