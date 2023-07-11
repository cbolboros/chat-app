"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  onInputChange: (ev: any) => void;
}
const MessageInput: React.FC<MessageInputProps> = ({
  id,
  type,
  placeholder,
  required,
  register,
  onInputChange,
}) => {
  return (
    <div className="relative w-full flex-1">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        onKeyDown={onInputChange}
        {...register(id, { required })}
        className="w-full rounded-md border-b-2 border-transparent bg-neutral-100 px-4 py-2 font-light text-black focus:border-b-black focus:outline-none"
      />
    </div>
  );
};

export default MessageInput;
