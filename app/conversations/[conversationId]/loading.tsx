import { HeaderSkeleton } from "@/app/conversations/[conversationId]/components/loadingcomponents/HeaderSkeleton";
import { BodySkeleton } from "@/app/conversations/[conversationId]/components/loadingcomponents/BodySkeleton";
import { FormSkeleton } from "@/app/conversations/[conversationId]/components/loadingcomponents/FormSkeleton";

export default function Loading() {
  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col overflow-hidden">
        <HeaderSkeleton />
        <BodySkeleton />
        <FormSkeleton />
      </div>
    </div>
  );
}
