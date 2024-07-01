import "@/styles/globals.css";
import { ChakraProvider, DarkMode } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { SessionProvider } from "./sign-in/_provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <ChakraProvider>
        <DarkMode>
          <Component {...pageProps} />
        </DarkMode>
      </ChakraProvider>
    </SessionProvider>
  );
}
