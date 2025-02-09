"use client";

import { useMutation } from "@tanstack/react-query";
import { SignInResponse, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { ISignUpRequest, ISignUpResponse, IReactQueryError } from "@/lib/types";
import axiosInstance from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";

export const useSignUp = () => {
  const router = useRouter();
  const { toast } = useToast();

  return useMutation<ISignUpResponse, IReactQueryError, ISignUpRequest>({
    mutationFn: async (credentials: ISignUpRequest) => {
      return axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup/email`,
        credentials
      );
    },
    onSuccess: (_, userData) => {
      signIn("credentials", {
        email: userData.email,
        password: userData.password,
        redirect: false,
      }).then((value: SignInResponse | undefined) => {
        if (value?.ok) {
          router.push("/explore-quests");
        } else {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description:
              "There was a problem with your sign-up request. Try again.",
          });
        }
      });
    },
    onError() {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "There was a problem with your sign-up request. Try again.",
      });
    },
  });
};
