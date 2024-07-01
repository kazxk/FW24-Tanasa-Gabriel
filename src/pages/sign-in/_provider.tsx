import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const usernameContext = createContext({
  username: "",
  signIn: (username: string) => {},
  signOut: () => {},
});

export function SessionProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string>(() => {
    const storedUsername =
      typeof window !== "undefined" ? localStorage.getItem("username") : null;
    return storedUsername ? JSON.parse(storedUsername) : "";
  });

  const signIn = (username: string) => {
    setUsername(username);
    localStorage.setItem("username", JSON.stringify(username));
    console.log("Signed in as", username);
    document.location.href = "/";
  };

  const signOut = () => {
    setUsername("");
    localStorage.removeItem("username");
    document.location.href = "/sign-in";
  };

  useEffect(() => {
    console.log("changed", username);
  }, [username]);

  return (
    <usernameContext.Provider value={{ username, signIn, signOut }}>
      {children}
    </usernameContext.Provider>
  );
}

export function useSession() {
  const session = useContext(usernameContext);
  return session;
}
