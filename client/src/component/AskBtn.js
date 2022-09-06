import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserId } from '../getUserInfo';

const AskBtn = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  const isLoggedIn = getUserId();
  const navigate = useNavigate();

  const handleNavigateAsk = () => {
    if (isLoggedIn) {
      navigate('/ask');
      window.location.reload();
    } else {
      if (
        window.confirm(
          'You must be logged in to ask a question on Stack Overflow'
        )
      ) {
        navigate('/login');
        window.location.reload();
        return;
      }
    }
  };

  return (
    <AskBtnLayout>
      <AskBtnLink themeState={themeState} onClick={() => handleNavigateAsk()}>
        Ask Question
      </AskBtnLink>
    </AskBtnLayout>
  );
};

const AskBtnLayout = styled.div`
  /* margin: 0 0 0 1.2rem ; */
`;

const AskBtnLink = styled.div`
  cursor: pointer;
  background-color: ${(props) =>
    props.themeState === 'light' ? '#0a95ff' : '#0C63A9'};
  color: #ffffff;
  border: ${(props) =>
    props.themeState === 'light' ? '1px solid #ffffff' : '1px solid #OC63A9'};
  border-radius: 0.3rem;
  width: 10.3rem;
  height: 3.78rem;
  text-align: center;
  font-size: 1.3rem;
  line-height: 1.5rem;
  padding: 1rem;
  text-decoration: none;
  :hover {
    background-color: ${(props) =>
      props.themeState === 'light' ? '#0074cc' : '#0964AA'};
  }
`;

export default AskBtn;
