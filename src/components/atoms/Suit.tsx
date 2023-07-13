export type SuitType = "heart" | "spade" | "diamond" | "club";

interface SuitProps {
  type: SuitType;
  size: string | number;
}

export const Suit = ({ type, size, ...props }: SuitProps) => {
  switch (type) {
    case "heart":
      return (
        <svg
          version="1.1"
          width={size}
          height={size}
          viewBox="0 20 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 100 200
            S 50 150, 15 110
            S 50 10, 100 70
            C 150 10, 220 70, 185 110
            Z"
            stroke="red"
            fill="red"
          />
        </svg>
      );
    case "spade":
      return (
        <svg
          version="1.1"
          width={size}
          height={size}
          viewBox="0 0 200 180"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 100 0
            S 50 50, 15 90 S 50 190, 100 130
            L 80 180
            L 120 180
            L 100 130
            C 150 190, 220 130, 185 90
            Z"
            stroke="black"
            fill="black"
          />
        </svg>
      );
    case "diamond":
      return (
        <svg
          version="1.1"
          width={size}
          height={size}
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 100 0
            A 180 180 0 0 0 180 100
            A 180 180 0 0 0 100 200
            A 180 180 0 0 0 20 100
            A 180 180 0 0 0 100 0
            "
            stroke="red"
            fill="red"
          />
        </svg>
      );
    case "club":
      return (
        <svg
          version="1.1"
          width={size}
          height={size}
          viewBox="0 -5 200 180"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 100 130
            A 50 50 0 1 1 53 60
            A 50 50 0 1 1 147 60
            A 50 50 0 1 1 100 130
            L 80 180
            L 120 180
            Z"
            stroke="black"
            fill="black"
          />
        </svg>
      );
  }
};
