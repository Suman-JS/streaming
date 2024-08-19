"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  ChangeEvent,
} from "react";
import PlayPauseButton from "./PlayPauseButton";
import VolumeControl from "./VolumeControl";
import TimeDisplay from "./TimeDisplay";
import FullScreenButton from "./FullScreenButton";

const VideoPlayer = (props: { videoSrc: string; thumbnailSrc: string }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [duration, setDuration] = useState(0);
  const [volumeLevel, setVolumeLevel] = useState<"high" | "low" | "muted">(
    "high"
  );
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const formatTime = useCallback((time: number) => {
    const minute = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minute}:${seconds.toString().padStart(2, "0")}`;
  }, []);

  const formattedCurrentTime = useMemo(
    () => formatTime(currentTime),
    [formatTime, currentTime]
  );

  const formattedDuration = useMemo(
    () => formatTime(duration),
    [formatTime, duration]
  );

  const volumeValue = useMemo(() => videoRef?.current?.volume ?? 1, [videoRef]);

  const seekBarProps = useMemo(
    () => ({
      max: duration,
      value: currentTime,
    }),
    [currentTime, duration]
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPaused(false);
    const handlePause = () => setIsPaused(true);
    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetaData = () => setDuration(video.duration);
    const handleVolumeChange = () => {
      setVolumeLevel(
        video.muted ? "muted" : video.volume >= 0.5 ? "high" : "low"
      );
    };
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetaData);
    video.addEventListener("volumechange", handleVolumeChange);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetaData);
      video.removeEventListener("volumechange", handleVolumeChange);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.paused ? video.play() : video.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
    }
  }, []);

  const toggleFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen((prev) => !prev);
  }, []);

  const handleSeek = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;

    if (video) {
      const time = parseFloat(e.target.value);
      video.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const handleVolumeChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (video) {
      const volume = parseFloat(e.target.value);
      video.volume = volume;
      video.muted = volume === 0;
    }
  }, []);

  const VolumeIcon = useCallback(() => {
    switch (volumeLevel) {
      case "muted":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 376-696l104-104v208Zm-80 238v-94l-72-72H200v80h114l86 86Zm-36-130Z" />
          </svg>
        );
        break;
      case "low":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M200-360v-240h160l200-200v640L360-360H200Zm440 40v-322q45 21 72.5 65t27.5 97q0 53-27.5 96T640-320ZM480-606l-86 86H280v80h114l86 86v-252ZM380-480Z" />
          </svg>
        );
        break;
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z" />
          </svg>
        );
        break;
    }
  }, [volumeLevel]);

  return (
    <>
      <div className="relative w-full max-w-4xl mx-auto bg-black">
        <video
          ref={videoRef}
          className="w-full"
          src={props.videoSrc}
          poster={props.thumbnailSrc}
          onClick={togglePlay}
        ></video>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <input
            type="range"
            min={0}
            {...seekBarProps}
            onChange={handleSeek}
            className="w-full mt-2"
          />
          <TimeDisplay
            currentTime={formattedCurrentTime}
            duration={formattedDuration}
          />
          <div className="flex">
            <PlayPauseButton isPaused={isPaused} onClick={togglePlay} />
            <VolumeControl
              volume={volumeValue}
              onVolumeChange={handleVolumeChange}
              onMuteToggle={toggleMute}
              VolumeIcon={VolumeIcon}
            />
            <FullScreenButton
              isFullScreen={isFullScreen}
              onClick={toggleFullScreen}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
