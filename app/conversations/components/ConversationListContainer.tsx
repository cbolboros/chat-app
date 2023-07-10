import ConversationList from "@/app/conversations/components/ConversationList";
import getConversations from "@/app/actions/getConversations";
import getSession from "@/app/actions/getSession";

const ConversationListContainer = async () => {
  const conversations = await getConversations();
  const session = await getSession();
  return <ConversationList initialItems={conversations} session={session!} />;
};

export default ConversationListContainer;
