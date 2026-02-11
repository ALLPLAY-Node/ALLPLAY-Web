export const BALL_LABEL = {
  BASKETBALL: "농구",
  BASEBALL: "야구",
  SOCCER: "축구",
  TENNIS: "테니스",
  PINGPONG: "탁구",
  BADMINTON: "배드민턴"
} as const;

export type BallType = keyof typeof BALL_LABEL;

export const SPORT_ID_MAP: Record<string, number> = {
  BASKETBALL: 1,
  BASEBALL: 2,
  SOCCER: 3,
  TENNIS: 4,
  PINGPONG: 5,
  BADMINTON: 6
};
