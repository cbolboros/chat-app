import { FullMessageType } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import YouTube from "react-youtube";
import { useRef } from "react";
import Skeleton from "react-loading-skeleton";

interface MessageBodyProps {
  data: FullMessageType;
  bottomRef?: React.RefObject<HTMLDivElement>;
}

const MessageBody: React.FC<MessageBodyProps> = ({ data, bottomRef }) => {
  const skeletonRef = useRef<HTMLSpanElement>(null);
  const iframeRef = useRef<HTMLSpanElement>(null);
  const getYoutubeId = (url: string) => {
    const youtubeRegex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=)|youtu\.be\/)([\w-]{11})(?:\S+)?$/;
    const match = youtubeRegex.exec(url);
    return match?.[1];
  };

  const parseHttpLinks = () => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const youtubeLinks =
      data.body
        ?.match(urlRegex)
        ?.filter((link) => link.includes("www.youtube.com")) || [];
    const bodyItems =
      data.body?.split(" ").map((item, index) => {
        if (item.match(urlRegex)) {
          return (
            <span key={index}>
              <Link
                className="text-sky-600 underline hover:text-sky-900"
                target="_blank"
                href={item}
              >
                {item}
              </Link>
              &nbsp;
            </span>
          );
        }
        return <>{item}&nbsp;</>;
      }) || [];

    return { bodyItems, youtubeLinks };
  };

  const parseMessageBody = () => {
    const { bodyItems, youtubeLinks } = parseHttpLinks();
    const iFrameOptions = {
      width: "100%",
      height: "100%",
    };

    if (youtubeLinks.length > 0) {
      bodyItems.push(
        <span
          key={getYoutubeId(youtubeLinks[youtubeLinks.length - 1])}
          ref={skeletonRef}
        >
          <Skeleton height={300} className="w-full" />
        </span>,
      );
      bodyItems.push(
        <span
          ref={iframeRef}
          className="block hidden h-full w-full"
          key={getYoutubeId(youtubeLinks[youtubeLinks.length - 1]) + "1"}
        >
          <YouTube
            className="aspect-video max-w-full"
            opts={iFrameOptions}
            onReady={() => {
              iframeRef?.current?.classList.remove("hidden");
              skeletonRef?.current?.classList.add("hidden");
              bottomRef?.current?.scrollIntoView();
            }}
            videoId={getYoutubeId(youtubeLinks[youtubeLinks.length - 1])}
          />
        </span>,
      );
    } else if (data.image) {
      return (
        <Image
          alt="Image"
          height="100"
          width="100"
          src={data.image}
          className="cursor-pointer transition object-fit translate"
        />
      );
    }

    return (
      <div key={Math.random()} className="break-words">
        {bodyItems}
      </div>
    );
  };

  return (
    <div className="w-full font-light text-gray-800">{parseMessageBody()}</div>
  );
};

export default MessageBody;
