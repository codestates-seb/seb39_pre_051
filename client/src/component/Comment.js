import axios from 'axios';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Comment = (props) => {
  const userState = useSelector((state)=>state.userInfoSlice)
  const themeState = useSelector((state)=>state.themeSlice).theme

  const handleDelete = async() => {
    console.log(props.id, props.isQuestion)
    if(props.isQuestion){
      console.log(`/questionComments/${props.id}`)
      const response = await axios.delete(`/questionComments/${props.id}`)
      return response 
    } else{
      console.log(`/answerComments/${props.id}`)
      const response = await axios.delete(`/answerComments/${props.id}`)
      return response 
    }
  }
  return (
    <CommentLayout key={props.id}>
      <CommetnLikes>
        <span>{props.likes}</span>
      </CommetnLikes>
      <CommentContainer>
        <CommentSpan id='content'>{props.content}</CommentSpan>
        <CommentInfo>
          {' '}
          - <a href='/'> {props.writer}</a>
          <CommentSpan id='modifiedAt'>{props.modifiedAt}</CommentSpan>
          {userState.email===props.email && (
            <>
            <CommentSpan id='editdelete' themeState={themeState}>edit</CommentSpan>
            <CommentSpan id='editdelete' themeState={themeState} onClick={() =>handleDelete() }>delete</CommentSpan>
            </>
          )}
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
