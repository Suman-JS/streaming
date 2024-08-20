import React from "react";
import { ThemeToggle } from "./ToggleTheme";
import Image from "next/image";
import logo from "@/public/logo.svg";
import Link from "next/link";
import { Button } from "./ui/button";
import { auth } from "@/actions/auth";
import UserAvatar from "./UserAvatar";
import LogOutButton from "./LogOutButton";

const Nav = async () => {
  const { userName } = await auth();

  return (
    <nav className="bg-slate-400/70 sticky top-0 left-0 w-full p-2 dark:bg-slate-400/20">
      <div className="flex justify-between">
        <Image
          src={logo}
          alt="logo"
          priority
          height={40}
          width={120}
          style={{ height: "40px", width: "120px" }}
        />
        <div className="flex items-center justify-between gap-2">
          {userName ? (
            <div className="flex gap-2 items-center">
              <UserAvatar userName={userName} />
              <LogOutButton />
            </div>
          ) : (
            <>
              <Button variant="link">
                <Link href="/sign-up">Sign up</Link>
              </Button>
              <Button variant="link">
                <Link href="/sign-in">Sign in</Link>
              </Button>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
