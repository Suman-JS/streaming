import React, { ChangeEvent, FC, memo } from "react";

const VolumeControl = memo(
  (props: {
    volume: number;
    onVolumeChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onMuteToggle: () => void;
    VolumeIcon: FC;
  }) => {
    return (
      <div className="flex items-center">
        <button
          onClick={props.onMuteToggle}
          className="text-white mr-2"
          aria-label="Volume control button"
        >
          <props.VolumeIcon />
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={props.volume}
          onChange={props.onVolumeChange}
          className="w-20"
        />
      </div>
    );
  }
);

VolumeControl.displayName = "VolumeControl";

export default VolumeControl;
