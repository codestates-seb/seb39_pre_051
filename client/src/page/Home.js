import styled from 'styled-components';
import Card from '../component/Card';
import Footer from '../component/Footer';
import TopBar from '../component/TopBar';
import SideBar from '../component/SideBar';

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
`;

const Home = () => {
  return (
    <>
      <TopBar />
      <Container>
        <SideBar />
        <Content>
          <Card />
          <Card />
        </Content>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
