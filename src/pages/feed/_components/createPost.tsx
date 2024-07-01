import { useSession } from "@/pages/sign-in/_provider";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Textarea,
} from "@chakra-ui/react";
import { Post, Prisma } from "@prisma/client";
import { useState } from "react";

export default function CreatePost({
  setPosts,
}: {
  setPosts: React.Dispatch<
    React.SetStateAction<Prisma.PostGetPayload<{ include: { likes: true } }>[]>
  >;
}) {
  const [loading, setLoading] = useState(true);
  const { username } = useSession();
  const [input, setInput] = useState<string>("");

  const handlePost = async () => {
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: input, username }),
    });

    const newPost: Post = await res.json();

    setPosts((old) => [newPost, ...old]);
  };

  return (
    <Card className="w-3/5 flex flex-col" bg={"blackAlpha.900"}>
      <CardHeader className="text-2xl font-semibold ml-3">
        Create Post
      </CardHeader>
      <Divider />
      <CardBody>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What's on your mind?"
          height={"140px"}
        />
      </CardBody>
      <CardFooter className="flex justify-end">
        <Button onClick={handlePost} colorScheme="purple" width={"120px"}>
          Post
        </Button>
      </CardFooter>
    </Card>
  );
}
