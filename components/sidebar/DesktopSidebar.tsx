"use client";
import useRoutes from "@/app/hooks/useRoutes";
import DesktopItem from "@/components/sidebar/DesktopItem";
import { signOut } from "next-auth/react";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { User } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Avatar from "@/components/Avatar";

interface DesktopSidebarProps {
  currentUser?: User;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes();

  return (
    <div
      className="
        hidden
        lg:fixed
        lg:inset-y-0
        lg:left-0
        lg:z-40
        lg:w-30
        xl:px-6
        lg:overflow-y-auto
        lg:bg-white
        lg:border-r-[1px]
        lg:pb-4
        lg:flex
        lg:flex-col
        justify-between
        items-center
      "
    >
      <nav className="mt-4 flex flex-col justify-between">
        <ul role="list" className="flex flex-col items-center space-y-1">
          {routes.map((item) => (
            <DesktopItem
              key={item.label}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={item.active}
            />
          ))}
        </ul>
      </nav>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>
            <Avatar width={48} height={48} user={currentUser} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" sideOffset={15} className="w-56">
          <DropdownMenuItem
            onClick={() => {
              signOut();
            }}
          >
            <HiArrowLeftOnRectangle size={16} className="mr-2" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DesktopSidebar;
