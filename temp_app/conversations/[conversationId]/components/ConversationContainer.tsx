import Body from "@/temp_app/conversations/[conversationId]/components/Body";
import Form from "@/temp_app/conversations/[conversationId]/components/Form";
import TypingContainer from "@/temp_app/conversations/[conversationId]/components/TypingContainer";
import Header from "@/temp_app/conversations/[conversationId]/components/Header";
import getConversationById from "@/temp_app/actions/getConversationById";
import getMessages from "@/temp_app/actions/getMessages";
import EmptyState from "@/components/EmptyState";
import getSession from "@/temp_app/actions/getSession";

const conversationContainer = async ({ params }: any) => {
  const [conversation, messages, session] = await Promise.all([
    getConversationById(params.conversationId),
    getMessages(params.conversationId),
    getSession(),
  ]);

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
