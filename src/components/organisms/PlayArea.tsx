import { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "../atoms/Table";
import { CardProps } from "../molecules/SmallCard";
import Player, { PlayerProps } from "./player/Player";
import { DECK, getBestHand, shuffle } from "../utils";
import PokerCards from "./PokerCards";

const getCards = (index: number, isYou?: boolean, cards?: CardProps[]) =>
  cards
    ? cards.map((c) => ({
        ...c,
        facedown: index < 5 && !isYou,
      }))
    : [];

interface Props {
  players: PlayerProps[];
}
const PlayArea = ({ players }: Props) => {
  const [besthand, setBesthand] = useState("");
  const [shuffledCards, setShuffledCards] = useState<CardProps[]>([]);
  const [bets, setBets] = useState(players.map(() => 0));
  const [communityCards, setCommunityCards] = useState<CardProps[]>([]);
  const [playersWithCards, setPlayersWithCards] = useState<PlayerProps[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(-1);
  const handleBack = () => {
    if (currentCardIndex < 0) return;
    setCurrentCardIndex(currentCardIndex - 1);
  };
  const handleForward = () => {
    if (currentCardIndex === -1) {
      setCurrentCardIndex(2);
    }
    if (currentCardIndex > 4) {
      return;
    }
    setCurrentCardIndex(currentCardIndex + 1);
  };

  const triggerBets = () => {
    setBets(
      players.map((p, i) => (bets[i] + 20 <= p.cash ? bets[i] + 20 : bets[i]))
    );
  };

  const triggerShuffle = () => {
    setCurrentCardIndex(-1);
    setTimeout(() => {
      const newShuffle = shuffle(DECK);
      setShuffledCards(newShuffle);
      setBets(players.map(() => 0));
    }, 220);
  };

  useEffect(() => {
    const newCommunityCards = shuffledCards.slice(
      players.length * 2,
      players.length * 2 + 5
    );
    setCommunityCards(newCommunityCards);
    const playerCards = shuffledCards.slice(0, players.length * 2);
    const newPlayersWithCards = players.map((p, i) => ({
      ...p,
      cards: playerCards.slice(i * 2, (i + 1) * 2),
      bet: bets[i],
    }));
    setPlayersWithCards(newPlayersWithCards);
    const bh = getBestHand(
      newCommunityCards,
      newPlayersWithCards.find((p) => p.isYou)?.cards
    );
    setBesthand(bh);
  }, [shuffledCards, bets]);

  useEffect(() => {
    setShuffledCards(shuffle(DECK));
  }, []);

  return (
    <Wrapper>
      <Stack>
        <Stackable>
          <Centered>
            <Table />
          </Centered>
        </Stackable>
        <Stackable>
          <Column>
            <Row>
              {playersWithCards
                .slice(0, Math.round(playersWithCards.length / 2))
                .map((p) => (
                  <Player
                    {...p}
                    position="top"
                    cards={getCards(currentCardIndex, p.isYou, p.cards)}
                  />
                ))}
            </Row>
            <Row>
              <Column>
                <H2>SPOILER - {besthand?.label}</H2>
                <PokerCards
                  cards={communityCards.map((c, i) => ({
                    ...c,
                    facedown: i > currentCardIndex,
                  }))}
                  spread
                />
              </Column>
            </Row>
            <Row>
              {playersWithCards
                .slice(
                  Math.round(playersWithCards.length / 2),
                  playersWithCards.length
                )
                .map((p) => (
                  <Player
                    {...p}
                    cards={getCards(currentCardIndex, p.isYou, p.cards)}
                  />
                ))}
            </Row>
          </Column>
        </Stackable>
      </Stack>
      <br />
      <Row>
        <Button onClick={handleBack}>Back</Button>
        <Button onClick={handleForward}>Forward</Button>
        <Button onClick={triggerBets}>Bets</Button>
        <Button onClick={triggerShuffle}>Shuffle deck</Button>
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 90vw;
  height: 80vh;
  margin-bottom: 10px;
`;
const Flip = styled.div`
  transform: rotate(180deg);
`;
const Stackable = styled.div`
  height: 100%;
  grid-area: 1 / 1;
`;

const Stack = styled.div`
  height: 100%;
  display: grid;
  grid-area: 1 / 1 / 2 / 2;
`;
const Centered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0 20px;
`;
const Button = styled.button`
  margin: 10px;
`;
const H2 = styled.h2`
  opacity: 0.03;
  text-align: center;
`;
export default PlayArea;
