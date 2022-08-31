import styled from 'styled-components';

const Comment = (props) => {
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
    color: #9199a1;
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
