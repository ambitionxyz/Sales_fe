"use client";

import { cn } from "../../lib/utils";
import SocketIndicator from "@/components/socketIndicator";

import classes from "./ChatHeader.module.css";
import { Avatar } from "@mantine/core";
import { useSignalr } from "@/components/providers/SignalrProvider";
import { useEffect, useState } from "react";
import { useChat } from "@/utils/hooks/useChatStote";

type Member = {
  name: string;
  avt: string;
};

const ChatHeader = () => {
  const { members } = useChat();

  return (
    <div
      className={cn(
        "text-md font-semibold px-3 flex items-center h-12 box-content",
        classes.chat
      )}
    >
      <p className="font-semibold text-md text-black dark:text-white">
        MESSAGES
      </p>
      <div className="ml-auto flex items-center mr-5">
        <Avatar.Group>
          {members.map((member: any) => {
            return <Avatar src={member.avt} />;
          })}

          {members.length > 2 && <Avatar>+{members.length - 2}</Avatar>}
        </Avatar.Group>
        <SocketIndicator />
      </div>
    </div>
  );
};

export default ChatHeader;
