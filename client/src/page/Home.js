import styled from 'styled-components';
import Card from '../component/Card';
import Footer from '../component/Footer';
import TopBar from '../component/TopBar';
import SideBar from '../component/SideBar';
import Pagination from '../component/Pagination';
import AskBtn from '../component/AskBtn';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SideBarWidget from '../component/SideBarWidget';

const Home = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(15);
  const [total, setTotal] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`/questions?size=${size}&page=${page}`)
      .then((res) => {
        //pagination
        setTotal(Number(res.data.pageInfo.totalElements));
        setPage(page);
        setSize(size);
        //card에 뿌릴 data
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [page, size]);

  return (
    <>
      <TopBar />
      <Container>
        <SideBar pageName={'Home'} />
        <Content>
          <TitleContainer>
            <TitleWrapper>
              <Title themeState={themeState}>Top Question</Title>
              <AskBtn />
            </TitleWrapper>
          </TitleContainer>
          <CardLayout>
            {data.map((el) => (
              <Card
                key={Number(el.questionId)}
                questionId={el.questionId}
                questionTitle={el.questionTitle}
                questionWriterId={el.questionWriterId}
                questionContent={el.questionContent}
                questionLikes={el.questionLikes}
                questionAnswers={el.questionAnswers.length}
                questionCreatedAt={el.questionCreatedAt}
              ></Card>
            ))}
            <Pagination
              total={total}
              size={size}
              page={page}
              setPage={setPage}
              setSize={setSize}
              setTotal={setTotal}
            />
          </CardLayout>
        </Content>
        <SideBarWidget />
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

//TitleContainer
const TitleContainer = styled.div`
  padding-left: 2rem;
`;
const TitleWrapper = styled.div`
  display: flex;
`;
//Title 태그는 실제로는 본인의 질문페이지로 이동하는 a 태그이다 이후 수정할 것.
const Title = styled.h1`
  font-size: 2.7rem;
  color: ${(props) => (props.themeState === 'light' ? ' #3b4045' : '#E7E9EB')};
  margin: 0 0 0.8rem 0;
  width: 60rem;
`;
//CardLayout

const CardLayout = styled.div``;

export default Home;
