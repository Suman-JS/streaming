import React, { memo } from "react";

const TimeDisplay = memo((props: { currentTime: string; duration: string }) => {
  return (
    <div className="flex justify-between text-white text-sm mt-1">
      <span>{props.currentTime}</span>
      <span>{props.duration}</span>
    </div>
  );
});

TimeDisplay.displayName = "TimeDisplay";

export default TimeDisplay;
