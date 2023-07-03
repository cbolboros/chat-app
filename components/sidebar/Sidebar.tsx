import DesktopSidebar from "@/components/sidebar/DesktopSidebar";
import MobileFooter from "@/components/sidebar/MobileFooter";
import getCurrentUser from "@/app/actions/getCurrentUser";

async function Sidebar({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();
  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser!} />
      <MobileFooter />
      <main className="lg:pl-28 h-full">{children}</main>
    </div>
  );
}

export default Sidebar;
