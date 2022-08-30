import styled from 'styled-components';

const AskBtn = () => {
  return(
    <AskBtnLayout>
    <AskBtnLink href='/ask'>Ask Question</AskBtnLink>
  </AskBtnLayout>
  )
};

const AskBtnLayout = styled.div`
  margin: 0 0 0 1.2rem ;
`

const AskBtnLink = styled.a`
  cursor: pointer;
  background-color: #0a95ff;
  color: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 0.3rem;
  width: 10.3rem;
  height: 3.78rem;
  text-align: center;
  font-size:1.3rem;
  line-height:1.5rem;
  padding: 1rem;
  text-decoration: none;
  :hover{
    background-color: #0074cc;
  }
`;

export default AskBtn;
