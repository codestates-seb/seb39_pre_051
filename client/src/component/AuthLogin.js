import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../redux/slice/userInfoSlice';

const AuthLogin = (props) => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [rePasswordValid, setRePasswordValid] = useState(false);
  const [emailDesc, setEmailDesc] = useState('');
  const [passwordDesc, setPasswordDesc] = useState('');
  const [rePasswordDesc, setRePasswordDesc] = useState('');
  const [inputValue, setInputValue] = useState({
    displayName: '',
    email: '',
    password: '',
    rePassword: '',
  });
  const { displayName, email, password, rePassword } = inputValue;
  const dispatch=useDispatch()
  const navigate = useNavigate()
  const handleInput = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  //유효성 검사

  //regNumber는 검사대상 전체(/g)에서 0-9안의 요소가 있는지 확인함
  //regString은 검사대상 전체에서(/g)에서 영어대문자소문자가 있는지 확인함
  //regSpecialCharacter는 검사대상 전체에서 특수문자가 있는지 확인함
  
  const regNumber = /[0-9]/g;
  const regString = /[a-zA-Z]/g;
  const regSpecialCharacter =
    /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
  const regEmail =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  //비밀번호의 경우 아래와 같이 식을 구성하여 '8자이상 20자이하, 숫자, 문자, 특수문자를 포함해주세요.'의 조건을 갖게함.

  const emailValidation = () => {
    if (regEmail.test(email)) {
      setEmailValid(true);
      setEmailDesc('');
    } else {
      setEmailValid(false);
      setEmailDesc('잘못된 양식입니다.');
    }
  };

  const passwordValidation = () => {
    if (
      8 < password.length &&
      password.length < 20 &&
      regNumber.test(password) &&
      regString.test(password) &&
      regSpecialCharacter.test(password)
    ) {
      setPasswordValid(true);
      setPasswordDesc('');
    } else {
      setPasswordValid(false);
      setPasswordDesc('8자이상 20자이하, 숫자, 문자, 특수문자를 포함해주세요.');
    }
  };
  const rePasswordValidation = () => {
    if (rePassword === password) {
      setRePasswordValid(true);
      setRePasswordDesc('');
    } else {
      setRePasswordValid(false);
      setRePasswordDesc('입력하신 비밀번호가 같지않습니다.');
    }
  };

  //submitHandler
  const submitHandler = (e) => {
    e.preventDefault();
    if (props.status === 'login') {
      //로그인 일시
      if (!email || !password) {
        console.log('아이디와 비밀번호를 입력하세요!');
        return
      }
      try{
        dispatch(logIn({
          memberEmail : email,
          memberPassword : password}))
      } catch(err) {
        console.log('로그인 error', err)
      }
    } else {
      //회원가입 일시
      try {
        const response =  axios.post('/users/signup',{
          memberName : displayName,
          memberEmail : email,
          memberPassword : password
        })
        alert('회원가입이 완료되었습니다!')
        navigate('/')
        return console.log(response)
      } catch(err) {
        alert('회원정보를 확인해주세요!')
        console.log('회원가입 error', err);
      }
    }
  };

  return (
    <Container themeState={themeState}>
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
        <OAuthBtn
          background=' hsl(0,0%,100%)'
          color='#232629'
          border='1px solid #D6D9DC'
          themeState={themeState}
        >
          <FontAwesomeIcon icon={faGoogle} />
          {props.status === 'login' ? ' Login with' : ' Sign up with'} Google
        </OAuthBtn>
        <OAuthBtn
          background='hsl(210,8%,20%)'
          color='#FFFFFF'
          border='1px solid #D6D9DC'
          themeState={themeState}
        >
          <FontAwesomeIcon icon={faGithub} />
          {props.status === 'login' ? ' Login with' : ' Sign up with'} GitHub
        </OAuthBtn>
        <OAuthBtn
          background='#385499'
          color='#FFFFFF'
          border='1px solid  #FFFFFF'
          themeState={themeState}
        >
          <FontAwesomeIcon icon={faSquareFacebook} />
          {props.status === 'login' ? ' Login with' : ' Sign up with'} Facebook
        </OAuthBtn>
      </OAuthSection>
      <InputSection themeState={themeState}>
        <form onSubmit={submitHandler}>
          {props.status === 'login' ? (
            <>
              <InputWrapper themeState={themeState}>
                <label htmlFor='email'>Email</label>
                <input
                  id='email'
                  type='email'
                  name='email'
                  onChange={handleInput}
                  required
                />
              </InputWrapper>
              <InputWrapper themeState={themeState}>
                <label htmlFor='password'>Password</label>
                <input
                  id='password'
                  type='password'
                  name='password'
                  onChange={handleInput}
                  required
                />
              </InputWrapper>
            </>
          ) : (
            <>
              <InputWrapper themeState={themeState}>
                <label htmlFor='displayname'>Dispay name</label>
                <input
                  id='displayname'
                  type='text'
                  name='displayName'
                  onChange={handleInput}
                  required
                />
              </InputWrapper>
              <InputWrapper themeState={themeState}>
                <label htmlFor='email'>Email</label>
                <div>{emailDesc}</div>
                <input
                  id='email'
                  type='email'
                  name='email'
                  onChange={handleInput}
                  onKeyUp={emailValidation}
                  required
                />
              </InputWrapper>
              <InputWrapper themeState={themeState}>
                <label htmlFor='password'>Password</label>
                <div>{passwordDesc}</div>
                <input
                  id='password'
                  type='password'
                  name='password'
                  onChange={handleInput}
                  onKeyUp={passwordValidation}
                  required
                />
              </InputWrapper>
              <InputWrapper themeState={themeState}>
                <label htmlFor='rePassword2'>Confirm Password</label>
                <div>{rePasswordDesc}</div>
                <input
                  id='rePassword'
                  type='password'
                  name='rePassword'
                  onChange={handleInput}
                  onKeyUp={rePasswordValidation}
                  required
                />
              </InputWrapper>
            </>
          )}
          <BtnWrapper themeState={themeState}>
            <button>
              {props.status === 'login' ? 'Log in' : 'Sign up'}
            </button>
          </BtnWrapper>
        </form>
      </InputSection>
      <MessageLayout>
        {props.status === 'login'
          ? `Don't have an account `
          : `Already have an account? `}
        {props.status === 'login' ? (
          <a href='/signup'>Sign up</a>
        ) : (
          <a href='/login'>Log in</a>
        )}
      </MessageLayout>
    </Container>
  );
};

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
  span {
  }
  label {
    display: block;
    padding: 0 0.2rem;
    margin: 0.2rem 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: ${(props) =>
      props.themeState === 'light' ? 'inherits' : '#2D2D2D'};
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
  div{
    color: var(--color-orange);
    font-weight:600;
  }
`;

const BtnWrapper = styled.div`
  button {
    width: 100%;
    color: #ffffff;
    border-radius: 0.3rem;
    padding: 1rem;
    background-color: ${(props) =>
      props.themeState === 'light' ? '#0a95ff' : '#0C63A9'};
    border: ${(props) =>
      props.themeState === 'light' ? '1px solid #ffffff' : '1px solid #OC63A9'};
    border: 0.1rem solid #ffffff;
    box-shadow: rgba(255, 255, 255, 0.4) 0px 1px 0px 0px inset;
    cursor: pointer;
    &:hover {
      background-color: ${(props) =>
        props.themeState === 'light' ? '#0074cc' : '#0964AA'};
    }
  }
`;

// OAuth

const OAuthSection = styled.div`
  margin: 0 0 1.6rem 0;
`;

const OAuthBtn = styled.button`
  display: block;
  cursor: pointer;
  font-size: 1.3rem;
  line-height: 1.5rem;
  width: 100%;
  height: 3.78rem;
  margin: 0.4rem 0;
  padding: 0.6rem 1rem;
  color: ${(props) => props.color};
  background-color: ${(props) => props.background};
  border: ${(props) => (props.themeState === 'light' ? props.border : 'none')};
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
  a {
    text-decoration: none;
    color: hsl(206, 100%, 40%);
  }
`;

export default AuthLogin;
