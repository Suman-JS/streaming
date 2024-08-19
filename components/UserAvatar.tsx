import React from "react";

const UserAvatar = (props: { userName: string }) => {
  return (
    <div className="size-8 rounded-full text-black text-xl font-bold uppercase bg-gray-300 text-center flex items-center justify-center hover:bg-gray-400 transition-all">
      {props.userName[0]}
    </div>
  );
};

export default UserAvatar;
