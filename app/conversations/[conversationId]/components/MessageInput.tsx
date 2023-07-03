"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}
const MessageInput: React.FC<MessageInputProps> = ({
  id,
  type,
  placeholder,
  required,
  register,
  errors,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        {...register(id, { required })}
        className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-md focus:outline-none"
      />
    </div>
  );
};

export default MessageInput;
