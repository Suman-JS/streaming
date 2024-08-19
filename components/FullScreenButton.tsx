import React, { memo } from "react";

const FullScreenButton = memo(
  (props: { isFullScreen: boolean; onClick: () => void }) => {
    return (
      <button
        aria-label="FullScreen Toggle Button"
        onClick={props.onClick}
        className="absolute top-2 right-2 text-white"
      >
        {props.isFullScreen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M240-120v-120H120v-80h200v200h-80Zm400 0v-200h200v80H720v120h-80ZM120-640v-80h120v-120h80v200H120Zm520 0v-200h80v120h120v80H640Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z" />
          </svg>
        )}
      </button>
    );
  }
);

FullScreenButton.displayName = "FullScreenButton";
export default FullScreenButton;
