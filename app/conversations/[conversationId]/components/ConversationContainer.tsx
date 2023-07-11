import Body from "@/app/conversations/[conversationId]/components/Body";
import Form from "@/app/conversations/[conversationId]/components/Form";
import TypingContainer from "@/app/conversations/[conversationId]/components/TypingContainer";
import Header from "@/app/conversations/[conversationId]/components/Header";
import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/components/EmptyState";
import getSession from "@/app/actions/getSession";

const conversationContainer = async ({ params }: any) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);
  const session = await getSession();

  if (!conversation) {
    return (
      <div className="h-full lg:pl-80">
        <div className="flex h-full flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <>
      <Header conversation={conversation!} session={session!} />
      <Body initialMessages={messages} session={session!} />
      <Form />
      <TypingContainer />
    </>
  );
};

export default conversationContainer;
