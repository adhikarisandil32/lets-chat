import { lazy } from "react";
import AskUserInfo from "./components/ask-user-info";

const LazySocketConnection = lazy(() => import("./components/socket-connection"));

export default function App() {
  const username = localStorage.getItem("username");

  if (!username) {
    return <AskUserInfo />;
  }

  return <LazySocketConnection username={username} />;
}
