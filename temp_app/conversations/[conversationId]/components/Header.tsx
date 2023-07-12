"use client";

import { HiChevronLeft } from "react-icons/hi";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Conversation, User } from "@prisma/client";
import useActiveList from "@/temp_app/hooks/useActiveList";
import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { HiEllipsisHorizontal, HiOutlineTrash } from "react-icons/hi2";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { AnimatePresence, motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import useMeasure from "react-use-measure";
import { Loader2 } from "lucide-react";
import useDeleteConversation from "@/temp_app/hooks/useDeleteConversation";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
  session?: Session;
}

const Header: React.FC<HeaderProps> = ({ conversation, session }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  let [ref, { height }] = useMeasure();
  const otherUser = conversation.users.find(
    (user) => user.email !== session?.user?.email,
  );

  const { deleteConversation, isDeleting } = useDeleteConversation();

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? "Active" : "Offline";
  }, [conversation, isActive]);

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
        <div className="flex items-center gap-3">
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
            <HiChevronLeft className="h-4 w-4 lg:h-8 lg:w-8" />
          </Link>
          {/*{conversation.isGroup ? (*/}
          {/*  <AvatarGroup users={conversation.users} />*/}
          {/*) : (*/}
          {/*  <Avatar user={otherUser} />*/}
          {/*)}*/}
          <Avatar user={otherUser} />
          <div className="flex flex-col">
            <div className="text-xs lg:text-sm">
              {conversation.name || otherUser?.name}
            </div>
            <div className="text-xs font-light text-neutral-500 lg:text-sm">
              {statusText}
            </div>
          </div>
        </div>
        <div className="md:hidden">
          <Dialog.Root onOpenChange={setOpen}>
            <Dialog.Trigger className="rounded p-2 hover:bg-gray-200">
              <HiEllipsisHorizontal className="h-4 w-4" />
            </Dialog.Trigger>

            <AnimatePresence>
              {open && (
                <Dialog.Portal forceMount>
                  <Dialog.Overlay className="fixed inset-0 z-20 bg-black/50" />
                  <Dialog.Content
                    ref={ref}
                    asChild
                    className="fixed left-0 z-30 flex w-full justify-center rounded-md bg-white p-4 text-gray-800 shadow"
                  >
                    <motion.div
                      initial={{
                        top: "100%",
                      }}
                      animate={{
                        top: `calc(100% - ${height}px)`,
                      }}
                      exit={{
                        top: "100%",
                      }}
                    >
                      <Button
                        disabled={isDeleting}
                        variant="destructive"
                        className="w-full"
                        onClick={() => deleteConversation(conversation)}
                      >
                        {isDeleting ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <HiOutlineTrash className="mr-2 h-4 w-4" />
                        )}
                        <span>Delete conversation</span>
                      </Button>
                    </motion.div>
                  </Dialog.Content>
                </Dialog.Portal>
              )}
            </AnimatePresence>
          </Dialog.Root>
        </div>
        <div className="hidden md:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <HiEllipsisHorizontal size={24} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  deleteConversation(conversation);
                }}
              >
                <HiOutlineTrash size={16} className="mr-2" />
                <span>Delete conversation</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};

export default Header;
