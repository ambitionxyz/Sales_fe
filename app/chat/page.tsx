"use client";

import ChatHeader from "@/features/chat/ChatHeader";
import ChatInput from "@/features/chat/ChatInput";
import ChatMessage from "@/features/chat/ChatMessages";

const Page = () => {
  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-[802px]">
      <ChatHeader />
      <ChatMessage />
      <ChatInput />
    </div>
  );
};

export default Page;
