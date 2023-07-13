import styled from "styled-components";
import Card, { CardProps } from "../molecules/SmallCard";

interface Props {
  spread?: boolean;
  cards?: CardProps[];
}

const PokerCards = ({ spread, cards }: Props) => {
  const length = cards?.length || 0;
  return (
    <Wrapper spread={spread}>
      {cards &&
        cards.map((card, i) => (
          <Card
            facedown={card.facedown}
            symbol={card.symbol}
            suit={card.suit}
            value={card.value}
            rotation={90 * (i / length) - 25}
            translate={-360 * (i / length) + 80}
          />
        ))}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ spread?: boolean }>`
  display: flex;
  ${(p) =>
    p.spread &&
    `
    gap: 20px;
  `}
`;
export default PokerCards;
