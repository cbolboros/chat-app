"use client";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { User } from "@prisma/client";
import useConversation from "@/app/hooks/useConversation";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import Avatar from "@/components/Avatar";
import TypingIndicator from "@/app/conversations/[conversationId]/components/TypingIndicator";

export interface TypingHandlerProps {
  currentUser: User;
  conversationId: string;
}
const TypingContainer = () => {
  const { conversationId } = useConversation();
  const session = useSession();

  const [userTyping, setUserTyping] = useState<User | null>(null);
  const isNotOwnUserTyping = userTyping?.email !== session.data?.user?.email;

  useEffect(() => {
    // @ts-ignore
    let typingTimer;
    pusherClient.subscribe(conversationId);
    const userTypingHandler = (data: TypingHandlerProps) => {
      if (data.conversationId !== conversationId) return;
      setUserTyping(data.currentUser);
      // @ts-ignore
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => setUserTyping(null), 1000);
    };
    pusherClient.bind("user:typing", userTypingHandler);
    return () => {
      // @ts-ignore
      clearTimeout(typingTimer);
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("user:typing", userTypingHandler);
    };
  }, [conversationId]);

  return (
    <>
      <AnimatePresence>
        {userTyping && isNotOwnUserTyping && (
          <motion.div
            layout
            initial={{
              y: 30,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: 50,
            }}
            className="absolute left-20 bottom-20 w-fit flex items-center gap-2"
          >
            <Avatar user={userTyping!} />
            <span className="text-gray-500 text-sm">{userTyping?.name}</span>
            <TypingIndicator />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TypingContainer;
