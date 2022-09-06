import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAsia } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getUserId } from '../getUserInfo';
import { useNavigate } from 'react-router-dom';

const SideBar = ({ pageName }) => {
  const themeState = useSelector((state) => state.themeSlice).theme;

  const userId = getUserId();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    axios
      .get(`/users/${userId}`)
      .then((res) => setUserData(res.data))
      .catch((err) => console.log(err));
  }, [userId]);

  const handleNavigateProfile = () => {
    if (userId) {
      navigate(`/users/${userId}`);
      window.location.reload();
    } else {
      if (window.confirm('You must be logged in to set up your profile')) {
        navigate('/login');
        window.location.reload();
        return;
      }
    }
  };

  return (
    <SideBarDiv>
      <SideBarNav themeState={themeState}>
        <SideBarA
          href='/'
          className={pageName === 'Home' ? 'isActive' : 'notActive'}
          paddingTop='1rem'
          paddingLeft='1rem'
          themeState={themeState}
        >
          Home
        </SideBarA>
        <div>PUBLIC</div>
        <SideBarA
          href='/questions'
          className={pageName === 'Questions' ? 'isActive' : 'notActive'}
          paddingTop='1rem'
          paddingLeft='0.5rem'
          themeState={themeState}
        >
          <FontAwesomeIcon id='faGlobe' icon={faGlobeAsia} />
          Questions
        </SideBarA>
        <SideBarA
          href='/tags'
          className={pageName === 'Tags' ? 'isActive' : 'notActive'}
          paddingTop='1rem'
          paddingLeft='2.1rem'
          themeState={themeState}
        >
          Tags
        </SideBarA>
        <SideBarA
          onClick={handleNavigateProfile}
          className={pageName === 'Users' ? 'isActive' : 'notActive'}
          paddingTop='1rem'
          paddingLeft='2.1rem'
          themeState={themeState}
        >
          Users
        </SideBarA>
        <SideBarA
          href='https://stackoverflow.com/jobs/companies'
          paddingTop='1rem'
          paddingLeft='2.1rem'
          themeState={themeState}
        >
          Companies
        </SideBarA>
      </SideBarNav>
    </SideBarDiv>
  );
};

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
  div {
    color: ${(props) =>
      props.themeState === 'light' ? ' #6a737c;' : 'hsl(210,8%,70%)'};
    padding: 1rem 0 1rem 1rem;
  }
`;

const SideBarA = styled.a`
  padding: 0;
  height: 3.4rem;
  /* margin: 0 0 1.2rem; */
  list-style: none;
  font-size: 1.6rem;
  color: ${(props) =>
    props.themeState === 'light' ? ' #6a737c;' : 'hsl(210,8%,70%)'};
  text-decoration: none;
  padding-left: ${(props) => props.paddingLeft || '0'};
  padding-top: ${(props) => props.paddingTop || '0'};
  cursor: pointer;
  :hover {
    color: ${(props) =>
      props.themeState === 'light' ? ' #6a737c;' : '#f2f3f3'};
  }
  #faGlobe {
    padding-right: 0.4rem;
  }
  &.isActive {
    color: ${(props) =>
      props.themeState === 'light' ? '#0C0D0E' : '#F2F2F3 '};
    background-color: ${(props) =>
      props.themeState === 'light' ? '#F1F2F3' : '#3D3D3D '};
    border-right: 2px solid var(--color-orange);
  }
`;

export default SideBar;
