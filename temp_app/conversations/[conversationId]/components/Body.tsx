"use client";

import { FullMessageType } from "@/temp_app/types";
import { useEffect, useRef, useState } from "react";
import useConversation from "@/temp_app/hooks/useConversation";
import MessageItem from "@/temp_app/conversations/[conversationId]/components/MessageItem";
import axios from "axios";
import { pusherClient } from "@/lib/pusher";
import { isSameMinute } from "date-fns";
import ScrollToBottomContainer from "@/temp_app/conversations/[conversationId]/components/ScrollToBottomContainer";
import { Session } from "next-auth";

interface BodyProps {
  initialMessages: FullMessageType[];
  session: Session;
}
const Body: React.FC<BodyProps> = ({ initialMessages, session }) => {
  const [messages, setMessages] = useState(initialMessages);

  const bottomRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      setMessages((current) => {
        if (current.find((current) => current.id === message.id)) {
          return current;
        }
        return [...current, message];
      });

      axios.post(`/api/conversations/${conversationId}/seen`);
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }

          return currentMessage;
        }),
      );
    };

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
  }, [conversationId]);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="flex-1 bg-[#f5f5f5] overflow-y-auto p-4" ref={bodyRef}>
        {messages.map((message, index) => (
          <MessageItem
            session={session}
            isLast={index === messages.length - 1}
            isNextSameUser={
              messages[index + 1]?.sender?.id === message.sender.id
            }
            isPreviousSameUser={
              messages[index - 1]?.sender?.id === message.sender.id
            }
            isMessageSameMinute={isSameMinute(
              new Date(messages[index - 1]?.createdAt),
              new Date(message.createdAt),
            )}
            key={message.id}
            data={message}
            bottomRef={bottomRef}
          />
        ))}
        <div className="pt-2" ref={bottomRef} />
      </div>
      <ScrollToBottomContainer bodyRef={bodyRef} />
    </>
  );
};

export default Body;
