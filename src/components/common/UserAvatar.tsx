import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

interface UserAvatarProps {
  username?: string;
  image: string;
}

const UserAvatar = ({ image, username }: UserAvatarProps) => {
  return (
    <Avatar className="w-[60px] h-[60px] bg-white">
      <AvatarImage src={image} className="object-cover w-full h-full" />
      <AvatarFallback>{username?.slice(0, 2)}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
