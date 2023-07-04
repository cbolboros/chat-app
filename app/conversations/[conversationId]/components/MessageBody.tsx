import { FullMessageType } from "@/app/types";
import Link from "next/link";
import Image from "next/image";

const MessageBody = ({ data }: { data: FullMessageType }) => {
  const parseMessageBody = () => {
    if (data.body && data.body.startsWith("http")) {
      return (
        <Link target="_blank" className="underline" href={data.body}>
          {data.body}
        </Link>
      );
    }
    if (data.image) {
      return (
        <Image
          alt="Image"
          height="100"
          width="100"
          src={data.image}
          className="
            object-cover
            cursor-pointer
            hover:scale-110
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
