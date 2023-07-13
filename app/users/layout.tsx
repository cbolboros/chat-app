import Sidebar from "@/components/sidebar/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <Sidebar session={session!}>
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
