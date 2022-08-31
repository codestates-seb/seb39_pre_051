import styled from 'styled-components';
import Card from '../component/Card';
import Footer from '../component/Footer';
import TopBar from '../component/TopBar';
import SideBar from '../component/SideBar';
import Pagination from '../component/Pagination';
import AskBtn from '../component/AskBtn';
import { useSelector } from 'react-redux';

const QuestionMain = () => {
  const themeState = useSelector((state)=>state.themeSlice).theme
  return (
    <>
      <TopBar />
      <Container>
        <SideBar pageName={'Questions'}/>
        <Content>
          <TitleLayout>
            <TitleContainer>
              <Title themeState={themeState}>All Questions</Title>
              <AskBtn />
            </TitleContainer>
          </TitleLayout>
          <CardLayout>
            <Card />
            <Card />
            <Pagination total='30' limit='15' page='1' />
          </CardLayout>
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
  color : ${(props) => props.themeState === 'light' ? ' #3b4045' : '#E7E9EB'};
  margin: 0 0 0.8rem 0;
  width: 80rem;
`;
//CardLayout

const CardLayout = styled.div`

`;

export default QuestionMain;
