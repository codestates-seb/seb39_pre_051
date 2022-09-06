import { useSelector } from 'react-redux';
import styled from 'styled-components';
import AuthLogin from '../component/AuthLogin';
import TopBar from '../component/TopBar';

const Login = () => {
  const themeState = useSelector((state)=>state.themeSlice).theme
  return (
    <Container themeState={themeState}>
      <TopBar />
      <AuthLogin status={'login'} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${(props)=> props.themeState === 'light' ? '#F1F2F3' :'#2D2D2D'};
`;

export default Login;
