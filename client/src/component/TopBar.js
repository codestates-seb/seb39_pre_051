import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

/**
 *  TopBar 컴포넌트는 해당 서비스의 모든 화면의 최상단에 고정되어 있는 GNB(Global Navigation Bar)이다.
 */

const Header = styled.header`
  position: fixed !important;
  left: 0 !important;
  top: 0 !important;
  z-index: 10;
  min-width: auto;
  box-shadow: 0 0.1rem 0.2rem hsla(0, 0%, 0%, 0.05),
    0 0.1rem 0.4rem hsla(0, 0%, 0%, 0.05), 0 0.2rem 0.8rem hsla(0, 0%, 0%, 0.05);
  width: 100%;
  max-width: 100%;
  height: 5rem;
  display: flex;
  margin: 0 auto;
  align-items: center;
  background-color: #f8f9f9;
`;

const TobBarLogoA = styled.a`
  text-decoration: none;
`;

const TobBarLogoSpan = styled.span`
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
  margin: -0.2rem;
  padding: 0.2rem 0;
`;

const TopBarDiv = styled.div`
  width: 97.2307692rem;
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
  margin: 0;
  padding: 0;
  border: 0;
`;

const TopBarA = styled.a`
  padding: 0.8rem 1.04rem;
  font-size: 1.3rem;
  line-height: 1.5;
  border: 0.1rem solid #6a737c;
  text-decoration: none;

  color: ${(props) => props.color || '#525960'};
  background: ${(props) => props.background || '#F8F9F9'};
  border-color: ${(props) => props.borderColor || 'transparent'};
  border-radius: ${(props) => props.borderRadius || '0.3rem'};
  margin-left: ${(props) => props.marginLeft || '0'};
`;

const TopBar = () => {
  return (
    <Header>
      <TopBarDiv>
        <TobBarLogoA href='/'>
          <TobBarLogoSpan />
        </TobBarLogoA>
        <TobBarLeftNav>
          <TopBarA href='https://stackoverflow.co/'>About</TopBarA>
          <TopBarA href='#'>Products</TopBarA>
          <TopBarA href='https://stackoverflow.co/teams/'>For Teams</TopBarA>
        </TobBarLeftNav>
        <TopBarForm id='search'>
          <TopBarSearchDiv>
            <TopBarInput type='text' placeholder='Search...' />
            <FontAwesomeIcon id='searchIcon' icon={faSearch} />
          </TopBarSearchDiv>
        </TopBarForm>
        <TopBarRightNav>
          <TopBarA
            href='/login'
            color='#39739D'
            background='#E1ECF4'
            borderColor='#7AA7C7'
          >
            Log in
          </TopBarA>
          <TopBarA
            href='/signup'
            color='#FFFFFF'
            background='#0A95FF'
            borderColor='#7AA7C7'
            marginLeft='0.3rem'
          >
            Sign up
          </TopBarA>
        </TopBarRightNav>
      </TopBarDiv>
    </Header>
  );
};

export default TopBar;
