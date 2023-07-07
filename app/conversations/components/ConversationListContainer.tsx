import ConversationList from "@/app/conversations/components/ConversationList";
import getConversations from "@/app/actions/getConversations";

const ConversationListContainer = async () => {
  const conversations = await getConversations();
  return <ConversationList initialItems={conversations} />;
};

export default ConversationListContainer;
