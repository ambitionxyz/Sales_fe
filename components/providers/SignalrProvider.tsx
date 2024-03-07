"use client";

import { createContext, useContext, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

import { useChat } from "@/utils/hooks/useChatStote";
import { useSession } from "next-auth/react";
import { CustomeSession } from "../user-button";

export type Message = {
  usr: string;
  avatar: string;
  msg: string;
};

type SignalType = {
  instance: any;
  isConnected: string;
  newMessage: (data: string) => void;
};

const SignalrConext = createContext<SignalType>({
  instance: null,
  isConnected: "Disconnected",
  newMessage: (data: string) => {},
});

export const useSignalr = () => {
  return useContext(SignalrConext);
};

export const SignalProvider = ({ children }: { children: React.ReactNode }) => {
  const [instance, setInstance] = useState<signalR.HubConnection | null>(null);
  const [isConnected, setIsConnected] = useState<string>("Disconnected");
  const { onAddNewMessage, onHandleMembers, onAddMember } = useChat();
  const { data } = useSession();
  const session = data as CustomeSession;
  const accessToken = session?.user?.accessToken || "";
  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`http://localhost:4099/agentsChat?access_token=${accessToken}`)
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => {
        if (!instance) {
          setInstance(connection);
        }
        setIsConnected("Connected");
        onAddMember({
          name: session.user.login,
          avt: session.user.avatar,
        });

        connection.on("ReceiveMessage", (usr, avatar, msg) => {
          const newMess = { usr, avatar, msg } as Message;
          onAddNewMessage(newMess);
        });

        connection.on("ReceiveNotification", (msg) => {
          const restMsg = msg.split(" ");
          const nameLogin = restMsg[0];
          const action = restMsg[1];
          onHandleMembers({ name: nameLogin, action });
        });
      })
      .catch((err) => console.error("SignalR connection error: ", err));

    return () => {
      connection.stop();
    };
  }, []);

  const newMessage = (data: string) => {
    if (!instance) return;

    instance.invoke("SendMessage", data).then((x) => console.log("sent"));
  };

  return (
    <SignalrConext.Provider
      value={{ instance, isConnected, newMessage: newMessage }}
    >
      {children}
    </SignalrConext.Provider>
  );
};
