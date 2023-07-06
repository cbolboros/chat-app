"use client";

import { HiChevronLeft } from "react-icons/hi";
import { useMemo } from "react";
import Link from "next/link";
import { Conversation, User } from "@prisma/client";
import userOtherUser from "@/app/hooks/useOtherUser";
import useActiveList from "@/app/hooks/useActiveList";
import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { HiEllipsisHorizontal, HiOutlineTrash } from "react-icons/hi2";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { useRouter } from "next/navigation";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const router = useRouter();
  const otherUser = userOtherUser(conversation);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? "Active" : "Offline";
  }, [conversation, isActive]);

  const deleteConversation = () => {
    axios.delete(`/api/conversations/${conversation.id}`).then(() => {
      router.push("/conversations");
      router.refresh();
    });
  };

  return (
    <>
      <div
        className="
        bg-white
        w-full
        flex
        border-b-[1px]
        sm:px-4
        py-3
        px-4
        lg:px-6
        justify-between
        items-center
        shadow-sm
      "
      >
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations"
            className="
            lg:hidden
            block
            text-black
            hover:text-gray-600
            transition
            cursor-pointer
          "
          >
            <HiChevronLeft size={32} />
          </Link>
          {/*{conversation.isGroup ? (*/}
          {/*  <AvatarGroup users={conversation.users} />*/}
          {/*) : (*/}
          {/*  <Avatar user={otherUser} />*/}
          {/*)}*/}
          <Avatar user={otherUser} />
          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <HiEllipsisHorizontal size={24} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={deleteConversation}>
              <HiOutlineTrash size={16} className="mr-2" />
              <span>Delete conversation</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default Header;
