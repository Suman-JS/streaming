import type { NextApiRequest, NextApiResponse } from "next";
import { exec } from "child_process";
import path from "path";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { title } = req.body;

  const videoPath = path.join(process.cwd(), "public/videos", `${title}.mp4`);
  const thumbnailPath = path.join(
    process.cwd(),
    "public/thumbnails",
    `${title}_thumbnail.jpg`
  );

  const command = `ffmpeg -i ${videoPath} -ss 00:00:10.000 -frames:v 1 -q:v 2 -update 1 ${thumbnailPath}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error generating thumbnail: ${error.message}`);
      return res.status(500).json({ error: "Failed to generate thumbnail" });
    }

    if (stderr) {
      console.error(`FFmpeg stderr: ${stderr}`);
    }

    res.status(200).json({ message: "Thumbnail generated successfully" });
  });
}
