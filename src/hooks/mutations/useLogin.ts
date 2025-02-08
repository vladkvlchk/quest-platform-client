"use client";

import { useMutation } from "@tanstack/react-query";
import { SignInResponse, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { ILoginRequest, ILogInResponse, IReactQueryError } from "@/lib/types";
import axiosInstance from "@/lib/axios";

export const useLogin = () => {
  const router = useRouter();

  return useMutation<ILogInResponse, IReactQueryError, ILoginRequest>({
    mutationFn: async (credentials: ILoginRequest) => {
      return axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login/email`,
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
          console.error("Something was wrong! ", value);
        }
      });
    },
  });
};
