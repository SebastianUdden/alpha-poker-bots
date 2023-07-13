import styled from "styled-components";

const Table = () => {
  return <Wrapper></Wrapper>;
};

const Wrapper = styled.div`
  background-color: #0e3214;
  border: 3px solid #2a1710;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  width: 90%;
  height: 90%;
  border-radius: 20vh;
  filter: drop-shadow(5px 5px 10px #111);
  z-index: -1;
`;

export default Table;
