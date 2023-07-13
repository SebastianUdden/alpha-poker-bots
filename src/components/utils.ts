import { CardProps } from "./molecules/SmallCard";

export const DECK: CardProps[] = [
  { symbol: "2", value: 2, suit: "heart" },
  { symbol: "3", value: 3, suit: "heart" },
  { symbol: "4", value: 4, suit: "heart" },
  { symbol: "5", value: 5, suit: "heart" },
  { symbol: "6", value: 6, suit: "heart" },
  { symbol: "7", value: 7, suit: "heart" },
  { symbol: "8", value: 8, suit: "heart" },
  { symbol: "9", value: 9, suit: "heart" },
  { symbol: "10", value: 10, suit: "heart" },
  { symbol: "Kn", value: 11, suit: "heart" },
  { symbol: "Q", value: 12, suit: "heart" },
  { symbol: "K", value: 13, suit: "heart" },
  { symbol: "A", value: 14, suit: "heart" },
  { symbol: "2", value: 2, suit: "spade" },
  { symbol: "3", value: 3, suit: "spade" },
  { symbol: "4", value: 4, suit: "spade" },
  { symbol: "5", value: 5, suit: "spade" },
  { symbol: "6", value: 6, suit: "spade" },
  { symbol: "7", value: 7, suit: "spade" },
  { symbol: "8", value: 8, suit: "spade" },
  { symbol: "9", value: 9, suit: "spade" },
  { symbol: "10", value: 10, suit: "spade" },
  { symbol: "Kn", value: 11, suit: "spade" },
  { symbol: "Q", value: 12, suit: "spade" },
  { symbol: "K", value: 13, suit: "spade" },
  { symbol: "A", value: 14, suit: "spade" },
  { symbol: "2", value: 2, suit: "diamond" },
  { symbol: "3", value: 3, suit: "diamond" },
  { symbol: "4", value: 4, suit: "diamond" },
  { symbol: "5", value: 5, suit: "diamond" },
  { symbol: "6", value: 6, suit: "diamond" },
  { symbol: "7", value: 7, suit: "diamond" },
  { symbol: "8", value: 8, suit: "diamond" },
  { symbol: "9", value: 9, suit: "diamond" },
  { symbol: "10", value: 10, suit: "diamond" },
  { symbol: "Kn", value: 11, suit: "diamond" },
  { symbol: "Q", value: 12, suit: "diamond" },
  { symbol: "K", value: 13, suit: "diamond" },
  { symbol: "A", value: 14, suit: "diamond" },
  { symbol: "2", value: 2, suit: "club" },
  { symbol: "3", value: 3, suit: "club" },
  { symbol: "4", value: 4, suit: "club" },
  { symbol: "5", value: 5, suit: "club" },
  { symbol: "6", value: 6, suit: "club" },
  { symbol: "7", value: 7, suit: "club" },
  { symbol: "8", value: 8, suit: "club" },
  { symbol: "9", value: 9, suit: "club" },
  { symbol: "10", value: 10, suit: "club" },
  { symbol: "Kn", value: 11, suit: "club" },
  { symbol: "Q", value: 12, suit: "club" },
  { symbol: "K", value: 13, suit: "club" },
  { symbol: "A", value: 14, suit: "club" },
];

export const shuffle = (a: CardProps[]) => {
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
};

const checkFlush = (cards: CardProps[]) => {
  const suit = cards[0].suit;
  let isValid = false;
  if (cards.every((c) => c.suit === suit)) {
    isValid = true;
  }
  return { label: "Flush", isValid, cards: isValid ? cards : [] };
};

const checkStraight = (cards: CardProps[]) => {
  let isValid = false;
  for (let i = 1; i < cards.length; i++) {
    if (cards[i].value === 14 && cards[0].value === 2) {
      isValid = true;
    } else if (cards[i].value !== cards[i - 1].value + 1) {
      isValid = false;
    }
  }
  return { label: "Straight", isValid, cards: isValid ? cards : [] };
};

const checkStraightFlush = (cards: CardProps[]) => {
  let isValid = false;
  if (checkStraight(cards).isValid && checkFlush(cards).isValid) {
    isValid = true;
  }
  return { label: "Straight flush", isValid, cards: isValid ? cards : [] };
};

const checkRoyalStraightFlush = (cards: CardProps[]) => {
  let isValid = false;
  if (
    checkStraight(cards).isValid &&
    checkFlush(cards).isValid &&
    cards[0].value === 10
  ) {
    isValid = true;
  }
  return {
    label: "Royal straight flush",
    isValid,
    cards: isValid ? cards : [],
  };
};

const checkFourOfAKind = (cards: CardProps[]) => {
  let isValid = false;
  const fourOfAKindValue = cards[2].value;
  if (
    cards.slice(0, 4).every((c) => c.value === fourOfAKindValue) ||
    cards.slice(1).every((c) => c.value === fourOfAKindValue)
  ) {
    isValid = true;
  }
  return {
    label: "Four of a kind",
    isValid,
    cards: isValid ? cards.filter((c) => c.value === fourOfAKindValue) : [],
  };
};

