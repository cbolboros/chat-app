import MobileFooter from "@/components/sidebar/MobileFooter";
import { Session } from "next-auth";
import DesktopSidebar from "@/components/sidebar/DesktopSidebar";

async function Sidebar({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <div className="h-full">
      <DesktopSidebar currentUser={session.user} />
      <MobileFooter />
      <main className="h-full lg:pl-28">{children}</main>
    </div>
  );
}

export default Sidebar;
