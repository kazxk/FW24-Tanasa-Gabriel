import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";

export default function CreatePost() {
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");

  const handlePost = async () => {
    // Call the API to create a post
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
        <Button onClick={() => handlePost} colorScheme="purple" width={"120px"}>
          Post
        </Button>
      </CardFooter>
    </Card>
  );
}
