import Image from "next/image";
import { Inter } from "next/font/google";
import { Button, useColorMode } from "@chakra-ui/react";
import { useSession } from "./sign-in/_provider";
import { useEffect } from "react";
import Feed from "./feed";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <Feed />;
}
