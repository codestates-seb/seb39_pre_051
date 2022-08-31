import styled from 'styled-components';

const SideBarWidget = () => {
  return (
    <WidgetLayout>
      <WidgetContainer>
        <WidgetUl>
          <WidgetLi className='widget--header'>The Overflow Blog</WidgetLi>
          <WidgetLi className='widget--item'>
            <a
              href='https://stackoverflow.blog/2022/08/29/stack-overflow-student-ambassador-program-how-to-apply/?cb=1'
              style={{ textDecoration: 'none' }}
            >
              Stack Overflow is launching a Student Ambassador program. Here’s
              how to apply.
            </a>
          </WidgetLi>
          <WidgetLi className='widget--item'></WidgetLi>
        </WidgetUl>
      </WidgetContainer>
    </WidgetLayout>
  );
};

const WidgetLayout = styled.div`
  width: 30rem;
  margin-left: 2.4rem;
`;

const WidgetContainer = styled.div`
  margin-bottom: 1.6rem;
  border: 1px solid #f1e5bc;
  border-radius: 0.3rem;
  background-color: #fdf7e2;
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
    border: 1px solid #f1e5bc;
    background-color: #fbf3d5;
    color: #525960;
    padding: 1.2rem 1.6rem;
    font-size: 1.2rem;
    font-weight: bold;
  }

  &.widget--header:first-child {
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
  }

  &.widget--item {
  }
`;

export default SideBarWidget;
