import { useSession } from "@/pages/sign-in/_provider";
import { post } from "@/types";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@chakra-ui/react";
import type { Post, Prisma } from "@prisma/client";
import moment from "moment";
import { useEffect, useState } from "react";

export default function Post({
  post,
}: {
  post: Prisma.PostGetPayload<{ include: { likes: true } }>;
}) {
  const { username } = useSession();
  const [isLiked, setLiked] = useState<boolean>(false);

  function checkLike(): boolean {
    return post?.likes?.some((like) => like.likedBy === username);
  }

  const likePost = async () => {
    const response = await fetch("/api/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId: post.id, username }),
    });
  };

  useEffect(() => {
    setLiked(checkLike());
  }, []);

  const commentPost = async () => {
    // Call the API to comment on the post
  };

  const sharePost = async () => {
    // Call the API to share the post
  };

  return (
    <Card className="w-3/5 flex flex-col" bg={"blackAlpha.900"}>
      <CardHeader className="flex flex-row gap-3">
        <h1 className="text-lg font-semibold">{post.user}</h1>
        <h1 className="text-lg font-light">
          {moment(post.createdAt).fromNow() +
            " - " +
            moment(post.createdAt).format("DD MMM YYYY")}
        </h1>
      </CardHeader>
      <Divider />
      <CardBody className="my-3">
        <p>{post.content}</p>
      </CardBody>
      <Divider />
      <CardFooter className="flex flex-row gap-3">
        <Button
          leftIcon={
            !isLiked ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            )
          }
          onClick={likePost}
          width={"100%"}
        >
          {0}
        </Button>
        <Button
          leftIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
          }
          onClick={commentPost}
          width={"100%"}
        >
          {0}
        </Button>
        <Button
          leftIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
              />
            </svg>
          }
          onClick={sharePost}
          width={"100%"}
        >
          <div>{0}</div>
        </Button>
      </CardFooter>
    </Card>
  );
}
