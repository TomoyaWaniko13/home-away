import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LuTent } from "react-icons/lu";

// 55. Logo and NavSearch Components

const Logo = () => {
  return (
    <Button size={"icon"} asChild={true}>
      <Link href={"/"}>
        <LuTent className={"w-6 h-6"} />
      </Link>
    </Button>
  );
};

export default Logo;
