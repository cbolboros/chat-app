import UserItem from "@/app/users/components/UserItem";
import EmptyUserList from "@/app/users/components/EmptyUserList";
import getUsers from "@/app/actions/getUsers";

const UserList = async () => {
  const users = await getUsers();
  return (
    <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-28 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0">
      <div className="px-5 h-full">
        <div className="flex-col">
          <div className="text-2xl font-bold text-neutral-800 py-4">Users</div>
        </div>
        {users.length > 0 ? (
          users.map((item) => <UserItem key={item.id} data={item} />)
        ) : (
          <EmptyUserList />
        )}
      </div>
    </aside>
  );
};

export default UserList;
