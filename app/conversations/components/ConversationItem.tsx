"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { format, isThisYear, isToday } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";

import { FullConversationType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/components/Avatar";
import TypingIndicator from "@/app/conversations/[conversationId]/components/TypingIndicator";

interface ConversationItemProps {
  data: FullConversationType;
  selected?: boolean;
  isTyping?: boolean;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  data,
  selected,
  isTyping,
}) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(
    () => session.data?.user?.email,
    [session.data?.user?.email]
  );

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
      onClick={handleClick}
      className={clsx(
        `
        w-full 
        relative 
        flex 
        items-center 
        space-x-3 
        p-3 
        rounded-lg
        transition
        cursor-pointer
        `,
        selected ? "bg-neutral-100" : "bg-white hover:bg-neutral-50"
      )}
    >
      <Avatar user={otherUser} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center">
            <p className="text-md text-gray-900 truncate flex-1">
              {data.name || otherUser.name}
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
                    : "dd-MMM-yy"
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
                hasSeen ? "text-gray-500" : "text-black font-medium"
              )}
            >
              {lastMessageText}
            </p>
          )}
          {isTyping && (
            <div className="h-4 flex items-center">
              <TypingIndicator width={6} height={6} />{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
