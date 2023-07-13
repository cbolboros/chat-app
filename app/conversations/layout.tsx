import Sidebar from "@/components/sidebar/Sidebar";
import ConversationListContainer from "@/app/conversations/components/ConversationListContainer";
import { Suspense } from "react";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sidebar>
      <div className="h-full">
        <Suspense fallback={<div>Loading conversations...</div>}>
          <ConversationListContainer />
        </Suspense>
        {children}
      </div>
    </Sidebar>
  );
}