const checkThreeOfAKind = (cards: CardProps[]) => {
  let isValid = false;
  const threeOfAKindValue = cards[2].value;
  if (
    cards.slice(0, 3).every((c) => c.value === threeOfAKindValue) ||
    cards.slice(1, 4).every((c) => c.value === threeOfAKindValue) ||
    cards.slice(2).every((c) => c.value === threeOfAKindValue)
  ) {
    isValid = true;
  }
  return {
    label: "Three of a kind",
    isValid,
    cards: isValid ? cards.filter((c) => c.value === threeOfAKindValue) : [],
  };
};

const checkTwoPairs = (cards: CardProps[]) => {
  let isValid = false;
  const pair = checkPair(cards);
  if (!pair.isValid) {
    return {
      isValid: false,
      cards: [],
    };
  }
  const filteredCards = cards.filter((c) => c.value !== pair.cards[0].value);
  const secondPair = checkPair(filteredCards);
  if (secondPair.isValid) {
    isValid = true;
  }
  return {
    label: "Two pairs",
    isValid,
    cards: isValid ? [...pair.cards, ...secondPair.cards] : [],
  };
};

const checkPair = (cards: CardProps[]) => {
  let isValid = false;
  const index = cards.findIndex((c, i) => c.value === cards[i + 1]?.value);
  if (index !== -1) {
    isValid = true;
  }
  return {
    label: "Pair",
    isValid,
    cards: isValid ? cards.slice(index, index + 2) : [],
  };
};

const checkFullHouse = (cards: CardProps[]) => {
  let isValid = false;

  const threeOfAKind = checkThreeOfAKind(cards);
  if (
    threeOfAKind.isValid &&
    checkPair(cards.filter((c) => c.value !== threeOfAKind.cards[0].value))
      .isValid
  ) {
    isValid = true;
  }
  return {
    label: "Full house",
    isValid,
    cards: isValid ? cards : [],
  };
};

const getBest5CardHand = (cards: CardProps[]) => {
  const sorted = cards.sort((a, b) => a.value - b.value);
  if (cards && cards.length) {
    const isRoyalStraightFlush = checkRoyalStraightFlush(weirdExample);
    const isStraightFlush = checkStraightFlush(sorted);
    const isFourOfAKind = checkFourOfAKind(sorted);
    const isFullHouse = checkFullHouse(sorted);
    const isFlush = checkFlush(sorted);
    const isStraight = checkStraight(sorted);
    const isThreeOfAKind = checkThreeOfAKind(sorted);
    const isTwoPairs = checkTwoPairs(sorted);
    const isPair = checkPair(sorted);
    if (isRoyalStraightFlush.isValid) {
      return isRoyalStraightFlush;
    } else if (isStraightFlush.isValid) {
      return isRoyalStraightFlush;
    } else if (isFourOfAKind.isValid) {
      return isFourOfAKind;
    } else if (isFullHouse.isValid) {
      return isFullHouse;
    } else if (isFlush.isValid) {
      return isFlush;
    } else if (isStraight.isValid) {
      return isStraight;
    } else if (isThreeOfAKind.isValid) {
      return isThreeOfAKind;
    } else if (isTwoPairs.isValid) {
      return isTwoPairs;
    } else if (isPair.isValid) {
      return isPair;
    } else {
      return {
        label: "High card",
        isValid: true,
        cards: sorted,
      };
    }
  }
};

export const getBestHand = (
  communityCards: CardProps[],
  playerCards?: CardProps[]
) => {
  const allCards = [...communityCards, ...(playerCards || [])];
  console.log(allCards);
  const c1 = allCards.slice(0, 5);
  const c2 = [...allCards.slice(0, 4), allCards[5]];
  const c3 = [...allCards.slice(0, 4), allCards[6]];
  const c4 = [...allCards.slice(0, 3), ...allCards.slice(4, 6)];
  const c5 = [...allCards.slice(0, 3), ...allCards.slice(5)];
  console.log(c1);
  console.log(c2);
  console.log(c3);
  console.log(c4);
  console.log(c5);
  // const c3 = [allCards[0], ...allCards.slice(3, 7)];
  // const c4 = allCards.slice(1, 6);
  // const c5 = allCards.slice(2, 7);

  // const c3 = [allCards[0], ...allCards.slice(3, 7)];
  // const hand1 = getBest5CardHand(allCards.slice(0, 5));
  // const hand2 = getBest5CardHand(allCards.slice(1, 6));
  // const hand3 = getBest5CardHand(allCards.slice(2, 7));
  // const hand4 = getBest5CardHand(allCards.slice(2, 7));
};

//////////////////
// EXAMPLE HANDS
////////////////

