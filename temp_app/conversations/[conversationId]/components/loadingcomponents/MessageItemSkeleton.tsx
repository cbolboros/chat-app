import Skeleton from "react-loading-skeleton";

interface MessageItemSkeletonProps {
  isOwn?: boolean;
}

export const MessageItemSkeleton: React.FC<MessageItemSkeletonProps> = ({
  isOwn,
}) => {
  return (
    <div className={`flex gap-3 ${isOwn ? "justify-end" : ""}`}>
      <Skeleton circle width={32} height={32} />
      <div className="flex flex-col">
        <Skeleton width={100} height={10} />
        <Skeleton width={50} height={20} />
      </div>
    </div>
  );
};
