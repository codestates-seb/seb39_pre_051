import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAsia } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

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
`;

const SideBarA = styled.a`
  padding: 0;
  margin: 0 0 1.2rem;
  list-style: none;
  font-size: 1.6rem;
  color: #525960;
  text-decoration: none;

  padding-left: ${(props) => props.paddingLeft || '0'};
  padding-top: ${(props) => props.paddingTop || '0'};

  #faGlobe {
    padding-right: 0.4rem;
  }
`;

const SideBar = () => {
  return (
    <SideBarDiv>
      <SideBarNav>
        <SideBarA href='/'>Home</SideBarA>
        PUBLIC
        <SideBarA href='/questions' paddingTop='0.5rem'>
          <FontAwesomeIcon id='faGlobe' icon={faGlobeAsia} />
          Questions
        </SideBarA>
        <SideBarA href='/tags' paddingLeft='2.1rem'>
          Tags
        </SideBarA>
        <SideBarA href='/users' paddingLeft='2.1rem'>
          Users
        </SideBarA>
        <SideBarA
          href='https://stackoverflow.com/jobs/companies'
          paddingLeft='2.1rem'
        >
          Companies
        </SideBarA>
      </SideBarNav>
    </SideBarDiv>
  );
};

export default SideBar;
