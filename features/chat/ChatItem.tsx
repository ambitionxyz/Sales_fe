"use client";

import { cn } from "@/lib/utils";
import { Avatar, Tooltip } from "@mantine/core";
import { ShieldAlert } from "lucide-react";
import classes from "./ChatItem.module.css";
import { CustomeSession } from "@/components/user-button";
import { useSession } from "next-auth/react";

interface ChatItemProps {
  usr: string;
  avatar: string;
  msg: string;
}
const ChatItem = ({ usr, avatar, msg }: ChatItemProps) => {
  const { data } = useSession();
  const session = data as CustomeSession;

  return (
    <div
      className={cn(
        "relative group flex items-center hover:bg-black/5 p-4 transition w-full",
        classes.ChatItemWapper
      )}
    >
      <div
        onClick={undefined}
        className="cursor-pointer hover:drop-shadow-md transition"
      >
        <Avatar src={avatar} />
      </div>
      <div
        className={cn(
          "flex flex-col w-full ml-4",
          session.user.login === usr && classes.IsCurrent,
          classes.message
        )}
      >
        <div className="flex items-center gap-x-2 ">
          <div className="flex items-center">
            <p
              onClick={undefined}
              className="font-semibold text-sm hover:underline cursor-pointer"
            ></p>
            <Tooltip label={usr}>
              <ShieldAlert className="h-4 w-4  text-rose-500" />
            </Tooltip>
          </div>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {usr}
          </span>
        </div>
        <p
          className={cn(
            "text-sm text-zinc-600 dark:text-zinc-300"
            // true && "italic text-zinc-500 dark:text-zinc-400 text-xs mt-1"
          )}
        >
          {msg}
        </p>
      </div>
    </div>
  );
};

export default ChatItem;
