"use client";
import { FullConversationType } from "@/app/types";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import useConversation from "@/app/hooks/useConversation";
import clsx from "clsx";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationItem from "@/app/conversations/components/ConversationItem";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/lib/pusher";
import EmptyConversationList from "@/app/conversations/components/EmptyConversationList";
import { User } from "@prisma/client";

interface ConversationListProps {
  initialItems: FullConversationType[];
}
const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
}) => {
  const session = useSession();
  const [items, setItems] = useState<FullConversationType[]>(initialItems);
  const router = useRouter();
  const [userTyping, setUserTyping] = useState<User | null>(null);
  const isNotOwnUserTyping = userTyping?.email !== session.data?.user?.email;

  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) return;

    // @ts-ignore
    let typingTimer;

    pusherClient.subscribe(pusherKey);
    pusherClient.subscribe(conversationId);

    const newConversationHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (current.find((item) => item.id === conversation.id)) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const updateConversationHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }

          return currentConversation;
        })
      );
    };

    const removeConversationHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [
          ...current.filter(
            (currentConversation) => currentConversation.id !== conversation.id
          ),
        ];
      });

      if (conversationId === conversation.id) {
        router.push("/conversations");
      }
    };
    const userTypingHandler = (user: User) => {
      setUserTyping(user);
      // @ts-ignore
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => setUserTyping(null), 1000);
    };

    pusherClient.bind("conversations:new", newConversationHandler);
    pusherClient.bind("conversations:update", updateConversationHandler);
    pusherClient.bind("conversations:remove", removeConversationHandler);
    pusherClient.bind("user:typing", userTypingHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("conversations:new", newConversationHandler);
      pusherClient.unbind("conversations:update", updateConversationHandler);
      pusherClient.unbind("conversations:remove", removeConversationHandler);
      // @ts-ignore
      clearTimeout(typingTimer);
    };
  }, [pusherKey, conversationId, router]);

  return (
    <aside
      className={clsx(
        `
        fixed
        inset-y-0
        pb-20
        lg:pb-0
        lg:left-28
        lg:w-80
        lg:block
        overflow-y-auto
        border-r
        border-gray-200
        `,
        isOpen ? "hidden" : "block w-full left-0"
      )}
    >
      <div className="px-5">
        <div className="flex justify-between mb-4 pt-4">
          <div className="text-2xl font-bold text-neutral-800">Messages</div>
          <div className="rounded-full p-2 bg-gray-100 text-black cursor-pointer hover:bg-gray-200 transition">
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>
        {items.length > 0 ? (
          items.map((item) => (
            <ConversationItem
              key={item.id}
              data={item}
              isTyping={userTyping! && isNotOwnUserTyping}
              selected={conversationId === item.id}
            />
          ))
        ) : (
          <EmptyConversationList />
        )}
      </div>
    </aside>
  );
};

export default ConversationList;
