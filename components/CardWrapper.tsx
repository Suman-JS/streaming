"use client";
import React, { ReactNode } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import AuthHeader from "./AuthHeader";
import Social from "./Social";
import BackButton from "./BackButton";

type CardWrapperType = {
  children: ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  showSocial?: boolean;
  backButtonHref: string;
};

const CardWrapper = (props: CardWrapperType) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <AuthHeader label={props.headerLabel} />
      </CardHeader>
      <CardContent>{props.children}</CardContent>
      {props.showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton
          label={props.backButtonLabel}
          backButtonHref={props.backButtonHref}
        />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
