import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const BotAvatar = () => {
  const user = useUser();
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src={"/logo.png"} />
    </Avatar>
  );
};

export default BotAvatar;
