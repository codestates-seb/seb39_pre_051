import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import {useSelector} from 'react-redux'



const TopBar = (props) => {
  const themeState = useSelector((state)=>state.themeSlice).theme
  console.log(themeState)
  return (
    <Header themeState={themeState}>
      <TopBarDiv>
        <TobBarLogoA href='/' themeState={themeState} >
          <TobBarLogoSpan />
        </TobBarLogoA>
        <TobBarLeftNav>
          <TopBarA href='https://stackoverflow.co/' themeState={themeState}>About</TopBarA>
          <TopBarA href='#' themeState={themeState}>Products</TopBarA>
          <TopBarA href='https://stackoverflow.co/teams/' themeState={themeState}>For Teams</TopBarA>
        </TobBarLeftNav>
        <TopBarForm id='search'>
          <TopBarSearchDiv>
            <TopBarInput type='text' placeholder='Search...' />
            <FontAwesomeIcon id='searchIcon' icon={faSearch} />
          </TopBarSearchDiv>
        </TopBarForm>
        <TopBarRightNav>
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
  background-color: ${(props) => props.themeState === 'light' ?  '#f8f9f9' : '#393939'};
`;

const TobBarLogoA = styled.a`
  height: 100%;
  display: flex;
  align-items: center;
  text-decoration: none;

  &:hover {
    background-color: ${(props) => props.themeState === 'light' ? ' #e3e6e8;' : '#414244'};
  }
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
  margin: 0.2rem;
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
  border: 0.1rem solid #6a737c;
  text-decoration: none;
  &:hover {
    background-color: ${(props) => props.themeState === 'light' ? ' #e3e6e8;' : '#414244'};
  }

  &#login:hover {
    background-color: ${(props) => props.themeState==='light' ? '#b3d3ea' : '#414244'};
  }

  &#signup:hover {
    background-color: ${(props) => props.themeState==='light' ? '#0074cc' : '#414244'};
  }
  color: ${(props)=> props.themeState==='light' ? props.color || '#525960' : '#E7E9EB' };
  background-color: ${(props) => props.themeState==='light' ? props.backgroundColor || '#F8F9F9'  : '#393939'};
  border-color:${(props) => props.themeState==='light' ? props.borderColor || 'transparent' : '#393939'};
  border-radius: ${(props) => props.borderRadius || '100rem'};
  margin-left: ${(props) => props.marginLeft || '0'};
`;

export default TopBar;
