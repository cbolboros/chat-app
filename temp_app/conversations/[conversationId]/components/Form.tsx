"use client";

import useConversation from "@/temp_app/hooks/useConversation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "@/temp_app/conversations/[conversationId]/components/MessageInput";
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
    return () => {
      // @ts-ignore
      pusherClient.unsubscribe(conversationId);
    };
  }, [conversationId]);

  return (
    <div className="z-10 flex w-full items-center gap-2 border-t bg-white p-4 lg:gap-4">
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
        className="flex w-full items-center gap-2 lg:gap-4"
      >
        <MessageInput
          id="message"
          onInputChange={onInputChange}
          register={register}
          errors={errors}
          required
          placeholder="Type a new message"
        />
        <button
          type="submit"
          className="cursor-pointer rounded-lg transition hover:bg-neutral-100"
        >
          <HiPaperAirplane size={24} />
        </button>
      </form>
    </div>
  );
};

export default Form;
