import ConversationContainer from "@/temp_app/conversations/[conversationId]/components/ConversationContainer";

interface IParams {
  conversationId: string;
}

const ChatId = ({ params }: { params: IParams }) => {
  return (
    <div className="h-full lg:pl-80">
      <div className="relative flex h-full flex-col overflow-hidden">
        <ConversationContainer params={params} />
      </div>
    </div>
  );
};

export default ChatId;
