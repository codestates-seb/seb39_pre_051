import styled from 'styled-components';
import AuthLogin from '../component/AuthLogin';
import TopBar from '../component/TopBar';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #F1F2F3;
`;

const Login = () => {
  return (
    <Container>
      <TopBar />
      <AuthLogin status={'login'} />
    </Container>
  );
};
export default Login;
