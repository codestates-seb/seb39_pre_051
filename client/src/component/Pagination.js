import styled from 'styled-components';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';

const Pagination = ({ total, size, page, setPage }) => {
  const themeState = useSelector((state) => state.themeSlice).theme;

  const numPages = Math.ceil(total / size);

  const handleOnClick = (e) => {
    setPage(Number(e.target.innerText));
    console.log(e.target.innerText);
  };
  console.log('page: ' + page);

  useEffect(() => {
    axios
      .get(`/questions?size=${size}&page=${page}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, [size, page]);

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
        {numPages > 5 && page < numPages - 3 && page > 4 ? (
          <>
            <Button
              key={1}
              onClick={() => setPage(1)}
              aria-current={page === numPages ? 'page' : null}
              themeState={themeState}
            >
              1
            </Button>
            <div>...</div>
            {Array(5)
              .fill()
              .map((_, i) => (
                <Button
                  key={page - 2 + i}
                  onClick={handleOnClick}
                  aria-current={page - 2 + i === page ? 'page' : null}
                  themeState={themeState}
                >
                  {page - 2 + i}
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
        ) : numPages > 5 && page >= numPages - 3 && page > 5 ? (
          <>
            <Button
              key={1}
              onClick={() => setPage(1)}
              aria-current={page === 1 ? 'page' : null}
              themeState={themeState}
            >
              1
            </Button>
            <div>...</div>
            {Array(5)
              .fill()
              .map((_, i) => (
                <Button
                  key={numPages - 4 + i}
                  onClick={handleOnClick}
                  aria-current={numPages - 4 + i === page ? 'page' : null}
                  themeState={themeState}
                >
                  {numPages - 4 + i}
                </Button>
              ))}
          </>
        ) : (
          <>
            {Array(5)
              .fill()
              .map((_, i) => (
                <Button
                  key={i + 1}
                  onClick={handleOnClick}
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
