import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Spacer,
} from "@chakra-ui/react";
import { useSession } from "../sign-in/_provider";
import { useEffect, useState } from "react";
import PostCard from "./_components/post";
import CreatePost from "./_components/createPost";
import { Prisma, type Post } from "@prisma/client";

export default function Feed() {
  const { username, signOut } = useSession();

  useEffect(() => {
    async function getFeed() {
      await fetch("/api/posts")
        .then((res) => res.json())
        .then((data) => setPosts(data));
    }
    getFeed();
  }, []);

  const [posts, setPosts] = useState<
    Prisma.PostGetPayload<{ include: { likes: true } }>[]
  >([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) {
      document.location.href = "/sign-in";
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div className="fixed -z-10 h-full w-full bg-black">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div>
      </div>
      <div className="min-w-screen w-full min-h-screen flex flex-col items-center justify-center">
        <h1 className="pt-24 text-5xl font-bold text-transparent bg-gradient-to-br from-purple-700 to-indigo-300 bg-clip-text opacity-90">
          ORION
        </h1>
        <div className="flex flex-row gap-3 fixed top-3 right-3 items-center">
          <div className="text-xl">Signed in as {username ?? ""}</div>
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
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
            }
            onClick={signOut}
          >
            Sign Out
          </Button>
        </div>
        <div className="relative flex flex-col items-center justify-center min-h-screen max-w-screen-lg w-full gap-5 mt-24">
          <CreatePost setPosts={setPosts} />
          {posts.map((post, i) => (
            <PostCard key={i} post={post} />
          ))}
        </div>
      </div>
      <Spacer height={"250px"} />
    </main>
  );
}
