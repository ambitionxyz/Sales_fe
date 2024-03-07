"use client";

import { Message, useSignalr } from "@/components/providers/SignalrProvider";
import { useChat } from "@/utils/hooks/useChatStote";
import { useEffect, useState } from "react";
import ChatItem from "./ChatItem";

const ChatMessage = () => {
  const [messages, setMessages] = useState<any>();
  const { data } = useChat();

  useEffect(() => {
    setMessages(data);
  }, [data]);

  return (
    <div className="flex-1 flex flex-col py-4 overflow-y-auto">
      <div className="flex flex-col mt-auto my-5">
        {messages?.length > 0 &&
          messages.map((mes: Message, index: number) => {
            return <ChatItem key={index} {...mes} />;
          })}
      </div>
    </div>
  );
};

export default ChatMessage;
