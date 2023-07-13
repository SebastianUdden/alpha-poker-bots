import styled from "styled-components";
import { Suit, SuitType } from "../atoms/Suit";

export interface CardProps {
  suit: SuitType;
  symbol: string;
  rotation?: number;
  translate?: number;
}

const LargeCard = ({ rotation, translate, symbol, suit }: CardProps) => {
  return (
    <Wrapper rotation={`${rotation}deg`} translateX={`${translate}px`}>
      <TopLeft>{symbol}</TopLeft>
      <TopRight>{symbol}</TopRight>
      <BottomRight>{symbol}</BottomRight>
      <BottomLeft>{symbol}</BottomLeft>
      <SuitPosition>
        <Suit type={suit} size={50} />
      </SuitPosition>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ rotation: string; translateX: string }>`
  position: relative;
  height: 200px;
  width: 130px;
  border: 1px solid white;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  color: #111;
  ${(p) =>
    p.rotation &&
    `
    transform-origin: center;
    transform: translateX(${p.translateX}) rotate(${p.rotation});
  
  `}

  transition: transform 600ms ease;
  cursor: pointer;

  :hover {
    ${(p) =>
      p.rotation &&
      `
      transform-origin: center;
      transform: translate(${p.translateX}, -20px) rotate(${p.rotation});
  `}
  }
  p {
    font-weight: 700;
  }
`;
const TopLeft = styled.p`
  position: absolute;
  left: 5%;
  top: 2%;
  margin: 0;
`;
const BottomRight = styled.p`
  position: absolute;
  right: 5%;
  bottom: 2%;
  margin: 0;
  transform: rotate(180deg);
`;
const TopRight = styled.p`
  position: absolute;
  right: 5%;
  top: 2%;
  margin: 0;
`;
const BottomLeft = styled.p`
  position: absolute;
  left: 5%;
  bottom: 2%;
  margin: 0;
  transform: rotate(180deg);
`;
const SuitPosition = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default LargeCard;
