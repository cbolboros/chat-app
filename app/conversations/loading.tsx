import Skeleton from "react-loading-skeleton";

export default function Loading() {
  return (
    <div className="px-5">
      <div className="flex justify-between mb-4 pt-4">
        <div className="text-2xl font-bold text-neutral-800">Messages</div>
        <div className="rounded-full p-2 bg-gray-100 text-black cursor-pointer hover:bg-gray-200 transition">
          <Skeleton circle={true} height={20} width={20} />
        </div>
      </div>
      <div
        className="
          w-full
          relative
          flex
          items-center
          space-x-3
          bg-white
          p-3
          hover:bg-neutral-100
          rounded-lg
          transition
          cursor-pointer
        "
      >
        <Skeleton circle={true} height={40} width={40} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <Skeleton width={100} />
          </div>
        </div>
      </div>
      <div
        className="
          w-full
          relative
          flex
          items-center
          space-x-3
          bg-white
          p-3
          hover:bg-neutral-100
          rounded-lg
          transition
          cursor-pointer
        "
      >
        <Skeleton circle={true} height={40} width={40} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <Skeleton width={100} />
          </div>
        </div>
      </div>
      <div
        className="
          w-full
          relative
          flex
          items-center
          space-x-3
          bg-white
          p-3
          hover:bg-neutral-100
          rounded-lg
          transition
          cursor-pointer
        "
      >
        <Skeleton circle={true} height={40} width={40} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <Skeleton width={100} />
          </div>
        </div>
      </div>
    </div>
  );
}
