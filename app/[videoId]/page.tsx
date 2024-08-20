"use client";
import VideoPlayer from "@/components/VideoPlayer";
import { usePathname } from "next/navigation";
import React, { Suspense } from "react";

const PlayerPage = () => {
  const params = usePathname();
  const videoId = params.replace("/", "");

  return (
    <div className="flex justify-center items-center pt-2">
      <Suspense fallback={<div>Loading video...</div>}>
        <VideoPlayer videoId={videoId} />
      </Suspense>
    </div>
  );
};

export default PlayerPage;
