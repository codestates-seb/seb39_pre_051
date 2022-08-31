import styled from 'styled-components';

const Pagination = ({ total, limit, page, setPage }) => {
  const numPages = Math.ceil(total / limit);

  return (
    <>
      <Nav>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev
        </Button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? 'page' : null}
            >
              {i + 1}
            </Button>
          ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
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
  border: 1px solid #d6d9dc;
  border-radius: 0.3rem;
  padding: 0.3rem 0.8rem;
  margin: 0 0.2rem;
  background: #ffffff;
  color: #0c0d0e;
  font-size: 1.3rem;
  line-height: 1.9rem;

  &:hover {
    background: #d6d9dc;
    cursor: pointer;
  }

  &[disabled] {
    display: none;
  }
`;

export default Pagination;
