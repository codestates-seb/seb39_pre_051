import styled from 'styled-components';
import TopBar from '../component/TopBar';
import Footer from '../component/Footer';
import SideBar from '../component/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBold,
  faCode,
  faFileCode,
  faHeading,
  faImage,
  faItalic,
  faLink,
  faList,
  faListNumeric,
  faQuoteRight,
  faRedo,
  faSquarePollHorizontal,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getUserId } from '../getUserInfo';

const UserProfile = () => {
  const userId = getUserId();

  const [userData, setUserData] = useState({});
  const [displayName, setDisplayName] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [rePasswordValid, setRePasswordValid] = useState(false);
  const [passwordDesc, setPasswordDesc] = useState('');
  const [rePasswordDesc, setRePasswordDesc] = useState('');
  const [inputValue, setInputValue] = useState({
    password: '',
    rePassword: '',
  });

  const { password, rePassword } = inputValue;

  //정규식 조건
  const regNumber = /[0-9]/g;
  const regString = /[a-zA-Z]/g;
  const regSpecialCharacter =
    /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;

  useEffect(() => {
    axios
      .get(`/users/${userId}`)
      .then((res) => {
        setDisplayName(res.data.userName);
        setUserData(res.data);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  //Display Name 입력을 다루는 함수
  const handleOnChange = (e) => {
    setDisplayName(e.target.value);
  };

  //Display Name과 Password의 변경을 서버에 적용시키는 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isActive) {
      if (inputValue.password === '' || inputValue.rePassword === '') {
        alert('input password');
        return;
      }
      if (!passwordValid || !rePasswordValidation) {
        alert('check valid option');
        return;
      }

      axios
        .patch(`/users/${userId}`, {
          userName: displayName,
          userPassword: password,
        })
        .then((res) => {
          setUserData({
            ...userData,
            userName: displayName,
            userPassword: password,
          });
          setIsActive(false);
        })
        .catch((err) => err);

      alert('Password has changed');
    } else {
      axios
        .patch(`/users/${userId}`, {
          userName: displayName,
          userPassword: password,
        })
        .then((res) => {
          setUserData({ ...userData, userName: displayName });
        })
        .catch((err) => err);

      alert('Display name has changed');
    }

    window.scrollTo(0, 0);
  };

  //Password 변경 버튼 클릭 함수
  const handleChangePassword = (e) => {
    setIsActive(true);
  };

  //변경할 Password의 정규식 검사하는 함수
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

  //변경할 Password와 rePassword가 같은지 검사하는 함수
  const rePasswordValidation = () => {
    if (rePassword === password) {
      setRePasswordValid(true);
      setRePasswordDesc('');
    } else {
      setRePasswordValid(false);
      setRePasswordDesc('입력하신 비밀번호가 같지않습니다.');
    }
  };

  //Password와 rePassword의 입력을 다루는 함수
  const handleInput = (event) => {
    const { name, value } = event.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  return (
    <>
      <TopBar />
      <Container>
        <SideBar pageName={'Users'} />
        <Content>
          <UserProfileDiv>
            <UserProfileImageDiv>
              <UserProfileImage src='https://lh3.googleusercontent.com/a-/AFdZucpIQ6i4DewU4N2dncFukPbb0eF3gkIB9xOsdEFNCw=k-s256' />
            </UserProfileImageDiv>
            <UserProfileDisplayName>{userData.userName}</UserProfileDisplayName>
          </UserProfileDiv>
          <UserProfileButton className='selected'>Settings</UserProfileButton>
          <UserProfileSetting>
            <UserProfileNav>
              PERSONAL INFORMATION
              <UserProfileNavItem
                href={`/users/${userId}`}
                className='selected'
              >
                Edit profile
              </UserProfileNavItem>
              SITE SETTINGS
              <UserProfileNavItem href='/users/preferences'>
                Preferences
              </UserProfileNavItem>
            </UserProfileNav>
            <UserProfileEdit>
              <UserProfileEditTitle>Edit your profile</UserProfileEditTitle>
              <UserProfileEditForm>
                <UserProfileEditFormHeader>
                  Public information
                </UserProfileEditFormHeader>
                <UserProfileEditFormContent>
                  <UserProfileEditFormTitle htmlFor='avartar'>
                    Profile image
                  </UserProfileEditFormTitle>
                  <UserProfileEditFormAvartarWrapper>
                    <UserProfileEditFormAvartar src='https://lh3.googleusercontent.com/a-/AFdZucpIQ6i4DewU4N2dncFukPbb0eF3gkIB9xOsdEFNCw=k-s256' />
                    <UserProfileEditFormInput
                      id='avartar'
                      type='hidden'
                      value='https://lh3.googleusercontent.com/a-/AFdZucpIQ6i4DewU4N2dncFukPbb0eF3gkIB9xOsdEFNCw=k-s128'
                    />
                    <UserProfileEditFormA>Change picture</UserProfileEditFormA>
                  </UserProfileEditFormAvartarWrapper>
                  <UserProfileEditFormTitle htmlFor='displayName'>
                    Display name
                  </UserProfileEditFormTitle>
                  <UserProfileEditFormInput
                    id='displayName'
                    type='text'
                    value={displayName}
                    onChange={handleOnChange}
                  />
                  <UserProfileEditFormTitle htmlFor='location'>
                    Location
                  </UserProfileEditFormTitle>
                  <UserProfileEditFormInput id='location' type='text' />
                  <UserProfileEditFormTitle htmlFor='title'>
                    Title
                  </UserProfileEditFormTitle>
                  <UserProfileEditFormInput id='title' type='text' />
                  <UserProfileEditFormTitle htmlFor='aboutMe'>
                    About me
                  </UserProfileEditFormTitle>
                  <UserProfileEditFormTextAreaButton>
                    <FontAwesomeIcon className='md-button' icon={faBold} />
                    <FontAwesomeIcon
                      className='md-button md-space'
                      icon={faItalic}
                    />
                    <FontAwesomeIcon className='md-button' icon={faLink} />
                    <FontAwesomeIcon
                      className='md-button'
                      icon={faQuoteRight}
                    />
                    <FontAwesomeIcon className='md-button' icon={faCode} />
                    <FontAwesomeIcon className='md-button' icon={faImage} />
                    <FontAwesomeIcon
                      className='md-button md-space'
                      icon={faFileCode}
                    />
                    <FontAwesomeIcon
                      className='md-button'
                      icon={faListNumeric}
                    />
                    <FontAwesomeIcon className='md-button' icon={faList} />
                    <FontAwesomeIcon className='md-button' icon={faHeading} />
                    <FontAwesomeIcon
                      className='md-button md-space'
                      icon={faSquarePollHorizontal}
                    />
                    <FontAwesomeIcon className='md-button' icon={faUndo} />
                    <FontAwesomeIcon className='md-button' icon={faRedo} />
                  </UserProfileEditFormTextAreaButton>
                  <UserProfileEditFormTextArea id='aboutMe' />
                  <UserProfileEditFormTextAreaResize />
                </UserProfileEditFormContent>
                <UserProfileEditFormHeader>Links</UserProfileEditFormHeader>
                <UserProfileEditFormContent id='links'>
                  <div>
                    <UserProfileEditFormTitle htmlFor='websiteLink'>
                      Website link
                    </UserProfileEditFormTitle>
                    <UserProfileEditFormInput id='websiteLink' type='text' />
                  </div>
                  <div>
                    <UserProfileEditFormTitle htmlFor='twitterLink'>
                      Twitter link or username
                    </UserProfileEditFormTitle>
                    <UserProfileEditFormInput id='twitterLink' type='text' />
                  </div>
                  <div>
                    <UserProfileEditFormTitle htmlFor='githubLink'>
                      GitHub link or username
                    </UserProfileEditFormTitle>
                    <UserProfileEditFormInput id='githubLink' type='text' />
                  </div>
                </UserProfileEditFormContent>
                <UserProfileEditFormHeader>
                  Private information
                </UserProfileEditFormHeader>
                <UserProfileEditFormContent id='changePassword'>
                  {isActive ? (
                    <>
                      <div>
                        <UserProfileEditFormTitle htmlFor='password'>
                          Password
                        </UserProfileEditFormTitle>
                        <UserProfileEditFormInput
                          id='password'
                          type='password'
                          name='password'
                          onChange={handleInput}
                          onKeyUp={passwordValidation}
                          required
                        />
                        <div>{passwordDesc}</div>
                      </div>
                      <div>
                        <UserProfileEditFormTitle htmlFor='rePassword'>
                          Confirm Password
                        </UserProfileEditFormTitle>
                        <UserProfileEditFormInput
                          id='rePassword'
                          type='password'
                          name='rePassword'
                          onChange={handleInput}
                          onKeyUp={rePasswordValidation}
                          required
                        />
                        <div>{rePasswordDesc}</div>
                      </div>
                    </>
                  ) : (
                    <UserProfileEditFormButton onClick={handleChangePassword}>
                      Change Password
                    </UserProfileEditFormButton>
                  )}
                </UserProfileEditFormContent>
                <UserProfileEditFormButton type='submit' onClick={handleSubmit}>
                  Save profile
                </UserProfileEditFormButton>
                <UserProfileEditFormButton
                  id='cancel'
                  color='#0074cc'
                  backgroundColor='transparent'
                  marginLeft='1rem'
                >
                  Cancel
                </UserProfileEditFormButton>
              </UserProfileEditForm>
            </UserProfileEdit>
          </UserProfileSetting>
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
  max-width: 100rem;
  width: calc(100% - 16.4rem);
  border-left: 1px solid #e3e6e8;
  padding: 2.4rem;
`;

const UserProfileDiv = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 1.6rem;
`;

const UserProfileImageDiv = styled.div`
  box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);
  border-radius: 0.5rem;
`;

const UserProfileImage = styled.img`
  display: block;
  width: 12.8rem;
  height: 12.8rem;
  border-radius: 0.5rem;
`;

const UserProfileDisplayName = styled.div`
  display: flex;
  align-items: center;
  max-width: 32.4rem;
  margin: 0.8rem 0 0.8rem 2rem;
  font-size: 3.2rem;
  font-weight: 500;
`;

const UserProfileButton = styled.a`
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0.8rem 1.2rem;
  margin-bottom: 1rem;
  position: relative;
  border-radius: 100rem;
  font-size: 1.3rem;
  cursor: pointer;

  &:hover {
    background-color: #e3e6e8;
  }

  &.selected {
    color: #ffffff;
    background-color: var(--color-orange);
  }

  &.selected:hover {
    color: #ffffff;
    background-color: #da680a;
  }
`;

const UserProfileSetting = styled.div`
  display: flex;
  margin-bottom: 4.8rem;
`;

const UserProfileNav = styled.nav`
  flex-shrink: 0;
  font-size: 1.1rem;
  font-weight: bold;
  padding: 0.6rem 1.2rem;
`;

const UserProfileNavItem = styled.a`
  display: flex;
  align-items: center;
  padding: 0.8rem 1.2rem;
  margin: 1rem -1.2rem;
  position: relative;
  border-radius: 100rem;
  font-size: 1.3rem;
  font-weight: normal;
  color: #586066;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: #e3e6e8;
  }

  &.selected {
    color: #ffffff;
    background-color: var(--color-orange);
  }

  &.selected:hover {
    color: #ffffff;
    background-color: #da680a;
  }
`;

const UserProfileEdit = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 3.3rem;
`;

const UserProfileEditTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  font-size: 2.6rem;
  padding-bottom: 1.6rem;
  margin-bottom: 2.4rem;
  border-bottom: 1px solid #e3e6e8;
`;

const UserProfileEditForm = styled.form``;

const UserProfileEditFormHeader = styled.div`
  font-size: 2rem;
  margin-bottom: 0.8rem;
`;

const UserProfileEditFormContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.4rem;
  border: 1px solid #e3e6e8;
  margin-bottom: 4.8rem;

  &#links {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &#links div {
    display: flex;
    flex-direction: column;
    font-size: 1.3rem;
  }

  &#changePassword {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &#changePassword div {
    display: flex;
    flex-direction: column;
    font-size: 1.3rem;
  }
`;

const UserProfileEditFormTitle = styled.label`
  padding: 0 0.2rem;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
  cursor: pointer;
`;

const UserProfileEditFormAvartarWrapper = styled.div`
  margin: 0.2rem;
  position: relative;
  width: 164px;
  height: 164px;
  overflow: hidden;
  margin-bottom: 1.4rem;
`;

const UserProfileEditFormAvartar = styled.img`
  display: block;
  width: 16.4rem;
  height: 16.4rem;
  border-radius: 0.3rem;
`;

const UserProfileEditFormInput = styled.input`
  max-width: 39rem;
  min-width: 23rem;
  padding: 0.6rem 0.7rem;
  border: 1px solid #babfc4;
  border-radius: 0.3rem;
  margin-bottom: 1.4rem;

  &#password {
    min-width: 30rem;
  }

  &#rePassword {
    min-width: 33rem;
  }
`;

const UserProfileEditFormA = styled.a`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border: 0;
  border-radius: 0 0 0.3rem 0.3rem;
  color: #ffffff;
  text-align: center;
  padding: 1rem 0;
  width: auto;
  font-size: 1.3rem;
  text-decoration: none;
  background-color: #525960;
  cursor: pointer;

  &:hover {
    background-color: #3b4045;
  }
`;

const UserProfileEditFormTextAreaButton = styled.div`
  width: 100%;
  min-height: 4.4rem;
  border: 1px solid #babfc4;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  color: #494a4a;

  .md-button {
    max-width: 2.8rem;
    height: 1.5rem;
    flex: 10 0 2.3rem;
    margin-right: 0.5rem;
    padding: 1.2rem 0 0 1.2rem;
    cursor: pointer;
  }

  .md-space {
    margin-right: 3.3rem;
  }
`;

const UserProfileEditFormTextArea = styled.textarea`
  padding: 1rem;
  margin: -0.1rem 0 0;
  height: 20rem;
  line-height: 1.3;
  width: 100%;
  border: 1px solid #babfc4;
  resize: none;
`;

const UserProfileEditFormTextAreaResize = styled.div`
  width: 100%;
  height: 1.1rem;
  border: 1px solid #babfc4;
  margin: -0.3rem 0 0;
  cursor: s-resize;
  overflow: hidden;
  background-color: #f1f2f3;
  margin-bottom: 1.4rem;
`;

const UserProfileEditFormButton = styled.button`
  padding: 0.8rem 1.04rem;
  font-size: 1.3rem;
  border: 0.1rem solid #6a737c;
  border-radius: 0.3rem;
  text-decoration: none;

  &:hover {
    background-color: #0074cc;
  }

  &#cancel:hover {
    background-color: #f0f8ff;
  }

  color: ${(props) => props.color || '#ffffff'};
  background-color: ${(props) => props.backgroundColor || '#0a95ff'};
  border-color: ${(props) => props.borderColor || 'transparent'};
  margin-left: ${(props) => props.marginLeft || '0'};
`;

export default UserProfile;
