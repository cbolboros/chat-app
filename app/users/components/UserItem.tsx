"use client";
import axios from "axios";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import Avatar from "@/components/Avatar";

interface UserItemPros {
  data: User;
}

const UserItem: React.FC<UserItemPros> = ({ data }) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    axios.post("/api/conversations", { userId: data.id }).then((data) => {
      router.push(`/conversations/${data.data.id}`);
    });
  }, [data, router]);

  return (
    <>
      <div
        onClick={handleClick}
        className="
          w-full 
          relative 
          flex 
          items-center 
          space-x-3 
          bg-white 
          p-3 
          hover:bg-neutral-100
          rounded-lg
          transition
          cursor-pointer
        "
      >
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <div className="flex items-center justify-between">
              <p className="truncate text-gray-900 text-md">{data.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserItem;
