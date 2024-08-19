import VideoPlayer from "@/components/VideoPlayer";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Suspense fallback={<div>Loading...</div>}>
        <VideoPlayer videoSrc="/vid.mp4" thumbnailSrc="/Mern.png" />
      </Suspense>
    </main>
  );
}
