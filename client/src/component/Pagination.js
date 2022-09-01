import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Pagination = ({ total, limit, page, setPage }) => {
  const themeState = useSelector((state) => state.themeSlice).theme;

  const numPages = Math.ceil(total / limit);

  const handleOnClick = (e) => {
    setPage(page + 1);
  };

  return (
    <>
      <Nav>
        <Button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          themeState={themeState}
        >
          Prev
        </Button>
        {numPages > 5 ? (
          <>
            {Array(5)
              .fill()
              .map((_, i) => (
                <Button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  aria-current={page === i + 1 ? 'page' : null}
                  themeState={themeState}
                >
                  {i + 1}
                </Button>
              ))}
            <div>...</div>
            <Button
              key={numPages}
              onClick={() => setPage(numPages)}
              aria-current={page === numPages ? 'page' : null}
              themeState={themeState}
            >
              {numPages}
            </Button>
          </>
        ) : (
          Array(numPages)
            .fill()
            .map((_, i) => (
              <Button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                aria-current={page === i + 1 ? 'page' : null}
                themeState={themeState}
              >
                {i + 1}
              </Button>
            ))
        )}
        <Button
          onClick={() => setPage(page + 1)}
          disabled={page === numPages}
          themeState={themeState}
        >
          Next
        </Button>
      </Nav>
    </>
  );
};

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  margin: 1.6rem;
`;

const Button = styled.button`
  border: ${(props) =>
    props.themeState === 'light' ? '1px solid #d6d9dc' : '1px solid #4a4e51'};
  border-radius: 0.3rem;
  padding: 0.3rem 0.8rem;
  margin: 0 0.2rem;
  background-color: transparent;
  color: ${(props) => (props.themeState === 'light' ? '#3f4042' : '#b4b5b7')};
  font-size: 1.3rem;
  line-height: 1.9rem;

  &:hover {
    background-color: ${(props) =>
      props.themeState === 'light' ? '#d6d9dc' : '#4a4e51'};
    cursor: pointer;
  }

  &[aria-current] {
    color: #ffffff;
    background-color: var(--color-orange);
  }

  &[disabled] {
    display: none;
  }
`;

export default Pagination;
