import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';

const SideBarWidget = (props) => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  return (
    <WidgetLayout>
      <WidgetContainer themeState={themeState}>
        <WidgetUl>
          <WidgetLi className='widget--header' themeState={themeState}>
            The Overflow Blog
          </WidgetLi>
          <WidgetLi className='widget--item' themeState={themeState}>
            <WidgetIcon>
              <svg width='14' height='14' viewBox='0 0 14 14'>
                {themeState === 'light' ? (
                  <path d='m11.1 1.71 1.13 1.12c.2.2.2.51 0 .71L11.1 4.7 9.21 2.86l1.17-1.15c.2-.2.51-.2.71 0ZM2 10.12l6.37-6.43 1.88 1.88L3.88 12H2v-1.88Z'></path>
                ) : (
                  <path
                    fill='white'
                    d='m11.1 1.71 1.13 1.12c.2.2.2.51 0 .71L11.1 4.7 9.21 2.86l1.17-1.15c.2-.2.51-.2.71 0ZM2 10.12l6.37-6.43 1.88 1.88L3.88 12H2v-1.88Z'
                  ></path>
                )}
              </svg>
            </WidgetIcon>
            <WidgetContent>
              <WidgetA
                href='https://stackoverflow.blog/2022/08/29/stack-overflow-student-ambassador-program-how-to-apply/?cb=1'
                themeState={themeState}
              >
                Stack Overflow is launching a Student Ambassador program. Here’s
                how to apply.
              </WidgetA>
            </WidgetContent>
          </WidgetLi>
          <WidgetLi className='widget--item' themeState={themeState}>
            <WidgetIcon>
              <svg width='14' height='14' viewBox='0 0 14 14'>
                {themeState === 'light' ? (
                  <path d='m11.1 1.71 1.13 1.12c.2.2.2.51 0 .71L11.1 4.7 9.21 2.86l1.17-1.15c.2-.2.51-.2.71 0ZM2 10.12l6.37-6.43 1.88 1.88L3.88 12H2v-1.88Z'></path>
                ) : (
                  <path
                    fill='white'
                    d='m11.1 1.71 1.13 1.12c.2.2.2.51 0 .71L11.1 4.7 9.21 2.86l1.17-1.15c.2-.2.51-.2.71 0ZM2 10.12l6.37-6.43 1.88 1.88L3.88 12H2v-1.88Z'
                  ></path>
                )}
              </svg>
            </WidgetIcon>
            <WidgetContent>
              <WidgetA
                href='https://stackoverflow.blog/2022/08/30/what-companies-lose-when-they-track-worker-productivity-ep-478/?cb=1'
                themeState={themeState}
              >
                What companies lose when they track worker productivity (Ep.
                478)
              </WidgetA>
            </WidgetContent>
          </WidgetLi>
          <WidgetLi className='widget--header' themeState={themeState}>
            Featured on Meta
          </WidgetLi>
          <WidgetLi className='widget--item' themeState={themeState}>
            <WidgetIcon>
              <FontAwesomeIcon icon={faCommentAlt} color='#45a2d9' />
            </WidgetIcon>
            <WidgetContent>
              <WidgetA
                href='https://meta.stackexchange.com/questions/381310/please-welcome-valued-associate-1301-emerson?cb=1'
                themeState={themeState}
              >
                Please welcome Valued Associate #1301 - Emerson
              </WidgetA>
            </WidgetContent>
          </WidgetLi>
          <WidgetLi className='widget--item' themeState={themeState}>
            <WidgetIcon>
              <FontAwesomeIcon icon={faCommentAlt} color='#45a2d9' />
            </WidgetIcon>
            <WidgetContent>
              <WidgetA
                href='https://meta.stackexchange.com/questions/381614/announcing-the-stack-overflow-student-ambassador-program?cb=1'
                themeState={themeState}
              >
                Announcing the Stack Overflow Student Ambassador Program
              </WidgetA>
            </WidgetContent>
          </WidgetLi>
          <WidgetLi className='widget--item' themeState={themeState}>
            <WidgetIcon>
              <FontAwesomeIcon icon={faStackOverflow} fontSize='1.7rem' />
            </WidgetIcon>
            <WidgetContent>
              <WidgetA
                href='https://meta.stackoverflow.com/questions/420056/collectives-update-wso2-launches-and-google-go-sunsets?cb=1'
                themeState={themeState}
              >
                Collectives Update: WSO2 launches, and Google Go sunsets
              </WidgetA>
            </WidgetContent>
          </WidgetLi>
          <WidgetLi className='widget--item'>
            <WidgetIcon>
              <FontAwesomeIcon icon={faStackOverflow} fontSize='1.7rem' />
            </WidgetIcon>
            <WidgetContent>
              <WidgetA
                href='https://meta.stackoverflow.com/questions/419746/staging-ground-workflow-question-lifecycle?cb=1'
                themeState={themeState}
              >
                Staging Ground Workflow: Question Lifecycle
              </WidgetA>
            </WidgetContent>
          </WidgetLi>
          <WidgetLi className='widget--item' themeState={themeState}>
            <WidgetIcon>
              <FontAwesomeIcon icon={faStackOverflow} fontSize='1.7rem' />
            </WidgetIcon>
            <WidgetContent>
              <WidgetA
                href='https://meta.stackoverflow.com/questions/266719/the-option-tag-is-being-burninated?cb=1'
                themeState={themeState}
              >
                The [option] tag is being burninated
              </WidgetA>
            </WidgetContent>
          </WidgetLi>
          <WidgetLi className='widget--header' themeState={themeState}>
            Hot Meta Posts
          </WidgetLi>
          <WidgetLi className='widget--item' themeState={themeState}>
            <WidgetIcon>15</WidgetIcon>
            <WidgetContent>
              <WidgetA
                href='https://meta.stackoverflow.com/questions/420137/consolidating-python-version-specific-tags?cb=1'
                themeState={themeState}
              >
                Consolidating Python version-specific tags
              </WidgetA>
            </WidgetContent>
          </WidgetLi>
        </WidgetUl>
      </WidgetContainer>
    </WidgetLayout>
  );
};

