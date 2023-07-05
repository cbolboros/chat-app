import { FullMessageType } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import YouTube from "react-youtube";

const MessageBody = ({ data }: { data: FullMessageType }) => {
  const getYoutubeId = (url: string) => {
    const youtubeRegex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=)|youtu\.be\/)([\w-]{11})(?:\S+)?$/;
    const match = youtubeRegex.exec(url);
    return match?.[1];
  };

  const parseMessageBody = () => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    let copyOfData = data.body || "";
    if (copyOfData.includes("http")) {
      copyOfData = copyOfData.replace(urlRegex, "{0}");
      const youtubeLinks: string[] = [];
      const bodyItems = copyOfData.split(" ").map((item, index) => {
        let items = data.body?.split(" ") || [];
        if (item.includes("{0}")) {
          if (items[index].includes("www.youtube.com")) {
            youtubeLinks.push(items[index]);
          }
          return (
            <span key={index}>
              <Link
                className="underline"
                target="_blank"
                href={items[index] || "/"}
              >
                {items[index]}
              </Link>
              &nbsp;
            </span>
          );
        }
        return <span key={index}>{item}&nbsp;</span>;
      });
      if (youtubeLinks.length > 0) {
        bodyItems.push(<YouTube videoId={getYoutubeId(youtubeLinks[0])} />);
      }
      return bodyItems;
    }
    if (data.image) {
      return (
        <Image
          alt="Image"
          height="100"
          width="100"
          src={data.image}
          className="
            object-fit
            cursor-pointer
            transition
            translate
          "
        />
      );
    }
    return data.body;
  };
  return <div>{parseMessageBody()}</div>;
};

export default MessageBody;
