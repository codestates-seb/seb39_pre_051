import styled from 'styled-components';
import TopBar from '../component/TopBar';
import Footer from '../component/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpRightFromSquare,
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

const Ask = () => {
  const Container = styled.div`
    min-height: 100%;
    position: relative;
    flex: 1 0 auto;
    width: 100%;
    min-width: 126.4rem;
    background: #f1f2f3;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding-top: 5.06rem;
    padding-left: 2.6rem;
  `;

  const HeadLine = styled.div`
    width: 88rem;
    height: 13rem;
    display: flex;
    align-items: center;
    font-size: 2.5rem;
  `;

  const QuestionForm = styled.form`
    width: 88rem;
    padding: 1.6rem;
    background-color: #ffffff;
    box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.06), 0 2px 6px hsla(0, 0%, 0%, 0.06),
      0 3px 8px hsla(0, 0%, 0%, 0.09); ;
  `;

  const QuestionTitleContainer = styled.div`
    margin-bottom: 1.6rem;
  `;

  const QusetionTitleLabel = styled.label`
    font-size: 1.5rem;
    font-weight: 700;
    color: #0c0d0e;
    cursor: pointer;
  `;

  const QusetionTitleP = styled.p`
    margin-top: 0.4rem;
    margin-bottom: 0.4rem;
    font-size: 1.4rem;
    font-weight: normal;
  `;

  const QuestionTitleInput = styled.input`
    width: 100%;
    height: 3.35rem;
    padding: 0.6rem 0.7rem;
    border: 1px solid #babfc4;
    border-radius: 0.3rem;
    background-color: #ffffff;
    color: #0c0d0e;
    font-size: 1.3rem;

    ::placeholder {
      color: #babfc4;
    }
  `;

  const QuestionBodyContainer = styled.div`
    margin-bottom: 1.6rem;
  `;

  const QuestionBodyLabel = styled.label`
    font-size: 1.5rem;
    font-weight: 700;
    color: #0c0d0e;
    cursor: pointer;
  `;

  const QuestionBodyP = styled.p`
    margin-top: 0.4rem;
    margin-bottom: 0.4rem;
    font-size: 1.4rem;
    font-weight: normal;
  `;

  const QuestionBodyButton = styled.div`
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

  const QuestionFormattingTipsButton = styled.div`
    display: inline-block;
    position: relative;
    left: 21.8rem;
    bottom: 0.1rem;
    padding: 0.8rem 1.04rem;
    font-size: 1.3rem;
    line-height: 1.5;
    border: 0.1rem solid transparent;
    border-radius: 0.3rem;
    color: #3b4045;
    background-color: #e3e6e8;
    text-decoration: none;
    cursor: pointer;
  `;

  const QuestionBodyMdHelp = styled.div`
    display: flex;
    width: 100%;
    height: 3rem;
    background-color: #f7f7f8;
    margin: -0.1rem 0 0;
    border: 1px solid #babfc4;
  `;

  const QuestionBodyMdHelpUl = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0.5rem 0 0 0.5rem;
  `;

  const QuestionBodyMdHelpLi = styled.li`
    display: inline-block;
    padding: 0.5rem 0.6rem 0.6rem;
    margin: 0 0.2rem;
    font-size: 1.3rem;
    cursor: pointer;
  `;

  const QuestionBodyMdHelpA = styled.a`
    display: inline-block;
    color: var(--color-blue);
    padding: 0.3rem 0.6rem 0.6rem;
    margin: -0.1rem 0 0;
    font-size: 1.3rem;
    text-decoration: none;
    cursor: pointer;

    #faArrow {
      margin-left: 0.2rem;
    }
  `;

  const QuestionBodyDiv = styled.div`
    position: relative;
  `;

  const QuestionBodyTextArea = styled.textarea`
    padding: 1rem;
    margin: -0.1rem 0 0;
    height: 20rem;
    border: 1px solid #babfc4;
    line-height: 1.3;
    width: 100%;
    font-size: 1.6rem;
    resize: none;
  `;

  const QuestionBodyResize = styled.div`
    width: 100%;
    height: 1.1rem;
    border: 1px solid #babfc4;
    border-width: 0 1px 1px;
    margin: -0.3rem 0 0;
    cursor: s-resize;
    overflow: hidden;
    background-color: #f1f2f3;
  `;

  const QuestionTagsContainer = styled.div`
    margin-bottom: 1.6rem;
  `;

  const QuestionTagsLabel = styled.label`
    font-size: 1.5rem;
    font-weight: 700;
    color: #0c0d0e;
    cursor: pointer;
  `;

  const QuestionTagsP = styled.p`
    margin-top: 0.4rem;
    margin-bottom: 0.4rem;
    font-size: 1.4rem;
    font-weight: normal;
  `;

  const QuestionTagsInput = styled.input`
    width: 100%;
    height: 3.35rem;
    padding: 0.6rem 0.7rem;
    border: 1px solid #babfc4;
    border-radius: 0.3rem;
    background-color: #ffffff;
    color: #0c0d0e;
    font-size: 1.3rem;

    ::placeholder {
      color: #babfc4;
    }
  `;

  const QuestionSubmitContainer = styled.div`
    width: 88rem;
    height: 13rem;
    display: flex;
    align-items: center;
    font-size: 2.5rem;
  `;

  const QuestionSubmitButton = styled.div`
    padding: 0.8rem 1.04rem;
    font-size: 1.3rem;
    line-height: 1.5;
    border: 0.1rem solid #6a737c;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      background: #0074cc;
    }

    & + #discard:hover {
      background: #fcf2f2;
    }

    color: ${(props) => props.color || '#525960'};
    background: ${(props) => props.background || '#F8F9F9'};
    border-color: ${(props) => props.borderColor || 'transparent'};
    border-radius: ${(props) => props.borderRadius || '0.3rem'};
    margin-right: ${(props) => props.marginRight || '0'};
  `;

  return (
    <>
      <TopBar />
      <Container>
        <HeadLine>Ask a public question</HeadLine>
        <QuestionForm>
          <QuestionTitleContainer>
            <QusetionTitleLabel htmlFor='title'>
              Title
              <QusetionTitleP>
                Be specific and imagine you’re asking a question to another
                person
              </QusetionTitleP>
            </QusetionTitleLabel>
            <QuestionTitleInput
              id='title'
              type='text'
              placeholder='e.g. Is there an R function for finding the index of an element in a vector?'
            />
          </QuestionTitleContainer>
          <QuestionBodyContainer>
            <QuestionBodyLabel htmlFor='body'>
              Body
              <QuestionBodyP>
                Include all the information someone would need to answer your
                question
              </QuestionBodyP>
            </QuestionBodyLabel>
            <QuestionBodyButton>
              <FontAwesomeIcon className='md-button' icon={faBold} />
              <FontAwesomeIcon className='md-button md-space' icon={faItalic} />
              <FontAwesomeIcon className='md-button' icon={faLink} />
              <FontAwesomeIcon className='md-button' icon={faQuoteRight} />
              <FontAwesomeIcon className='md-button' icon={faCode} />
              <FontAwesomeIcon className='md-button' icon={faImage} />
              <FontAwesomeIcon
                className='md-button md-space'
                icon={faFileCode}
              />
              <FontAwesomeIcon className='md-button' icon={faListNumeric} />
              <FontAwesomeIcon className='md-button' icon={faList} />
              <FontAwesomeIcon className='md-button' icon={faHeading} />
              <FontAwesomeIcon
                className='md-button md-space'
                icon={faSquarePollHorizontal}
              />
              <FontAwesomeIcon className='md-button' icon={faUndo} />
              <FontAwesomeIcon className='md-button' icon={faRedo} />
              <QuestionFormattingTipsButton>
                Hide formatting tips
              </QuestionFormattingTipsButton>
            </QuestionBodyButton>
            <QuestionBodyMdHelp>
              <QuestionBodyMdHelpUl>
                <QuestionBodyMdHelpLi>Links</QuestionBodyMdHelpLi>
                <QuestionBodyMdHelpLi>Images</QuestionBodyMdHelpLi>
                <QuestionBodyMdHelpLi>Styling/Headers</QuestionBodyMdHelpLi>
                <QuestionBodyMdHelpLi>Lists</QuestionBodyMdHelpLi>
                <QuestionBodyMdHelpLi>Blockquotes</QuestionBodyMdHelpLi>
                <QuestionBodyMdHelpLi>Code</QuestionBodyMdHelpLi>
                <QuestionBodyMdHelpLi>HTML</QuestionBodyMdHelpLi>
                <QuestionBodyMdHelpLi>Tables</QuestionBodyMdHelpLi>
                <QuestionBodyMdHelpA href='https://stackoverflow.com/editing-help'>
                  More
                  <FontAwesomeIcon
                    id='faArrow'
                    icon={faArrowUpRightFromSquare}
                  />
                </QuestionBodyMdHelpA>
              </QuestionBodyMdHelpUl>
            </QuestionBodyMdHelp>
            <QuestionBodyDiv>
              <QuestionBodyTextArea id='body' />
              <QuestionBodyResize></QuestionBodyResize>
            </QuestionBodyDiv>
          </QuestionBodyContainer>
          <QuestionTagsContainer>
            <QuestionTagsLabel htmlFor='label'>
              Tags
              <QuestionTagsP>
                Add up to 5 tags to describe what your question is about
              </QuestionTagsP>
            </QuestionTagsLabel>
            <QuestionTagsInput
              id='label'
              type='text'
              placeholder='e.g. (ruby-on-rails .net sql-server)'
            />
          </QuestionTagsContainer>
        </QuestionForm>
        <QuestionSubmitContainer>
          <QuestionSubmitButton
            color='#FFFFFF'
            background='#0A95FF'
            borderColor='#7AA7C7'
            marginRight='0.4rem'
          >
            Review your question
          </QuestionSubmitButton>
          <QuestionSubmitButton id='discard' color='#C22E32' background='none'>
            Discard draft
          </QuestionSubmitButton>
        </QuestionSubmitContainer>
      </Container>
      <Footer />
    </>
  );
};

export default Ask;
