"use client";

import { User } from "@prisma/client";
import UserItem from "@/app/users/components/UserItem";
import EmptyUserList from "@/app/users/components/EmptyUserList";

interface UserListProps {
  items: User[];
}
const UserList: React.FC<UserListProps> = ({ items }) => {
  return (
    <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-28 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0">
      <div className="px-5 h-full">
        <div className="flex-col">
          <div className="text-2xl font-bold text-neutral-800 py-4">Users</div>
        </div>
        {items.length > 0 ? (
          items.map((item) => <UserItem key={item.id} data={item} />)
        ) : (
          <EmptyUserList />
        )}
      </div>
    </aside>
  );
};

export default UserList;
