import { HeaderSkeleton } from "@/temp_app/conversations/[conversationId]/components/loadingcomponents/HeaderSkeleton";
import { BodySkeleton } from "@/temp_app/conversations/[conversationId]/components/loadingcomponents/BodySkeleton";
import { FormSkeleton } from "@/temp_app/conversations/[conversationId]/components/loadingcomponents/FormSkeleton";

export default function Loading() {
  return (
    <div className="h-full lg:pl-80">
      <div className="flex h-full flex-col overflow-hidden">
        <HeaderSkeleton />
        <BodySkeleton />
        <FormSkeleton />
      </div>
    </div>
  );
}
