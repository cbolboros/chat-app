import Body from "@/app/conversations/[conversationId]/components/Body";
import Form from "@/app/conversations/[conversationId]/components/Form";
import TypingContainer from "@/app/conversations/[conversationId]/components/TypingContainer";
import Header from "@/app/conversations/[conversationId]/components/Header";
import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/components/EmptyState";

const conversationContainer = async ({ params }: any) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <>
      <Header conversation={conversation!} />
      <Body initialMessages={messages} />
      <Form />
      <TypingContainer />
    </>
  );
};

export default conversationContainer;
