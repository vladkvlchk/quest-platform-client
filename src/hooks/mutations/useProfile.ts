"use client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { IReactQueryError } from "@/lib/types";
import axiosInstance from "@/lib/axios";
import { getSession } from "next-auth/react";
import { IProfileRequest } from "@/lib/types/requests/IProfileRequest";
import { IProfileResponce } from "@/lib/types/responses/IProfileResponce";
import axios from "axios";

export const useProfile = (userId: string) => {
  const { toast } = useToast();

  const updateProfile = useMutation<IProfileResponce, IReactQueryError, IProfileRequest>({
    mutationFn: async (credentials: IProfileRequest) => {
      const session = await getSession();
      return axiosInstance.patchForm(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`,
        credentials,
        {
          headers:{
            Authorization: `Bearer ${session?.user.accessToken}`,
          }
        }
      );
    },
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Profile updated!",
        description: "Your profile was successfully updated.",
      });
    },
    onError() {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your profile update. Try again.",
      });
    },
  });

  const getProfile = useQuery<IProfileResponce | null>({
    queryKey: ["profile"],
    queryFn: async () => {
      const session = await getSession();
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`,
      {
        headers:{
          Authorization: `Bearer ${session?.user.accessToken}`,
        }
      }
      );
      return data;
    }
  });

  return {
    updateProfile,
    getProfile
  };
}
