import styled from "styled-components";

const getColor = (value: number) => {
  switch (value) {
    case 1:
      return "#ffffff";
    case 5:
      return "#933636";
    case 10:
      return "#5473a1";
    case 25:
      return "#396345";
    case 100:
      return "#111";
    default:
      return "black";
  }
};

interface Props {
  value: number;
}

const Chip = ({ value }: Props) => {
  return <Wrapper color={getColor(value)}>{value}</Wrapper>;
};

const Wrapper = styled.div<{ color: string }>`
  background-color: ${(p) => p.color};
  border: 2px dotted white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  margin: 2px 2px 2px -18px;
  font-size: 7px;
  cursor: pointer;
  transition: transform 700ms ease;
  :hover {
    z-index: 9;
    transform: scale(1.2) translate(1px, -2px);
  }
`;

export default Chip;
