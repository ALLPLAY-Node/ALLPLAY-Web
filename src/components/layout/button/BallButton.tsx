import { Button } from "@/components/ui/button";
import { BALL_LABEL, SPORT_ID_MAP, type BallType } from "@/types/ball";
import { BALL_ICON_SRC } from "./ballIcon";

interface BallButtonProps {
  ball: BallType;
  func: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const BallButton = ({ ball, func }: BallButtonProps) => {
  return (
    <Button
      variant="customball"
      size="ball"
      onClick={() => func(SPORT_ID_MAP[ball])}
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <img
          src={BALL_ICON_SRC[ball]}
          alt={BALL_LABEL[ball]}
          className="w-[70%] max-w-[100px] aspect-square object-contain"
        />
        <span>{BALL_LABEL[ball]}</span>
      </div>
    </Button>
  );
};

export default BallButton;
