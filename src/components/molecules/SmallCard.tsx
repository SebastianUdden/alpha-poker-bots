import { useEffect, useState } from "react";
import styled from "styled-components";
import { Suit, SuitType } from "../atoms/Suit";

export interface CardProps {
  suit: SuitType;
  symbol: string;
  value: number;
  facedown?: boolean;
  rotation?: number;
  translate?: number;
}

const SmallCard = ({
  facedown,
  rotation,
  translate,
  symbol,
  suit,
}: CardProps) => {
  const [isFacedown, setIsFacedown] = useState(true);

  useEffect(() => {
    setIsFacedown(!!facedown);
  }, [facedown]);

  return (
    <Wrapper>
      <Inner
        facedown={isFacedown}
        rotation={`${rotation}deg`}
        translateX={`${translate}px`}
      >
        <Back>
          <BackInner>
            <Alphadev>V</Alphadev>
          </BackInner>
        </Back>
        <Front>
          <Suit type={suit} size="80%" />
          <Symbol>{symbol}</Symbol>
        </Front>
      </Inner>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 70px;
  width: 40px;
  background-color: transparent;
  perspective: 1000px;
  @media (min-width: 600px) {
    height: 100px;
    width: 60px;
  }
`;
const Inner = styled.div<{
  facedown?: boolean;
  flipping?: boolean;
  rotation: string;
  translateX: string;
}>`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  ${(p) =>
    p.facedown &&
    `
      transform: rotateY(180deg);
    `}
`;
const Side = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 6px;
  cursor: pointer;
`;
const Front = styled(Side)`
  background-color: #bbb;
  color: black;
  border: 1px solid white;
  background-color: #fff;
  color: #111;
  p {
    font-weight: 700;
  }
  padding: 5px;
  @media (min-width: 600px) {
    padding: 10px;
  }
`;
const Back = styled(Side)`
  transform: rotateY(180deg);
  border: 1px solid #212121;
  background-color: #000000;
  padding: 10px;
`;
const BackInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 1px dotted #1b0f02;
  background-color: #050505;
  padding: 8px;
  color: #c86b0e;
  height: 70%;
  width: 60%;
  transform-origin: center;
  transform: rotate(180deg);
`;
const Symbol = styled.p`
  font-size: 150%;
  margin: 20% 0 0;
`;
const Alphadev = styled.p`
  font-size: 30px;
  @media (min-width: 600px) {
    font-size: 40px;
  }
`;

export default SmallCard;
