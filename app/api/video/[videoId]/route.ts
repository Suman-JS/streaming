import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  req: NextRequest,
  { params }: { params: { videoId: string } }
) {
  const { videoId } = params;
  const videoPath = path.resolve(`public/videos/${videoId}.mp4`);
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.get("range");

  if (!range) {
    return new NextResponse("Requires Range header", { status: 416 });
  }

  const parts = range.replace(/bytes=/, "").split("-");
  const start = parseInt(parts[0], 10);
  const chunkSize = 1 * 1024 * 1024;
  const end = Math.min(start + chunkSize - 1, fileSize - 1);

  const file = fs.createReadStream(videoPath, { start, end });

  const headers = {
    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": chunkSize.toString(),
    "Content-Type": "video/mp4",
  };

  return new NextResponse(file as any, {
    headers,
    status: 206,
  });
}
