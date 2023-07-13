import styled from "styled-components";
import "./App.css";
import PlayArea from "./components/organisms/PlayArea";

const players = [
  {
    name: "George Clooney",
    color: "#104769",
    cash: 100,
  },
  {
    name: "George Costanza",
    color: "#884400",
    cash: 180,
  },
  {
    name: "George Pig",
    color: "#f74eee",
    cash: 800,
  },
  {
    name: "George of the Jungle",
    color: "#17624d",
    cash: 10,
  },
  {
    name: "King George VI",
    color: "#6458af",
    cash: 870,
    isYou: true,
  },
  {
    name: "George Michael",
    color: "#184438",
    cash: 910,
  },
  {
    name: "George R. R. Martin",
    color: "#6c8641",
    cash: 70,
  },
];
function App() {
  return (
    <>
      <H1>
        <span>V</span>LPH<Span>V</Span>
        <Strong>BOTS</Strong>
      </H1>
      <Center>
        <PlayArea players={players} />
      </Center>
    </>
  );
}

const H1 = styled.h1`
  background-color: #000;
  margin: 0;
  padding: 10px;
  width: 100%;
  color: #c86b0e;
  font-size: 16px;
  letter-spacing: 3px;
  span {
    margin: 0 3px 0 0;
    display: inline-block;
    transform: rotate(180deg) translate(0, 2px);
  }
`;
const Span = styled.span`
  display: inline-block;
  transform: rotate(180deg) translate(2px, 2px) !important;
`;
const Strong = styled.strong`
  font-weight: 600;
  color: #888;
`;
const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

export default App;
