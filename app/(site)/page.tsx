import Image from "next/image";
import { InputForm } from "@/app/(site)/components/AuthorizationForm";

export default function Home() {
  return (
    <div className="flex flex-col justify-center bg-gray-100 min-h-[100vh] sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src="/images/logo.svg"
          alt="Logo"
          height="48"
          width="48"
          className="mx-auto"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Chatter
        </h2>
      </div>
      <InputForm />
    </div>
  );
}