const WidgetLayout = styled.div`
  width: 30rem;
  margin-top: 1.3rem;
  margin-left: 2.4rem;
`;

const WidgetContainer = styled.div`
  margin-bottom: 1.6rem;
  border: ${(props) =>
    props.themeState === 'light' ? '1px solid #f1e5bc' : '1px solid #675c37'};
  border-radius: 0.3rem;
  background-color: ${(props) =>
    props.themeState === 'light' ? '#fdf7e2' : '#484336'};
  font-size: 1.3rem;
  box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);
`;

const WidgetUl = styled.ul`
  display: block;
  list-style: none;
`;

const WidgetLi = styled.li`
  display: flex;

  &.widget--header {
    border-top: ${(props) =>
      props.themeState === 'light' ? '1px solid #f1e5bc' : '1px solid #675c37'};
    border-bottom: ${(props) =>
      props.themeState === 'light' ? '1px solid #f1e5bc' : '1px solid #675c37'};
    background-color: ${(props) =>
      props.themeState === 'light' ? '#fbf3d5' : '#524c39'};
    color: ${(props) => (props.themeState === 'light' ? '#515960' : '#eaeaea')};
    padding: 1.2rem 1.6rem;
    font-size: 1.25rem;
    font-weight: bold;
  }

  &.widget--header:first-child {
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    border-top: 0;
  }

  &.widget--item {
    padding: 0 1.6rem;
    margin: 1.2rem 0;
  }
`;

const WidgetIcon = styled.div`
  flex-shrink: 0;
  flex-basis: 8.333%;
  font-size: 1.4rem;
  color: ${(props) => (props.themeState === 'light' ? '#6a737c' : '#b1b0ae')};
`;

const WidgetContent = styled.div`
  min-width: 0;
  word-wrap: break-word;
`;

const WidgetA = styled.a`
  text-decoration: none;
  color: ${(props) => (props.themeState === 'light' ? '#3b4045' : '#cdd1d5')};
  font-size: 1.4rem;
`;

export default SideBarWidget;
