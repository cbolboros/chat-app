import Link from "next/link";

const EmptyConversationList = () => {
  return (
    <div className="text-gray-400 ">
      <div>No conversations. </div>
      <div>
        Select a{" "}
        <Link href="/users" className="font-bold hover:underline">
          user
        </Link>{" "}
        to start a conversation.
      </div>
    </div>
  );
};

export default EmptyConversationList;
