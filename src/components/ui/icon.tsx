import { icons } from "lucide-react";
import { FC } from "react";

type TIconProps = {
  name: string;
  color: string;
  size: number;
};

const Icon: FC<TIconProps> = ({ name, color, size }) => {
  const LucideIcon = icons[name as keyof typeof icons];

  return <LucideIcon color={color} size={size} />;
};

export default Icon;
