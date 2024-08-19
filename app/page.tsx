// import VideoPlayer from "@/components/VideoPlayer";

import VideoList from "@/components/VideoList";
import { db } from "@/lib/db";

export default async function Home() {
  const videos = await db.videos.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {/* <VideoPlayer videoId="video2" /> */}
      <VideoList videos={videos} />
    </main>
  );
}
