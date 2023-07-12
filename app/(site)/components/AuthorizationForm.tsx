"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Button from "@/components/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useCallback, useEffect, useState } from "react";
import AuthSocialButton from "@/app/(site)/components/AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Variant = "LOGIN" | "REGISTER";

export function InputForm() {
  const session = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const FormSchema = z.object({
    name: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .optional()
      .refine((value) => {
        if (variant === "LOGIN" || value) {
          return true;
        }
        if (!value && variant === "REGISTER") {
          return false;
        }
      }, "Required"),
    email: z.string().email(),
    password: z.string().min(5, { message: "Minimum 5 characters." }),
  });

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [router, session?.status]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, {
      redirect: false,
    })
      .then((response) => {
        if (response?.error) {
          toast({
            variant: "destructive",
            title: "Sign In",
            description: response.error,
          });
        }
        if (response?.ok && !response?.error) {
          toast({
            description: "Logged in!",
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() =>
          signIn("credentials", {
            ...data,
            redirect: false,
          }),
        )
        .then((response) => {
          if (response?.error) {
            toast({
              variant: "destructive",
              title: "Sign Up",
              description: response.error,
            });
          }
          if (response?.ok && !response?.error) {
            toast({
              description: "User created!",
            });
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((response) => {
          if (response?.error) {
            if (response.error === "User not found.") {
              form.setError("email", {
                message: response.error,
              });
            } else if (response.error === "Wrong password.") {
              form.setError("password", {
                message: response.error,
              });
            } else {
              toast({
                variant: "destructive",
                title: "Sign In",
                description: response.error,
              });
            }
          }
          if (response?.ok && !response?.error) {
            toast({
              description: "Logged in!",
            });
            router.push("/users");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            {variant === "REGISTER" && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem id={"name"}>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign In" : "Sign Up"}
            </Button>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">Or with</span>
                </div>
              </div>
              <div className="mt-6 flex gap-2">
                <AuthSocialButton
                  icon={BsGithub}
                  onClick={() => socialAction("github")}
                />
                <AuthSocialButton
                  icon={BsGoogle}
                  onClick={() => socialAction("google")}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-center gap-2 px-2 text-sm text-gray-500">
              <div>
                {variant === "LOGIN"
                  ? "New to Chatter?"
                  : "Already have an account?"}
              </div>
              <div onClick={toggleVariant} className="cursor-pointer underline">
                {variant === "LOGIN" ? "Create an account" : "Sign in"}
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
