import styled from "styled-components";
import Chip from "../atoms/Chip";

const getChips = (cash: number) => {
  const hundreds = Math.floor(cash / 100);
  let remainder = cash % 100;
  const twentyFives = Math.floor(remainder / 25);
  remainder = remainder % 25;
  const tens = Math.floor(remainder / 10);
  remainder = remainder % 10;
  const fives = Math.floor(remainder / 5);
  remainder = remainder % 5;
  const ones = Math.floor(remainder / 1);
  remainder = remainder % 1;

  return {
    hundreds: Array(hundreds).fill(100),
    twentyFives: Array(twentyFives).fill(25),
    tens: Array(tens).fill(10),
    fives: Array(fives).fill(5),
    ones: Array(ones).fill(1),
  };
};

interface Props {
  cash?: number;
}

const Chips = ({ cash = 0 }: Props) => {
  const chips = getChips(cash);
  const entries = Object.entries(chips);

  return (
    <Wrapper>
      {entries.map(([key, value]) => value.map((c) => <Chip value={c} />))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 15px;
`;

export default Chips;
