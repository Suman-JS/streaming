import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Videos } from "@prisma/client";

const VideoList = (props: { videos: Videos[] }) => {
  return (
    <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
      {props.videos.map((video) => (
        <div key={video.id}>{video.title}</div>
      ))}
    </ScrollArea>
  );
};

export default VideoList;
