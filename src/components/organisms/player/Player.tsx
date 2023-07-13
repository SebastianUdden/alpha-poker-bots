import styled from "styled-components";
import { CardProps } from "../../molecules/SmallCard";
import Chips from "../Chips";
import PokerCards from "../PokerCards";

export interface PlayerProps {
  name: string;
  cash: number;
  bet?: number;
  cards?: CardProps[];
  color?: string;
  position?: string;
  isYou?: boolean;
}

const Player = ({ name, bet, cash, cards, color, position }: PlayerProps) => {
  const remainingCash = cash - (bet || 0);
  return (
    <Wrapper position={position}>
      <Stack>
        <Value>${bet}</Value>
        <Chips cash={bet} />
      </Stack>
      <Chips cash={remainingCash} />
      <PokerCards cards={cards} />
      <Row color={color}>
        <Cash>${remainingCash}</Cash>
        <Name>{name}</Name>
        <SmallName>{name.split(" ").map((n) => n[0])}</SmallName>
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ position?: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  ${(p) =>
    p.position === "top" &&
    `
    flex-direction: column-reverse;
  `}
  font-size: 11px;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(p) => p.color || "#511212"};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 24px;
  margin: 5px 0;
  padding: 5px 15px 5px 5px;
  margin-left: -9px;
`;
const Cash = styled.p<{ color?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px 0 0;
  background-color: #00000055;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: #fff;
  font-weight: 700;
`;
const Name = styled.p<{ color?: string }>`
  color: #fff;
  font-weight: 700;
  margin: 0;
  display: none;
  @media (min-width: 600px) {
    display: block;
  }
`;
const SmallName = styled.p<{ color?: string }>`
  color: #fff;
  font-weight: 700;
  margin: 0;
  display: block;
  @media (min-width: 600px) {
    display: none;
  }
`;
const Stack = styled.div`
  display: flex;
`;
const Value = styled.div`
  background-color: #00000033;
  padding: 0 5px;
  margin-right: 5px;
  border-radius: 6px;
`;

export default Player;
