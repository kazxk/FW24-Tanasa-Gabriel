import prisma from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { postId, username } = req.body;
    console.log(req.body);
    const isLiked = await prisma.like.findFirst({
      where: { likedBy: username, postId: postId },
    });
    if (!isLiked) {
      const like = await prisma.like.create({
        data: { postId: postId, likedBy: username },
      });
      res.status(200).json(like);
    } else {
      const dislike = await prisma.like.delete({
        where: { id: isLiked.id },
      });
      res.status(200).json(dislike);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
