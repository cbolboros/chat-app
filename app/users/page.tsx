import EmptyState from "@/components/EmptyState";
import UserList from "@/app/users/components/UserList";

const Users = async () => {
  return (
    <>
      <div className="hidden h-full lg:block lg:pl-80">
        <EmptyState />
      </div>
      <UserList />
    </>
  );
};

export default Users;
