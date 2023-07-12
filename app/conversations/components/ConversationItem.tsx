"use client";

import React, { useCallback, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { format, isThisYear, isToday } from "date-fns";
import clsx from "clsx";

import { FullConversationType } from "@/app/types";
import TypingIndicator from "@/app/conversations/[conversationId]/components/TypingIndicator";
import Avatar from "@/components/Avatar";
import { Session } from "next-auth";
import { HiEllipsisHorizontal, HiOutlineTrash } from "react-icons/hi2";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useDeleteConversation from "@/app/hooks/useDeleteConversation";

interface ConversationItemProps {
  data: FullConversationType;
  selected?: boolean;
  isTyping?: boolean;
  session?: Session;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  data,
  selected,
  isTyping,
  session,
}) => {
  const otherUser = data.users.find(
    (user) => user.email !== session?.user?.email,
  );
  const router = useRouter();

  const conversationRef = useRef<HTMLDivElement>(null);

  const { deleteConversation } = useDeleteConversation();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => session?.user?.email, [session?.user?.email]);

  const lastMessageIsMine = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    return lastMessage.sender?.email === userEmail;
  }, [lastMessage, userEmail]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }

    if (lastMessage?.body) {
      if (lastMessageIsMine) {
        return `You: ${lastMessage.body}`;
      }
      return lastMessage?.body;
    }

    return "Started a conversation";
  }, [lastMessage, lastMessageIsMine]);

  return (
    <div
      ref={conversationRef}
      onClick={handleClick}
      className={clsx(
        `
        w-full 
        relative 
        select-none
        flex 
        items-center 
        space-x-3 
        p-3 
        rounded-lg
        transition
        cursor-pointer
        group
        `,
        selected ? "bg-neutral-100" : "bg-white hover:bg-neutral-50",
      )}
    >
      <Avatar user={otherUser!} />
      <div className="min-w-0 flex-1">
        <div className="group-hover:hidden focus:outline-none group-[.dropdown-active]:hidden">
          <div className="flex items-center justify-between">
            <p
              className={`text-md text-gray-900 truncate flex-1 ${
                !hasSeen ? "font-bold" : ""
              }`}
            >
              {data.name || otherUser?.name}
            </p>
            {lastMessage?.createdAt && (
              <p
                className="
                  text-xs
                  text-gray-400
                  font-light
                  pl-1
                "
              >
                {format(
                  new Date(lastMessage?.createdAt),
                  isToday(new Date(lastMessage?.createdAt))
                    ? "p"
                    : isThisYear(new Date(lastMessage?.createdAt))
                    ? "dd-MMM"
                    : "dd-MMM-yy",
                )}
              </p>
            )}
          </div>
          {!isTyping && (
            <p
              className={clsx(
                `
              truncate 
              text-xs
              `,
                hasSeen
                  ? "text-gray-500 group-hover:text-gray-900"
                  : "text-black font-bold",
              )}
            >
              {lastMessageText}
            </p>
          )}
          {isTyping && (
            <div className="flex h-4 items-center">
              <TypingIndicator width={6} height={6} />{" "}
            </div>
          )}
        </div>
        <div
          className={`focus:outline-none hidden group-[.dropdown-active]:flex group-hover:flex`}
        >
          <div className="w-full group-hover:w-[85%] group-[.dropdown-active]:w-[85%]">
            <p
              className={`text-md text-gray-900 truncate flex-1 ${
                !hasSeen ? "font-bold" : ""
              }`}
            >
              {data.name || otherUser?.name}
            </p>
            {!isTyping && (
              <p
                className={clsx(
                  `
              truncate 
              text-xs
              `,
                  hasSeen
                    ? "text-gray-500 group-hover:text-gray-900"
                    : "text-black font-bold",
                )}
              >
                {lastMessageText}
              </p>
            )}
          </div>
          <div className="ml-2 flex-1 self-center">
            <DropdownMenu
              onOpenChange={(isOpen) => {
                if (isOpen) {
                  conversationRef?.current?.classList.add("dropdown-active");
                }
              }}
            >
              <DropdownMenuTrigger asChild>
                <button className="p-1">
                  <HiEllipsisHorizontal className="h-6 w-6" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                onAnimationEndCapture={(
                  event: React.AnimationEvent<HTMLDivElement>,
                ) => {
                  if (event.animationName === "exit") {
                    conversationRef?.current?.classList.remove(
                      "dropdown-active",
                    );
                  }
                }}
              >
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    deleteConversation(data);
                  }}
                >
                  <HiOutlineTrash size={16} className="mr-2" />
                  <span>Delete conversation</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
