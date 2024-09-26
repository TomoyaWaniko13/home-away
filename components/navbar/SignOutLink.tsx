"use client";

import { useToast } from "@/hooks/use-toast";
import { SignOutButton } from "@clerk/nextjs";

// 60. SignOutLink Component

const SignOutLink = () => {
  const { toast } = useToast();

  const handleLogout = () => {
    toast({ description: "" });
  };

  return (
    <SignOutButton redirectUrl={"/"}>
      <button className={"w-full text-left"} onClick={handleLogout}>
        Logout
      </button>
    </SignOutButton>
  );
};

export default SignOutLink;
