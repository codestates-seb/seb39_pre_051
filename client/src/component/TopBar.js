import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faTrophy,
  faInbox,
  faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';
import { faStackExchange } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import DarkModeSwitch from './DarkModeSwitch';
import { useState } from 'react';
import { logOut } from '../redux/slice/userInfoSlice';
import { useNavigate } from 'react-router-dom';
import { getUserId } from '../getUserInfo';
// import {removeCookie} from 'react-cookie';

const TopBar = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  const userState = useSelector((state) => state.userInfoSlice);
  const isLoggedIn = getUserId()
  const userId = userState.memberId;
  const [isOpen, setIsOpen] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // const clearCookie = () => {
  //   removeCookie('toekn')
  // }
  const handleLogOut = () => {
    // dispatch(logOut());
    // clearCookie()
    // removeCookie('token')
    localStorage.clear()
    navigate('/');
  };

  return (
    <Header themeState={themeState}>
      <TopBarDiv>
        <TopBarLogoA href='/' themeState={themeState}>
          <TopBarLogoSpan />
        </TopBarLogoA>
        <TobBarLeftNav>
          <TopBarA href='https://stackoverflow.co/' themeState={themeState}>
            About
          </TopBarA>
          <TopBarA href='#' themeState={themeState}>
            Products
          </TopBarA>
          <TopBarA
            href='https://stackoverflow.co/teams/'
            themeState={themeState}
          >
            For Teams
          </TopBarA>
        </TobBarLeftNav>
        <TopBarForm id='search'>
          <TopBarSearchDiv>
            <TopBarInput type='text' placeholder='Search...' />
            <FontAwesomeIcon id='searchIcon' icon={faSearch} />
          </TopBarSearchDiv>
        </TopBarForm>
        <TopBarRightNav>
          {isLoggedIn ? (
            <>
              <IconWrapper>
                <a href={`/users/${userId}`} id='userInfo'>
                  <img src={userState.profileImage} alt='프로필사진' />
                </a>
                <div id='icon'>
                  <FontAwesomeIcon icon={faInbox} size='2x' />
                </div>
                <div id='icon'>
                  <FontAwesomeIcon icon={faTrophy} size='2x' />
                </div>
                <div id='icon'>
                  <FontAwesomeIcon icon={faCircleQuestion} size='2x' />
                </div>
                <div id='icon'>
                  <FontAwesomeIcon
                    icon={faStackExchange}
                    size='2x'
                    onClick={toggleMenu}
                  />
                  <LogOutDropDown>
                    <LogoutDorpDownItem isOpen={isOpen} themeState={themeState}>
                      <a href='/'>
                        <svg width='16' height='16' viewBox='0 0 32 37'>
                          <path
                            d='M26 33v-9h4v13H0V24h4v9h22Z'
                            fill='#BCBBBB'
                          ></path>
                          <path
                            d='m21.5 0-2.7 2 9.9 13.3 2.7-2L21.5 0ZM26 18.4 13.3 7.8l2.1-2.5 12.7 10.6-2.1 2.5ZM9.1 15.2l15 7 1.4-3-15-7-1.4 3Zm14 10.79.68-2.95-16.1-3.35L7 23l16.1 2.99ZM23 30H7v-3h16v3Z'
                            fill='#F48024'
                          ></path>
                        </svg>
                      </a>
                      <span onClick={() => handleLogOut()}>log out</span>
                    </LogoutDorpDownItem>
                  </LogOutDropDown>
                </div>
              </IconWrapper>
              <DarkModeSwitch />
            </>
          ) : (
            <>
              <TopBarA
                id='login'
                href='/login'
                color='#39739D'
                backgroundColor='#E1ECF4'
                borderColor='#7AA7C7'
                borderRadius='0.3rem'
                themeState={themeState}
              >
                Log in
              </TopBarA>
              <TopBarA
                id='signup'
                href='/signup'
                color='#FFFFFF'
                backgroundColor='#0A95FF'
                borderColor='#7AA7C7'
                borderRadius='0.3rem'
                marginLeft='0.3rem'
                themeState={themeState}
              >
                Sign up
              </TopBarA>
              <DarkModeSwitch />
            </>
          )}
        </TopBarRightNav>
      </TopBarDiv>
    </Header>
  );
};

