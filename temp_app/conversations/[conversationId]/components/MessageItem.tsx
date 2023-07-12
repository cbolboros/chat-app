"use client";

import { FullMessageType } from "@/temp_app/types";
import clsx from "clsx";
import Avatar from "@/components/Avatar";
import { HiMiniEye, HiOutlineCheckCircle } from "react-icons/hi2";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format, isToday } from "date-fns";
import MessageBody from "@/temp_app/conversations/[conversationId]/components/MessageBody";
import { Session } from "next-auth";

interface MessageItemProps {
  data: FullMessageType;
  isLast?: boolean;
  isPreviousSameUser?: boolean;
  isNextSameUser?: boolean;
  isMessageSameMinute?: boolean;
  bottomRef?: React.RefObject<HTMLDivElement>;
  session: Session;
}
const MessageItem: React.FC<MessageItemProps> = ({
  data,
  isLast,
  isPreviousSameUser,
  isNextSameUser,
  isMessageSameMinute,
  bottomRef,
  session,
}) => {
  const isOwnMessage = session?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");
  const container = clsx(
    "flex gap-3",
    isNextSameUser && "mb-0.5",
    !isNextSameUser && "pb-1",
    isOwnMessage && "justify-end",
    !isMessageSameMinute && "pt-2",
  );
  const body = clsx("flex flex-col max-w-[75%]", isOwnMessage && "items-end");
  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwnMessage ? "bg-[#e8ebfa] ml-auto" : "bg-white",
    data.image ? "rounded-md p-0" : "rounded-md py-2 px-3",
  );

  const formatDate = (date: Date) => {
    return format(date, isToday(date) ? "p" : "EEEE p");
  };

  return (
    <div className={container}>
      {!isPreviousSameUser && !isOwnMessage && <Avatar user={data.sender} />}
      {isPreviousSameUser && !isOwnMessage && <div className="w-8"></div>}
      <div className={body}>
        {!isPreviousSameUser && (
          <div className="mb-1 flex items-center gap-2">
            {!isOwnMessage && (
              <div className="truncate text-xs text-gray-500">
                {data.sender.name}
              </div>
            )}
            <div className="text-xs text-gray-500">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>{formatDate(new Date(data.createdAt))}</div>
                </TooltipTrigger>
                <TooltipContent align="end">
                  <p>
                    {format(
                      new Date(data.createdAt),
                      "EEEE, MMMM dd, y hh:mm a",
                    )}
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="h-4 w-4">
              <div className="invisible h-4 w-4"></div>
            </div>
          </div>
        )}
        {isPreviousSameUser && (
          <div className="flex items-center gap-2">
            {!isMessageSameMinute && !isOwnMessage && (
              <div className="text-xs text-gray-500">{data.sender.name}</div>
            )}
            {!isMessageSameMinute && (
              <div className="text-xs text-gray-500">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>{formatDate(new Date(data.createdAt))}</div>
                  </TooltipTrigger>
                  <TooltipContent align="end">
                    <p>
                      {format(
                        new Date(data.createdAt),
                        "EEEE, MMMM dd, y hh:mm a",
                      )}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
            <div className="h-4 w-4">
              <div className="invisible h-4 w-4"></div>
            </div>
          </div>
        )}
        <div className="flex w-full items-end gap-1">
          <div className={message}>
            {/*      <ImageModal src={data.image} isOpen={imageModalOpen} onClose={() => setImageModalOpen(false)} />*/}
            <MessageBody data={data} bottomRef={bottomRef} />
          </div>
          {!isLast && isOwnMessage && (
            <div className="h-4 w-4">
              <div className="invisible h-4 w-4"></div>
            </div>
          )}
          {isLast && isOwnMessage && seenList.length === 0 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <HiOutlineCheckCircle className="text-slate-400" />
                </div>
              </TooltipTrigger>
              <TooltipContent align="end">
                <p>Sent</p>
              </TooltipContent>
            </Tooltip>
          )}
          {isLast && isOwnMessage && seenList.length > 0 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-4">
                  <HiMiniEye className="text-slate-400" />
                </div>
              </TooltipTrigger>
              <TooltipContent align="end">
                <p>Seen</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
