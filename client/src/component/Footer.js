import styled from 'styled-components';

const FooterLayout = styled.footer`
  width: 100%;
  background-color: #232629;
  transform: translateY(100%);
`;
const FooterWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 1.5rem 3.5rem;
  max-width: 126.4rem;
`;
const LogoContainer = styled.div`
  margin: 1rem 0;
  width: 6.4rem;
  @media (max-width: 640px) {
    display: none;
  }
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 1rem 0;
  @media (max-width: 980px) {
    flex-direction: column;
  }
`;
const FooterContainer = styled.div`
  display: block;
  line-height: 1.7875rem;
  padding: 0 1rem;
  margin-right: 9rem;
`;

const FooterTitle = styled.h5`
  font-size: 1.3rem;
  font-weight: bold;
  padding: 1rem 0 2rem 0;
  a {
    text-decoration: none;
    color: #babfc4;
  }
`;

const FooterA = styled.a`
  color: #9fa6ad;
  text-decoration: none;
  display: block;
  font-size: 1.3rem;
  height: 2.5rem;
  &.sns {
    display: inline;
    font-size: 1.1rem;
    padding: 0.4rem 0;
    margin-right: 0.5rem;
  }
`;
const FooterSNSContainer = styled.div`
  line-height: 1.5125rem;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;
const FooterCopyright = styled.div`
  margin-top: 22rem;
  display: inline;
  flex-direction: column;
  justify-content: end;
  font-size: 1.1.rem;
  color: #9199a1;
  flex-wrap: wrap;
  width: 22rem;
  a {
    color: #9fa6ad;
  }
`;

const STACK_OVERFLOW_com = 'https://stackoverflow.com';
const STACK_OVERFLOW_co = 'https://stackoverflow.co';
const STACK_EXCHANGE = 'https://stackexchange.com/';
const Footer = () => {
  return (
    <FooterLayout>
      <FooterWrapper>
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
        <Nav>
          <FooterContainer>
            <FooterTitle>
              <a href={`${STACK_OVERFLOW_com}`}>STACK OVERFLOW</a>
            </FooterTitle>
            <FooterA>Questions</FooterA>
            <FooterA href={`${STACK_OVERFLOW_com}/help`}>Help</FooterA>
          </FooterContainer>
          <FooterContainer>
            <FooterTitle>
              <a href={`${STACK_OVERFLOW_com}/?products`}>PRODUCTS</a>
            </FooterTitle>
            <FooterA href={`${STACK_OVERFLOW_co}/teams/`}>Teams</FooterA>
            <FooterA href={`${STACK_OVERFLOW_co}/advertising`}>
              Advertising
            </FooterA>
            <FooterA href={`${STACK_OVERFLOW_co}/collectives`}>
              Collectives
            </FooterA>
            <FooterA href={`${STACK_OVERFLOW_co}/talent`}>Talent</FooterA>
          </FooterContainer>
          <FooterContainer>
            <FooterTitle>
              <a href={`${STACK_OVERFLOW_co}`}>COMPANY</a>
            </FooterTitle>
            <FooterA href={`${STACK_OVERFLOW_co}`}>About</FooterA>
            <FooterA href={`${STACK_OVERFLOW_co}/company/press`}>Press</FooterA>
            <FooterA href={`${STACK_OVERFLOW_co}/company/work-here`}>
              Work Here
            </FooterA>
            <FooterA href={`${STACK_OVERFLOW_com}/legal/terms-of-service`}>
              Legal
            </FooterA>
            <FooterA href={`${STACK_OVERFLOW_com}/legal/privacy-policy`}>
              Privacy Policy
            </FooterA>
            <FooterA href={`${STACK_OVERFLOW_com}/legal/terms-of-service`}>
              Terms of Service
            </FooterA>
            <FooterA href={`${STACK_OVERFLOW_co}/company/contact`}>
              Contact Us
            </FooterA>
            <FooterA href={`${STACK_OVERFLOW_com}/questions#`}>
              Cookie Settings
            </FooterA>
            <FooterA href={`${STACK_OVERFLOW_com}/legal/cookie-policy`}>
              Cookie Policy
            </FooterA>
          </FooterContainer>
          <FooterContainer>
            <FooterTitle>
              <a href={`${STACK_EXCHANGE}`}>STACK EXCHANGE NETWORK</a>
            </FooterTitle>
            <FooterA href={`${STACK_EXCHANGE}/sites#technology`}>
              Technology
            </FooterA>
            <FooterA href={`${STACK_EXCHANGE}sites#culturerecreation`}>
              Culture & recreation
            </FooterA>
            <FooterA href={`${STACK_EXCHANGE}/sites#lifearts`}>
              Life & arts
            </FooterA>
            <FooterA href={`${STACK_EXCHANGE}/sites#science`}>Science</FooterA>
            <FooterA href={`${STACK_EXCHANGE}/sites#professional`}>
              Professional
            </FooterA>
            <FooterA href={`${STACK_EXCHANGE}/sites#business`}>
              Business
            </FooterA>
            <FooterA></FooterA>
            <FooterA href='https://api.stackexchange.com/'>API</FooterA>
            <FooterA href='https://data.stackexchange.com/'>Data</FooterA>
          </FooterContainer>
          <Info>
            <FooterSNSContainer>
              <FooterA
                href='https://stackoverflow.blog/?blb=1&_ga=2.90639386.1204490017.1661229900-1108028319.1637314211'
                className='sns'
              >
                Blog
              </FooterA>
              <FooterA
                href='https://www.facebook.com/officialstackoverflow/'
                className='sns'
              >
                Facebook
              </FooterA>
              <FooterA href='https://twitter.com/stackoverflow' className='sns'>
                Twitter
              </FooterA>
              <FooterA
                href='https://www.linkedin.com/authwall?trk=gf&trkInfo=AQHJoU9kDI2vWAAAAYLUF3O4Dqbs808Lz4yklA11HbxPSRrBxMzSx8m4IXMll5rF6ht7Ows1wDPs1zrBK8lCg41f7Z-MPwTZeedtM9lHpCnsjB4TUV9ibTcyDMTFAp9H8IIdP1Q=&original_referer=https://stackoverflow.com/&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fcompany%2Fstack-overflow'
                className='sns'
              >
                LinkedIn
              </FooterA>
              <FooterA
                href='https://www.instagram.com/thestackoverflow/'
                className='sns'
              >
                Instagram
              </FooterA>
            </FooterSNSContainer>
            <FooterCopyright>
              Site design / logo © 2022 Stack Exchange Inc; user contributions
              licensed under
              <a href='https://stackoverflow.com/help/licensing'>CC BY-SA.</a>
              <br />
              rev 2022.8.24.42908
            </FooterCopyright>
          </Info>
        </Nav>
      </FooterWrapper>
    </FooterLayout>
  );
};

export default Footer;
