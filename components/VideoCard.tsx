import React, { useCallback } from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";

import Link from "next/link";

const VideoCard = (props: {
  videoId: string;
  videoTitle: string;
  uploadedAt: Date;
}) => {
  const formatDate = useCallback((uploadDate: Date) => {
    const now = new Date();
    const years = now.getFullYear() - uploadDate.getFullYear();
    const months = now.getMonth() - uploadDate.getMonth() + years * 12;
    const days = Math.floor(
      (now.getTime() - uploadDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const hours =
      Math.floor((now.getTime() - uploadDate.getTime()) / (1000 * 60 * 60)) %
      24;
    const minutes =
      Math.floor((now.getTime() - uploadDate.getTime()) / (1000 * 60)) % 60;
    const seconds =
      Math.floor((now.getTime() - uploadDate.getTime()) / 1000) % 60;

    if (years > 1) {
      return `${years} years ago`;
    } else if (months > 1) {
      return `${months} months ago`;
    } else if (days > 1) {
      return `${days} days ago`;
    } else if (hours > 1) {
      return `${hours} hours ago`;
    } else if (minutes > 1) {
      return `${minutes} minutes ago`;
    } else {
      return `${seconds} seconds ago`;
    }
  }, []);

  return (
    <Link href={`/${props.videoTitle}`}>
      <Card>
        <CardContent className="grid grid-cols-video p-1 gap-1 border-none content-center self-center">
          <div className="h-32 w-64 my-auto">
            <Image
              src={`/thumbnails/${props.videoTitle}_thumbnail.jpg`}
              alt="video thumbnail"
              width={256}
              height={128}
              quality={60}
              loading="lazy"
              className="size-full aspect-video object-cover object-center rounded-md"
            />
          </div>
          <div className="max-w-screen-md w-full h-32 overflow-x grid grid-rows-3 space-y-1">
            <p className="break-all row-span-2 text-lg">{props.videoTitle}</p>
            <p className="row-span-1 text-muted-foreground">
              {formatDate(props.uploadedAt)}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default VideoCard;
