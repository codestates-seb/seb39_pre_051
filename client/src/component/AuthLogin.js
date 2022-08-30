import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 28.8rem;
`;
// input
const InputSection = styled.div`
  border-radius: 0.7rem;
  margin-bottom: 2.4rem;
  background-color: #ffffff;
  padding: 2.4rem;
  form {
    border-radius: 0.7rem;
    
    
  }
`;

const InputWrapper = styled.div`
  padding: 0.4rem 0;
  label {
    display: block;
    padding: 0 0.2rem;
    margin: 0.2rem 0;
    font-size: 1.5rem;
    font-weight: 600;
  }
  input {
    width: 100%;
    padding: 0.8rem 0.9rem;
    border-radius: 0.3rem;
    border: 1px solid #babfc4;
  }
  &#login {
    display: none;
  }
`;

const BtnWrapper = styled.div`
  button {
    width: 100%;
    color: #ffffff;
    border-radius: 0.3rem;
    padding: 1rem;
    background-color: #0a95ff;
    border: 0.1rem solid #ffffff;
    box-shadow:rgba(255,255,255,0.4) 0px 1px 0px 0px inset;
    cursor: pointer;
    &:hover {
    }
  }
`;



// OAuth

const OAuthSection = styled.div`
  margin: 0 0 1.6rem 0;
`;

const OAuthBtn = styled.button`
  display: block;
  font-size: 1.3rem;
  line-height: 1.5rem;
  width: 100%;
  height: 3.78rem;
  margin: 0.4rem 0;
  padding: 0.6rem 1rem ;
  color: ${(props)=> props.color};
  background-color: ${(props) => props.background};
  border : ${(props)=> props.border};
  border-radius: 0.5rem;
`;

const Test = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;
const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 1rem 0;
  width: 6.4rem;
`;

//message

const MessageLayout = styled.div`
  font-size: 1.3rem;
  text-align: center;
  a{
    text-decoration: none;
    color: hsl(206,100%,40%);
  }
`

const AuthLogin = (props) => {
  const displayNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  return (
    <Container>
      <Test>
        <LogoContainer>
          <a href='/'>
            <svg width='32' height='37' viewBox='0 0 32 37'>
              <path d='M26 33v-9h4v13H0V24h4v9h22Z' fill='#BCBBBB'></path>
              <path
                d='m21.5 0-2.7 2 9.9 13.3 2.7-2L21.5 0ZM26 18.4 13.3 7.8l2.1-2.5 12.7 10.6-2.1 2.5ZM9.1 15.2l15 7 1.4-3-15-7-1.4 3Zm14 10.79.68-2.95-16.1-3.35L7 23l16.1 2.99ZM23 30H7v-3h16v3Z'
                fill='#F48024'
              ></path>
            </svg>
          </a>
        </LogoContainer>
      </Test>

      <OAuthSection>
        <OAuthBtn background=' hsl(0,0%,100%)' color='#232629' border='1px solid #D6D9DC'>
          <FontAwesomeIcon icon={faGoogle} />
          {props.status === 'login' ? ' Login with' : ' Sign up with'} Google
        </OAuthBtn>
        <OAuthBtn background='hsl(210,8%,20%)' color='#FFFFFF' border='1px solid #D6D9DC'>
          <FontAwesomeIcon icon={faGithub} />
          {props.status === 'login' ? ' Login with' : ' Sign up with'} GitHub
        </OAuthBtn>
        <OAuthBtn background='#385499' color='#FFFFFF' border='1px solid  #FFFFFF'>
          <FontAwesomeIcon icon={faSquareFacebook} />
          {props.status === 'login' ? ' Login with' : ' Sign up with'} Facebook
        </OAuthBtn>
      </OAuthSection>
      <InputSection>
        <form onSubmit={props.submitHandler}>
          <InputWrapper id={props.status}>
            <label htmlFor='displayname'>Dispay name</label>
            <input id='displayname' type='text' ref={displayNameInputRef} />
          </InputWrapper>
          <InputWrapper>
            <label htmlFor='email'>Email</label>
            <input id='emil' type='email' ref={emailInputRef} />
          </InputWrapper>
          <InputWrapper>
            <label htmlFor='password'>Password</label>
            <input id='password' type='password' ref={passwordInputRef} />
          </InputWrapper>
          <BtnWrapper>
            <button type='button'>
              {props.status === 'login' ? 'Log in' : 'Sign Up'}
            </button>
          </BtnWrapper>
        </form>
      </InputSection>
      <MessageLayout>
        {props.status==='login' ? `Don't have an account ` : `Already have an account? `}{props.status==='login' ? <a href='/signup'>Sign up</a>  : <a href='/login'>Log in</a>}
      </MessageLayout>
    </Container>
  );
};

export default AuthLogin;
