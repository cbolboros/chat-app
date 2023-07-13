import Skeleton from "react-loading-skeleton";

function Loading() {
  return (
    <aside className="fixed inset-y-0 left-0 block w-full select-none overflow-y-auto border-r border-gray-200 pb-20 lg:left-28 lg:block lg:w-80 lg:pb-0">
      <div className="h-full px-5">
        <div className="flex-col">
          <div className="py-4 text-2xl font-bold text-neutral-800">Users</div>
          <Skeleton count={5} height={40} />
        </div>
      </div>
    </aside>
  );
}

export default Loading;
