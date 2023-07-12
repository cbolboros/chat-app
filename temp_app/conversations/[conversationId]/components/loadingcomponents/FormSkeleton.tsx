import Skeleton from "react-loading-skeleton";

export const FormSkeleton = () => {
  return (
    <div className="z-10 flex w-full items-center gap-2 border-t bg-white px-6 py-4 lg:gap-4">
      <Skeleton containerClassName="w-full" height={32} />
      <Skeleton containerClassName="p-2" width={24} height={24} />
    </div>
  );
};
