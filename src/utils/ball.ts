import { BALL_LABEL } from "@/types/ball";
import type { BallType } from "@/types/ball";

export function getBallLabel(type: BallType) {
  return BALL_LABEL[type];
}
