"use client";

import { Badge } from "@mantine/core";
import { useSignalr } from "./providers/SignalrProvider";

const SocketIndicator = () => {
  const { isConnected } = useSignalr();
  if (isConnected === "Connected") {
    return <Badge color="teal">online</Badge>;
  } else if (isConnected === "Reconnecting") {
    return <Badge color="yellow">trying connecting ...</Badge>;
  } else {
    return <Badge color="red">offline</Badge>;
  }
};

export default SocketIndicator;
