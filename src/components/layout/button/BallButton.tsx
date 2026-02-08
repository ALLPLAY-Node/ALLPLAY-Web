import { Button } from "@/components/ui/button";
import { BALL_LABEL, type BallType } from "@/types/ball";
import { BALL_ICON_SRC } from "./ballIcon";

interface BallButtonProps {
  ball: BallType;
}

const BallButton = ({ ball }: BallButtonProps) => {
  return (
    <Button variant="customball" size="ball">
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
