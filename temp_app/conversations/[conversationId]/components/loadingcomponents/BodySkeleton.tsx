import { MessageItemSkeleton } from "@/temp_app/conversations/[conversationId]/components/loadingcomponents/MessageItemSkeleton";

export const BodySkeleton = () => {
  return (
    <div className="flex-1 bg-[#f5f5f5] overflow-y-auto p-4">
      <MessageItemSkeleton />
      <MessageItemSkeleton isOwn />
      <MessageItemSkeleton />
      <MessageItemSkeleton isOwn />
      <MessageItemSkeleton />
    </div>
  );
};
