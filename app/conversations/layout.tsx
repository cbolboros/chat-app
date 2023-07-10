import ConversationListContainer from "@/app/conversations/components/ConversationListContainer";
import Sidebar from "@/components/sidebar/Sidebar";

export default function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sidebar>
      <div className="h-full">
        <ConversationListContainer />
        {children}
      </div>
    </Sidebar>
  );
}
