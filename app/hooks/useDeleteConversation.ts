import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Conversation } from "@prisma/client";

const useDeleteConversation = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const deleteConversation = (conversation: Conversation) => {
    setIsDeleting(true);
    axios.delete(`/api/conversations/${conversation.id}`).then(() => {
      setIsDeleting(false);
      router.push("/conversations");
      router.refresh();
    });
  };

  return { deleteConversation, isDeleting };
};
export default useDeleteConversation;
