import DesktopSidebar from "@/components/sidebar/DesktopSidebar";
import MobileFooter from "@/components/sidebar/MobileFooter";
import getCurrentUser from "@/app/actions/getCurrentUser";

async function Sidebar({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();
  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser!} />
      <MobileFooter />
      <main className="h-full lg:pl-28">{children}</main>
    </div>
  );
}

export default Sidebar;
