import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const BackButton = (props: { label: string; backButtonHref: string }) => {
  return (
    <Button variant="link" className="font-normal w-full" size="sm" asChild>
      <Link href={props.backButtonHref}>{props.label}</Link>
    </Button>
  );
};

export default BackButton;
