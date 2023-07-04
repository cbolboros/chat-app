import { FullMessageType } from "@/app/types";
import Image from "next/image";
import Link from "next/link";

const MessageBody = ({ data }: { data: FullMessageType }) => {
  const parseMessageBody = () => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    let copyOfData = data.body || "";
    if (copyOfData.includes("http")) {
      copyOfData = copyOfData.replace(urlRegex, "{0}");
      return copyOfData.split(" ").map((item, index) => {
        if (item.includes("{0}")) {
          return (
            <span key={index}>
              <Link
                className="underline"
                target="_blank"
                href={data.body?.split(" ")[index] || "/"}
              >
                {data.body?.split(" ")[index]}
              </Link>
              &nbsp;
            </span>
          );
        }
        return <span key={index}>{item}&nbsp;</span>;
      });
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
