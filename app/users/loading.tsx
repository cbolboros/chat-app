import Skeleton from "react-loading-skeleton";

function Loading() {
  return (
    <aside className="fixed inset-y-0 left-0 block w-full select-none overflow-y-auto border-r border-gray-200 pb-20 lg:left-28 lg:block lg:w-80 lg:pb-0">
      <div className="h-full px-5">
        <div className="flex-col">
          <div className="py-4 text-2xl font-bold text-neutral-800">Users</div>
          <div className="w-full flex items-center space-x-3 bg-white p-3">
            <Skeleton circle width={32} height={32} />
            <div className="flex-1">
              <Skeleton width={"100%"} height={"100%"} />
            </div>
          </div>
          <div className="w-full flex items-center space-x-3 bg-white p-3">
            <Skeleton circle width={32} height={32} />
            <div className="flex-1">
              <Skeleton width={"100%"} height={"100%"} />
            </div>
          </div>
          <div className="w-full flex items-center space-x-3 bg-white p-3">
            <Skeleton circle width={32} height={32} />
            <div className="flex-1">
              <Skeleton width={"100%"} height={"100%"} />
            </div>
          </div>
          <div className="w-full flex items-center space-x-3 bg-white p-3">
            <Skeleton circle width={32} height={32} />
            <div className="flex-1">
              <Skeleton width={"100%"} height={"100%"} />
            </div>
          </div>
          <div className="w-full flex items-center space-x-3 bg-white p-3">
            <Skeleton circle width={32} height={32} />
            <div className="flex-1">
              <Skeleton width={"100%"} height={"100%"} />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Loading;