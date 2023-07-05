import getConversationById from "@/app/actions/getConversationById";
import EmptyState from "@/components/EmptyState";
import getMessages from "@/app/actions/getMessages";
import Header from "@/app/conversations/[conversationId]/components/Header";
import Body from "@/app/conversations/[conversationId]/components/Body";
import Form from "@/app/conversations/[conversationId]/components/Form";
import TypingContainer from "@/app/conversations/[conversationId]/components/TypingContainer";

interface IParams {
  conversationId: string;
}

const ChatId = async ({ params }: { params: IParams }) => {
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
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col overflow-hidden relative">
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
        <TypingContainer />
      </div>
    </div>
  );
};

export default ChatId;
