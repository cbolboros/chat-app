import { FullMessageType } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import YouTube from "react-youtube";

interface MessageBodyProps {
  data: FullMessageType;
  bottomRef?: React.RefObject<HTMLDivElement>;
}

const MessageBody: React.FC<MessageBodyProps> = ({ data, bottomRef }) => {
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
              <Link className="underline" target="_blank" href={item}>
                {item}
              </Link>
              &nbsp;
            </span>
          );
        }
        return <span key={index}>{item}&nbsp;</span>;
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
        <YouTube
          key="youtube-video"
          className="max-w-full aspect-video"
          opts={iFrameOptions}
          onReady={() => {
            bottomRef?.current?.scrollIntoView();
          }}
          videoId={getYoutubeId(youtubeLinks[youtubeLinks.length - 1])}
        />
      );
    } else if (data.image) {
      return (
        <Image
          alt="Image"
          height="100"
          width="100"
          src={data.image}
          className="object-fit cursor-pointer transition translate"
        />
      );
    }

    return <>{bodyItems}</>;
  };

  return (
    <div className="w-full text-gray-800 font-light">{parseMessageBody()}</div>
  );
};

export default MessageBody;
