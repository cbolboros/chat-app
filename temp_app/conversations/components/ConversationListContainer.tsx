import ConversationList from "@/temp_app/conversations/components/ConversationList";
import getConversations from "@/temp_app/actions/getConversations";
import getSession from "@/temp_app/actions/getSession";

const ConversationListContainer = async () => {
  const [conversations, session] = await Promise.all([
    getConversations(),
    getSession(),
  ]);
  return <ConversationList initialItems={conversations} session={session!} />;
};

export default ConversationListContainer;
