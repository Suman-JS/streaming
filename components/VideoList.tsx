import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Videos } from "@prisma/client";
import VideoCard from "./VideoCard";

const VideoList = (props: { videos: Videos[] }) => {
  return (
    <ScrollArea className="h-[600px] w-[600px] rounded-md border p-2">
      <div className="flex flex-col gap-3">
        {props.videos.map((video) => (
          <VideoCard
            key={video.id}
            videoId={video.id}
            videoTitle={video.title}
            uploadedAt={video.createdAt}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default VideoList;
