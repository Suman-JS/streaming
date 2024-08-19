import React, { memo } from "react";

const PlayPauseButton = memo(
  (props: { isPaused: boolean; onClick: () => void }) => {
    return (
      <button
        onClick={props.onClick}
        className="text-white"
        aria-label={props.isPaused ? "Play Button" : "Pause Button"}
      >
        {props.isPaused ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z" />
          </svg>
        )}
      </button>
    );
  }
);
PlayPauseButton.displayName = "PlayPauseButton";
export default PlayPauseButton;
