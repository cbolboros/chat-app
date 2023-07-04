"use client";

import { FullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import useConversation from "@/app/hooks/useConversation";
import MessageItem from "@/app/conversations/[conversationId]/components/MessageItem";
import axios from "axios";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";
import { isSameMinute } from "date-fns";
import { User } from "@prisma/client";
import Avatar from "@/components/Avatar";
import { useSession } from "next-auth/react";
import TypingIndicator from "@/app/conversations/[conversationId]/components/TypingIndicator";
import { AnimatePresence, motion } from "framer-motion";

interface BodyProps {
  initialMessages: FullMessageType[];
}
const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);

  const bottomRef = useRef<HTMLDivElement>(null);
  const [userTyping, setUserTyping] = useState<User | null>(null);
  const { conversationId } = useConversation();

  const session = useSession();

  const isNotOwnUserTyping = userTyping?.email !== session.data?.user?.email;

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    // @ts-ignore
    let typingTimer;
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView({ behavior: "smooth" });

    const messageHandler = (message: FullMessageType) => {
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }
        return [...current, message];
      });

      bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
      axios.post(`/api/conversations/${conversationId}/seen`);
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }

          return currentMessage;
        })
      );
    };

    const userTypingHandler = (user: User) => {
      setUserTyping(user);
      // @ts-ignore
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => setUserTyping(null), 1000);
    };

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);
    pusherClient.bind("user:typing", userTypingHandler);

    return () => {
      // @ts-ignore
      clearTimeout(typingTimer);
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
      pusherClient.unbind("user:typing", userTypingHandler);
    };
  }, [conversationId]);

  return (
    <div className="flex-1 bg-[#f5f5f5] overflow-y-auto p-4">
      {messages.map((message, index) => (
        <MessageItem
          isLast={index === messages.length - 1}
          isNextSameUser={messages[index + 1]?.sender?.id === message.sender.id}
          isPreviousSameUser={
            messages[index - 1]?.sender?.id === message.sender.id
          }
          isMessageSameMinute={isSameMinute(
            new Date(messages[index - 1]?.createdAt),
            new Date(message.createdAt)
          )}
          key={message.id}
          data={message}
        />
      ))}
      <div className="pt-24" ref={bottomRef} />
      <AnimatePresence>
        {userTyping && isNotOwnUserTyping && (
          <motion.div
            layout
            initial={{
              y: 30,
            }}
            animate={{
              y: 0,
            }}
            exit={{
              y: 50,
            }}
            className="absolute left-16 bottom-0 w-fit flex items-center gap-2"
          >
            <Avatar user={userTyping!} />
            <span className="text-gray-500 text-sm">{userTyping?.name}</span>
            <TypingIndicator />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Body;
