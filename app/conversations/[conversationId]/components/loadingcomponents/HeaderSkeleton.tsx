import Skeleton from "react-loading-skeleton";

export const HeaderSkeleton = () => {
  return (
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
        <Skeleton circle width={32} height={32} />
        <div className="flex flex-col">
          <Skeleton width={200} />
          <Skeleton width={100} />
        </div>
      </div>
    </div>
  );
};
