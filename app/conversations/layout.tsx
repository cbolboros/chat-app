import Sidebar from "@/components/sidebar/Sidebar";
import ConversationListContainer from "@/app/conversations/components/ConversationListContainer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <Sidebar session={session!}>
      <div className="h-full">
        <ConversationListContainer />
        {children}
      </div>
    </Sidebar>
  );
}
