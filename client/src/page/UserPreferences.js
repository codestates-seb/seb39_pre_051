import styled from 'styled-components';
import TopBar from '../component/TopBar';
import Footer from '../component/Footer';
import SideBar from '../component/SideBar';

const UserProfile = () => {
  return (
    <>
      <TopBar />
      <Container>
        <SideBar />
        <Content>
          <UserProfileDiv>
            <UserProfileImageDiv>
              <UserProfileImage src='https://lh3.googleusercontent.com/a-/AFdZucpIQ6i4DewU4N2dncFukPbb0eF3gkIB9xOsdEFNCw=k-s256' />
            </UserProfileImageDiv>
            <UserProfileDisplayName>chocolate</UserProfileDisplayName>
          </UserProfileDiv>
          <UserProfileButton className='selected'>Settings</UserProfileButton>
          <UserProfileSetting>
            <UserProfileNav>
              PERSONAL INFORMATION
              <UserProfileNavItem href='/users'>
                Edit profile
              </UserProfileNavItem>
              SITE SETTINGS
              <UserProfileNavItem
                href='/users/preferences'
                className='selected'
              >
                Preferences
              </UserProfileNavItem>
            </UserProfileNav>
            <UserProfilePreferences>
              <UserProfilePreferencesTitle>
                Preferences
              </UserProfilePreferencesTitle>
              <UserProfilePreferencesHeader>
                Interface
              </UserProfilePreferencesHeader>
              <UserProfilePreferencesContent>
                <UserProfilePreferencesTheme>Theme</UserProfilePreferencesTheme>
                <UserProfilePreferencesThemeWrapper>
                  <UserProfilePreferencesThemeLabel htmlFor='light'>
                    <UserProfilePreferencesThemeItem>
                      <input
                        id='light'
                        type='radio'
                        name='theme'
                        checked='checked'
                      />
                      <UserProfilePreferencesThemeImageWrapper>
                        <UserProfilePreferencesThemeImage src='https://cdn.sstatic.net/Img/preferences/theme-light.svg?v=2d017a78abab' />
                        Light
                      </UserProfilePreferencesThemeImageWrapper>
                    </UserProfilePreferencesThemeItem>
                  </UserProfilePreferencesThemeLabel>
                  <UserProfilePreferencesThemeLabel htmlFor='dark'>
                    <UserProfilePreferencesThemeItem>
                      <input id='dark' type='radio' name='theme' />
                      <UserProfilePreferencesThemeImageWrapper>
                        <UserProfilePreferencesThemeImage src='https://cdn.sstatic.net/Img/preferences/theme-dark.svg?v=9a46fd615a91' />
                        Dark
                      </UserProfilePreferencesThemeImageWrapper>
                    </UserProfilePreferencesThemeItem>
                  </UserProfilePreferencesThemeLabel>
                </UserProfilePreferencesThemeWrapper>
              </UserProfilePreferencesContent>
            </UserProfilePreferences>
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
  margin: 0.8rem;
  font-size: 2.6rem;
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

const UserProfilePreferences = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 3.3rem;
`;

const UserProfilePreferencesTitle = styled.div`
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

const UserProfilePreferencesHeader = styled.div`
  font-size: 2rem;
  margin-bottom: 0.8rem;
`;

const UserProfilePreferencesContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2.4rem;
  border: 1px solid #e3e6e8;
  margin-bottom: 4.8rem;
`;

const UserProfilePreferencesTheme = styled.div`
  padding: 0 0.2rem;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
`;

const UserProfilePreferencesThemeWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 4.8rem;
`;

const UserProfilePreferencesThemeLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const UserProfilePreferencesThemeItem = styled.div`
  display: flex;
  align-items: center;

  input {
    cursor: pointer;
  }
`;

const UserProfilePreferencesThemeImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.4rem;
`;

const UserProfilePreferencesThemeImage = styled.img`
  width: 10rem;
  height: 6.8rem;
  margin-bottom: 0.5rem;
`;

export default UserProfile;
