"use client";

import useConversation from "@/app/hooks/useConversation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "@/app/conversations/[conversationId]/components/MessageInput";
import { CldUploadButton } from "next-cloudinary";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { throttle } from "lodash";
import { AnimatePresence, motion } from "framer-motion";
import Avatar from "@/components/Avatar";
import TypingIndicator from "@/app/conversations/[conversationId]/components/TypingIndicator";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";

const Form = () => {
  const { conversationId } = useConversation();
  const session = useSession();

  const [userTyping, setUserTyping] = useState<User | null>(null);
  const isNotOwnUserTyping = userTyping?.email !== session.data?.user?.email;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  const onInputChange = throttle(() => {
    axios.post("/api/messages/istyping", {
      conversationId,
    });
  }, 400);

  useEffect(() => {
    // @ts-ignore
    let typingTimer;
    pusherClient.subscribe(conversationId);
    const userTypingHandler = (user: User) => {
      setUserTyping(user);
      // @ts-ignore
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => setUserTyping(null), 1000);
    };
    pusherClient.bind("user:typing", userTypingHandler);
    return () => {
      // @ts-ignore
      clearTimeout(typingTimer);
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("user:typing", userTypingHandler);
    };
  }, [conversationId]);

  return (
    <div className="px-6 py-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full z-10">
      <AnimatePresence>
        {userTyping && isNotOwnUserTyping && (
          <motion.div
            layout
            initial={{
              y: 30,
            }}
            animate={{
              y: 0,
            }}
            exit={{
              y: 50,
            }}
            className="absolute lg:pl-96 left-28 z-10 bottom-0 w-fit flex items-center gap-2"
          >
            <Avatar user={userTyping!} />
            <span className="text-gray-500 text-sm">{userTyping?.name}</span>
            <TypingIndicator />
          </motion.div>
        )}
      </AnimatePresence>
      <CldUploadButton
        options={{
          maxFiles: 1,
        }}
        onUpload={handleUpload}
        uploadPreset="chat-app"
      >
        <HiPhoto size={30} />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          onInputChange={onInputChange}
          register={register}
          errors={errors}
          required
          placeholder="Type a message"
        />
        <button
          type="submit"
          className="rounded-lg hover:bg-neutral-100 p-2 cursor-pointer transition"
        >
          <HiPaperAirplane size={24} />
        </button>
      </form>
    </div>
  );
};

export default Form;
