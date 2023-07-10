import ConversationContainer from "@/app/conversations/[conversationId]/components/ConversationContainer";

interface IParams {
  conversationId: string;
}

const ChatId = ({ params }: { params: IParams }) => {
  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col overflow-hidden relative">
        <ConversationContainer params={params} />
      </div>
    </div>
  );
};

export default ChatId;
