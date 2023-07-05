import Skeleton from "react-loading-skeleton";

export const FormSkeleton = () => {
  return (
    <div className="px-6 py-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full z-10">
      <Skeleton containerClassName="w-full" height={32} />
      <Skeleton containerClassName="p-2" width={24} height={24} />
    </div>
  );
};
