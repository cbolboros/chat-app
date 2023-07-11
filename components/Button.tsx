"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Loader2 } from "lucide-react";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const button: React.FC<ButtonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
}) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `
          flex
          justify-center
          rounded-md
          px-3
          py-2
          text-sm
          font-semibold
          focus-visible:outline
          focus-visible:outline-2
          focus-visible:outline-offset-2
      `,
        disabled && "opacity-20 cursor-default",
        fullWidth && "w-full",
        secondary ? "text-gray-900" : "text-white",
        danger &&
          "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
        !secondary &&
          !danger &&
          "bg-black hover:bg-opacity-5 focus-visible:outline-black",
      )}
    >
      {disabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
};

export default button;
