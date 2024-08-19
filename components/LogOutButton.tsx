"use client";

import React from "react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "@/actions/signOut";
import { useRouter } from "next/navigation";

const LogOutButton = () => {
  const router = useRouter();
  const handleSignOut = () => {
    signOut();
    router.refresh();
  };

  return (
    <Button variant="destructive" onClick={handleSignOut}>
      Sign out
      <LogOut className="ml-1 size-4" />
    </Button>
  );
};

export default LogOutButton;
