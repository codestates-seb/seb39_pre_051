import styled from 'styled-components';
import Comment from './Comment';
import { useRef } from 'react';

const OpinionCard = ({
  id,
  likes,
  content,
  modifiedAt,
  writer,
  comment,
  isQuestion,
}) => {
  const commentInput = useRef();

  const handleCommentSubmit =(e) => {
    e.preventDefault();
    const enteredComment = commentInput.current.value
    console.log(enteredComment)
  }
  
  const handleEnterPress = (e) => {
    if(e.key === 'Enter') {
      return (e) =>handleCommentSubmit()
    }else{
      return
    }
  }
  return (
    <OpinionLayout key={id}>
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
              <ContentInfo>
                <InfoModified>{modifiedAt}</InfoModified>
                <InfoBox>
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
                    content={el.questionCommentContent}
                    likes={el.questionCommentLikes}
                    modifiedAt={el.questionCommentModifiedAt}
                  />
                ))
              : comment.map((el) => (
                  <Comment
                    key={el.answerCommentId}
                    id={el.answerCommentId}
                    writer={el.answerCommentWriter}
                    content={el.answerCommentContent}
                    likes={el.answerCommentLikes}
                    modifiedAt={el.answerCommentModifiedAt}
                  />
                ))}
          </CommentLayout>
          <AddCommentContainer>
            <form onSubmit={(e) => handleCommentSubmit(e)}>
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
  justify-content: flex-end;
`

const ContentInfo = styled.div`
  width: 20rem;
  height: 6.72rem;
  border-radius: 0.3rem;
  font-size: 1.2rem;
  line-height: 1.7rem;
  background-color: #d9eaf7;
  padding: 0.5rem 0.6rem 0.7rem 0.7rem;
`;

const InfoModified = styled.div`
  color: #6a737c;
  margin: 0.1rem 0px 0.4rem 0;
`

const InfoBox = styled.div`
  display: flex;
  img {
    height: 3.2rem;
    width: 3.2rem;
  }
  #writer {
    color:hsl(206,100%,40%);
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
    width:100%;
    border : 1px solid #D6D9DC;
    border-radius: 0.3rem;
    margin: 1rem 0 1rem 0;;
  }
  button{
  color:#D6D9DC;
  background-color:#ffffff;
  border: none;
  &:hover{
    color: #0a95ff;;
  }
}
`;

export default OpinionCard;