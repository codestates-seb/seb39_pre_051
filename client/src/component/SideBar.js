import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAsia } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
/**
 *  SideBar 컴포넌트는 해당 서비스의 로그인과 회원가입 화면을 제외한 모든 화면의 좌측상단에 고정되어 있는 LNB(Local Navigation Bar)이다.
 */

const SideBarDiv = styled.div`
  width: 16.4rem;
  flex-shrink: 0;
`;

const SideBarNav = styled.nav`
  position: sticky;
  width: auto;
  margin-bottom: 0.8rem;
  top: 5rem;
  padding-top: 2.4rem;
  padding-left: 1rem;
  font-size: 1.3rem;
  color: #6a737c;
  display: flex;
  flex-direction: column;
  div{
    color: ${(props) => props.themeState === 'light' ? ' #6a737c;' : 'hsl(210,8%,70%)'};
    &:hover{
      color: ${(props) => props.themeState === 'light' ? ' #6a737c;' : '#f2f3f3'};
    }
  }
`;

const SideBarA = styled.a`
  padding: 0;
  margin: 0 0 1.2rem;
  list-style: none;
  font-size: 1.6rem;
  color: ${(props) => props.themeState === 'light' ? ' #6a737c;' : 'hsl(210,8%,70%)'};
  text-decoration: none;
  padding-left: ${(props) => props.paddingLeft || '0'};
  padding-top: ${(props) => props.paddingTop || '0'};
  :hover{
      color: ${(props) => props.themeState === 'light' ? ' #6a737c;' : '#f2f3f3'};
    }
  #faGlobe {
    padding-right: 0.4rem;
  }
`;

const SideBar = () => {
  const themeState = useSelector((state)=>state.themeSlice).theme
  return (
    <SideBarDiv>
      <SideBarNav themeState={themeState}>
        <SideBarA href='/' themeState={themeState}>Home</SideBarA>
        <div>PUBLIC</div>
        <SideBarA href='/questions' paddingTop='0.5rem' themeState={themeState}>
          <FontAwesomeIcon id='faGlobe' icon={faGlobeAsia} />
          Questions
        </SideBarA>
        <SideBarA href='/tags' paddingLeft='2.1rem' themeState={themeState}>
          Tags
        </SideBarA>
        <SideBarA href='/users' paddingLeft='2.1rem' themeState={themeState}>
          Users
        </SideBarA>
        <SideBarA
          href='https://stackoverflow.com/jobs/companies'
          paddingLeft='2.1rem'
          themeState={themeState}
        >
          Companies
        </SideBarA>
      </SideBarNav>
    </SideBarDiv>
  );
};

export default SideBar;
