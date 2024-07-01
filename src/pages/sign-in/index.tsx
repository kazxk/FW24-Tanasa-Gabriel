import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CheckboxIcon,
  Divider,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useSession } from "./_provider";
import { sign } from "crypto";
import { CheckIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

export default function SignIn() {
  const { username: name, signIn } = useSession();

  const [username, setUsername] = useState("");

  const handleSignIn = () => {
    if (!username || username.trim().length <= 0)
      return alert("Please enter a username");
    signIn(username);
  };

  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <Card width={"420px"} bg="blackAlpha.600">
        <CardHeader className="text-3xl font-semibold text-center">
          What's your name?
        </CardHeader>
        <Divider />
        <CardBody className="my-6">
          <InputGroup>
            <InputLeftAddon>Username:</InputLeftAddon>
            <Input
              placeholder="ex. John Cena"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputGroup>
        </CardBody>
        <Divider />
        <CardFooter className="w-full items-center flex justify-center">
          <Button
            onClick={() => handleSignIn()}
            leftIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                />
              </svg>
            }
            width={"300px"}
            height={"50px"}
          >
            Sign In
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