const Header = styled.header`
  position: fixed !important;
  left: 0 !important;
  top: 0 !important;
  z-index: 10;
  min-width: auto;
  box-shadow: 0 0.1rem 0.2rem hsla(0, 0%, 0%, 0.05),
    0 0.1rem 0.4rem hsla(0, 0%, 0%, 0.05), 0 0.2rem 0.8rem hsla(0, 0%, 0%, 0.05);
  border-top: 0.3rem solid var(--color-orange);
  width: 100%;
  max-width: 100%;
  height: 5rem;
  display: flex;
  margin: 0 auto;
  align-items: center;
  background-color: ${(props) =>
    props.themeState === 'light' ? '#f8f9f9' : '#393939'};
`;

const TopBarLogoA = styled.a`
  height: 100%;
  display: flex;
  align-items: center;
  text-decoration: none;

  &:hover {
    background-color: ${(props) =>
      props.themeState === 'light' ? ' #e3e6e8;' : '#414244'};
  }
`;

const TopBarLogoSpan = styled.span`
  margin-left: 0;
  width: 15rem;
  height: 3rem;
  margin-top: -0.4rem;
  display: inline-block;
  text-indent: -9999rem;
  background-position: 0 -50rem;
  background-image: url(https://cdn.sstatic.net/Img/unified/sprites.svg?v=fcc0ea44ba27);
`;

const TobBarLeftNav = styled.div`
  display: flex;
  margin: 0.2rem;
  padding: 0.2rem 0;
`;

const TopBarDiv = styled.div`
  width: 123rem;
  max-width: 100%;
  height: 100%;
  display: flex;
  margin: 0 auto;
  align-items: center;
`;

const TopBarForm = styled.form`
  padding: 0 0.8rem;
  display: flex;
  align-items: center;
  flex-shrink: 10000;
  flex-grow: 1;
`;

const TopBarSearchDiv = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  flex-grow: 1;

  #searchIcon {
    position: absolute;
    top: 50%;
    margin-top: -0.9rem;
    right: auto;
    left: 0.7em;
    font-size: 1.7rem;
    color: #6a737c;
  }
`;

const TopBarInput = styled.input`
  width: 100%;
  margin: 0;
  padding: 0.6em 0.7em;
  border: 0.1rem solid #babfc4;
  border-radius: 0.3rem;
  font-size: 1.3rem;
  padding-left: 3.2rem;
  border-color: #babfc4;
  background-color: #ffffff;
  color: #3b4045;
  display: block;
  line-height: 1.15;
`;

const TopBarRightNav = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
  border: 0;
`;
const IconWrapper = styled.div`
  display: flex;
  #icon {
    cursor: pointer;
    margin: 1rem 1rem 0 0;
  }
  img {
    height: 2.4rem;
    width: 2.4rem;
    border-radius: 0.3rem;
  }
  #userInfo {
    cursor: pointer;
    padding-top: 0.53rem;
    margin-right: 1rem;
  }
`;

const TopBarA = styled.a`
  padding: 0.8rem 1.04rem;
  font-size: 1.3rem;
  border: 0.1rem solid #6a737c;
  text-decoration: none;
  &:hover {
    background-color: ${(props) =>
      props.themeState === 'light' ? ' #e3e6e8;' : '#414244'};
  }

  &#login:hover {
    background-color: ${(props) =>
      props.themeState === 'light' ? '#b3d3ea' : '#414244'};
  }

  &#signup:hover {
    background-color: ${(props) =>
      props.themeState === 'light' ? '#0074cc' : '#414244'};
  }
  color: ${(props) =>
    props.themeState === 'light' ? props.color || '#525960' : '#E7E9EB'};
  background-color: ${(props) =>
    props.themeState === 'light'
      ? props.backgroundColor || '#F8F9F9'
      : '#393939'};
  border-color: ${(props) =>
    props.themeState === 'light'
      ? props.borderColor || 'transparent'
      : '#393939'};
  border-radius: ${(props) => props.borderRadius || '100rem'};
  margin-left: ${(props) => props.marginLeft || '0'};
`;

const LogOutDropDown = styled.ul`
  position: relative;
  display: inline-block;
`;
const LogoutDorpDownItem = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  background-color: ${(props) =>
    props.themeState === 'light' ? '#f8f9f9' : '#393939'};
  color: ${(props) =>
    props.themeState === 'light' ? 'hsl(206,100%,40%)' : '#328DD2'};
  min-width: 160px;
  margin-left: -150px;
  margin-top: 15px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
  a {
    margin-right: 1.5rem;
  }
`;

export default TopBar;
