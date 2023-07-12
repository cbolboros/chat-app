import ConversationList from "@/app/conversations/components/ConversationList";
import getConversations from "@/app/actions/getConversations";
import getSession from "@/app/actions/getSession";

const ConversationListContainer = async () => {
  const [conversations, session] = await Promise.all([
    getConversations(),
    getSession(),
  ]);
  return <ConversationList initialItems={conversations} session={session!} />;
};

export default ConversationListContainer;