const weirdExample: CardProps[] = [
  { symbol: "10", value: 10, suit: "spade" },
  { symbol: "10", value: 10, suit: "diamond" },
  { symbol: "10", value: 10, suit: "heart" },
  { symbol: "Kn", value: 11, suit: "heart" },
  { symbol: "K", value: 13, suit: "club" },
];

const pair1: CardProps[] = [
  { symbol: "A", value: 14, suit: "heart" },
  { symbol: "2", value: 2, suit: "heart" },
  { symbol: "2", value: 2, suit: "club" },
  { symbol: "3", value: 3, suit: "diamond" },
  { symbol: "K", value: 13, suit: "spade" },
];

const pair2: CardProps[] = [
  { symbol: "2", value: 2, suit: "heart" },
  { symbol: "2", value: 2, suit: "club" },
  { symbol: "A", value: 14, suit: "heart" },
  { symbol: "3", value: 3, suit: "diamond" },
  { symbol: "K", value: 13, suit: "spade" },
];

const pair3: CardProps[] = [
  { symbol: "A", value: 14, suit: "heart" },
  { symbol: "3", value: 3, suit: "diamond" },
  { symbol: "2", value: 2, suit: "heart" },
  { symbol: "2", value: 2, suit: "spade" },
  { symbol: "K", value: 13, suit: "spade" },
];

const pair4: CardProps[] = [
  { symbol: "A", value: 14, suit: "heart" },
  { symbol: "3", value: 3, suit: "diamond" },
  { symbol: "K", value: 13, suit: "spade" },
  { symbol: "2", value: 2, suit: "heart" },
  { symbol: "2", value: 2, suit: "club" },
];

const twoPairs: CardProps[] = [
  { symbol: "A", value: 14, suit: "heart" },
  { symbol: "A", value: 14, suit: "diamond" },
  { symbol: "K", value: 13, suit: "spade" },
  { symbol: "2", value: 2, suit: "heart" },
  { symbol: "2", value: 2, suit: "club" },
];

const threeOfAKind1: CardProps[] = [
  { symbol: "A", value: 14, suit: "heart" },
  { symbol: "2", value: 2, suit: "heart" },
  { symbol: "2", value: 2, suit: "club" },
  { symbol: "2", value: 2, suit: "diamond" },
  { symbol: "K", value: 13, suit: "spade" },
];

const threeOfAKind2: CardProps[] = [
  { symbol: "2", value: 2, suit: "heart" },
  { symbol: "2", value: 2, suit: "heart" },
  { symbol: "2", value: 2, suit: "club" },
  { symbol: "Q", value: 12, suit: "diamond" },
  { symbol: "K", value: 13, suit: "spade" },
];

const threeOfAKind3: CardProps[] = [
  { symbol: "A", value: 14, suit: "heart" },
  { symbol: "K", value: 13, suit: "spade" },
  { symbol: "2", value: 2, suit: "club" },
  { symbol: "2", value: 2, suit: "heart" },
  { symbol: "2", value: 2, suit: "diamond" },
];

const fullHouse1: CardProps[] = [
  { symbol: "A", value: 14, suit: "heart" },
  { symbol: "A", value: 14, suit: "spade" },
  { symbol: "2", value: 2, suit: "club" },
  { symbol: "2", value: 2, suit: "heart" },
  { symbol: "2", value: 2, suit: "diamond" },
];

const fourOfAKind1: CardProps[] = [
  { symbol: "2", value: 2, suit: "heart" },
  { symbol: "2", value: 2, suit: "club" },
  { symbol: "2", value: 2, suit: "diamond" },
  { symbol: "2", value: 2, suit: "spade" },
  { symbol: "A", value: 14, suit: "heart" },
];
const fourOfAKind2: CardProps[] = [
  { symbol: "A", value: 14, suit: "heart" },
  { symbol: "2", value: 2, suit: "heart" },
  { symbol: "2", value: 2, suit: "club" },
  { symbol: "2", value: 2, suit: "diamond" },
  { symbol: "2", value: 2, suit: "spade" },
];

const straightFlush1: CardProps[] = [
  { symbol: "7", value: 7, suit: "diamond" },
  { symbol: "8", value: 8, suit: "diamond" },
  { symbol: "9", value: 9, suit: "diamond" },
  { symbol: "10", value: 10, suit: "diamond" },
  { symbol: "Kn", value: 11, suit: "diamond" },
];
const straightFlush2: CardProps[] = [
  { symbol: "2", value: 2, suit: "heart" },
  { symbol: "3", value: 3, suit: "heart" },
  { symbol: "4", value: 4, suit: "heart" },
  { symbol: "5", value: 5, suit: "heart" },
  { symbol: "A", value: 14, suit: "heart" },
];
const royalStraightFlush1: CardProps[] = [
  { symbol: "10", value: 10, suit: "club" },
  { symbol: "Kn", value: 11, suit: "club" },
  { symbol: "Q", value: 12, suit: "club" },
  { symbol: "K", value: 13, suit: "club" },
  { symbol: "A", value: 14, suit: "club" },
];
