import { Input } from "@/components/ui/input";

// 55. Logo and NavSearch Components

const NavSearch = () => {
  return (
    <Input
      type={"text"}
      placeholder={"find a property..."}
      className={"max-w-xs dark:bg-muted"}
    />
  );
};

export default NavSearch;
