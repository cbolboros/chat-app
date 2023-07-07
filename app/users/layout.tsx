import Sidebar from "@/components/sidebar/Sidebar";
import UserList from "@/app/users/components/UserList";

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sidebar>
      <div className="h-full">
        <UserList />
        {children}
      </div>
    </Sidebar>
  );
}
