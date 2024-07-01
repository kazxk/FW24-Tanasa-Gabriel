import prisma from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        likes: true,
      },
    });
    res.status(200).json(posts);
  } else if (req.method === "POST") {
    const { username, content } = req.body;
    if (!username || !content) {
      res.status(400);
    }
    const newPost = await prisma.post.create({
      data: { user: username, content: content },
    });
    res.status(200).json(newPost);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
