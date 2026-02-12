import type { BallType } from "@/types/ball";
import baseballImg from "@/assets/balls/baseball.png";
import basketballImg from "@/assets/balls/basketball.png";
import soccerImg from "@/assets/balls/soccer.png";
import tennisImg from "@/assets/balls/tennis.png";
import pingpongImg from "@/assets/balls/pingpong.png";
import badmintonImg from "@/assets/balls/badminton.png";

export const BALL_ICON_SRC: Record<BallType, string> = {
  BASEBALL: baseballImg,
  BASKETBALL: basketballImg,
  SOCCER: soccerImg,
  TENNIS: tennisImg,
  PINGPONG: pingpongImg,
  BADMINTON: badmintonImg
};
