import styled from 'styled-components';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';

const Pagination = ({
  className,
  total,
  size,
  page,
  setPage,
  setSize,
  setTotal,
}) => {
  const themeState = useSelector((state) => state.themeSlice).theme;

  const numPages = Math.ceil(total / size);

  //Pagination 버튼 클릭 이벤트
  const handleOnClick = (e) => {
    if (className === 'pager') {
      setPage(Number(e.target.innerText));
    } else {
      setPage(1);
      setSize(Number(e.target.innerText));
    }
  };

  console.log(className);

  useEffect(() => {
    axios
      .get(`/questions?size=${size}&page=${page}`)
      .then((res) => {
        setTotal(Number(res.data.pageInfo.totalElements));
        setSize(size);
        setPage(page);

        console.log(`size: ${size}, page: ${page}`);
      })
      .catch((err) => console.log(err));
  }, [size, page]);

  return (
    <>
      {className === 'pager' ? (
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
          ) : numPages <= 5 ? (
            Array(numPages)
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
              ))
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
      ) : (
        <Nav>
          {[15, 30, 50].map((el) => (
            <Button
              key={el}
              onClick={handleOnClick}
              aria-current={el === size ? 'size' : null}
              themeState={themeState}
            >
              {el}
            </Button>
          ))}
          <div>per page</div>
        </Nav>
      )}
    </>
  );
};

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  margin: 1.6rem;

  div {
    font-size: 1.4rem;
    margin-left: 0.5rem;
  }
`;

const Button = styled.a`
  border: ${(props) =>
    props.themeState === 'light' ? '1px solid #d6d9dc' : '1px solid #4a4e51'};
  border-radius: 0.3rem;
  padding: 0.3rem 0.8rem;
  margin: 0 0.2rem;
  background-color: transparent;
  color: ${(props) => (props.themeState === 'light' ? '#3f4042' : '#b4b5b7')};
  font-size: 1.3rem;
  line-height: 1.9rem;
  text-decoration: none;

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
