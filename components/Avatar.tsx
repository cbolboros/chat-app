"use client";

import { User } from "@prisma/client";

import Image from "next/image";
import useActiveList from "@/temp_app/hooks/useActiveList";

interface AvatarProps {
  user?: User;
  width?: number;
  height?: number;
}

const Avatar: React.FC<AvatarProps> = ({ user, width, height }) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;

  const avatarWidth = Math.round((width || 32) / 4);
  const avatarHeight = Math.round((width || 32) / 4);

  return (
    <>
      <div className="relative inline-block h-fit overflow-hidden">
        <Image
          className="rounded-full"
          src={user?.image || "/images/placeholder.jpg"}
          alt="Avatar"
          width={width || 32}
          height={height || 32}
        />
        {isActive ? (
          <span
            style={{
              width: `${avatarWidth}px`,
              height: `${avatarHeight}px`,
            }}
            className={`
            absolute
            block
            rounded-full
            bg-green-500
            ring-2
            ring-white
            bottom-0
            right-0
          `}
          />
        ) : null}
      </div>
    </>
  );
};

export default Avatar;
