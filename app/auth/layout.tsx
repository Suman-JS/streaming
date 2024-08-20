import React, { ReactNode } from "react";

const AuthLayout = (props: { children: ReactNode }) => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      {props.children}
    </div>
  );
};

export default AuthLayout;
