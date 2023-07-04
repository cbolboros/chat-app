"use client";

import useConversation from "@/app/hooks/useConversation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "@/app/conversations/[conversationId]/components/MessageInput";
import { CldUploadButton } from "next-cloudinary";
import { useEffect } from "react";
import { pusherClient } from "@/lib/pusher";
import { throttle } from "lodash";

const Form = () => {
  const { conversationId } = useConversation();

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
    pusherClient.subscribe(conversationId);
    return () => {
      pusherClient.unsubscribe(conversationId);
    };
  }, [conversationId]);

  return (
    <div className="px-6 py-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full z-10">
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
