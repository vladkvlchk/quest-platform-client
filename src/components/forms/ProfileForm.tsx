"use client";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  ControlledInput,
  ControlledTextarea,
  UploadImageForm
} from "@/components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileFormShema, TProfileFormData } from "@/lib/validation/ProfileValidation";
import { useState } from "react";
import { useProfile } from "@/hooks/mutations/useProfile";


export function ProfileForm(props: {
  isEditing: boolean,
  onSave: () => void,
  userId: string,
  defaultValues: TProfileFormData
}) {
  const defaultValues = props.defaultValues;
  const [uploadedImage, setUploadedImage] = useState<File | undefined>();
  const { handleSubmit, control } = useForm<TProfileFormData>({
    resolver: zodResolver(ProfileFormShema),
    defaultValues
  });

  const { updateProfile: {mutateAsync, isPending } } = useProfile(props.userId);

  const onSubmit = async (data: TProfileFormData) => {
    try {
      const isNameEmpty = !data.name?.trim();
      const isAboutMeEmpty = !data.about_me?.trim();
      const isImageEmpty = !uploadedImage;

      if (isNameEmpty && isAboutMeEmpty && isImageEmpty) {
        props.onSave();
        return;
      }

      if(data.name === defaultValues.name && data.about_me === defaultValues.about_me) {
        props.onSave();
        return;
      }

      await mutateAsync({
        name: isNameEmpty ? undefined : data!.name!.trim(),
        about_me: isAboutMeEmpty ? undefined : data!.about_me!.trim(),
        profile_picture: uploadedImage
      });

      props.onSave();
    } catch (error) {
      console.error("Something went wrong!", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={"flex"}>
        <div className={"w-1/3 pt-24 aspect-square"}>
          <UploadImageForm
            onImagesChange={function (files: File[]): void {
              setUploadedImage(files[0]);
            }}
            maxImages={1}
          />
        </div>
        <div className={"w-full pl-6"}>
          <Card className={"mr-36"}>
              <CardDescription className={"px-6 pt-6"}>
                Make changes to your account here. Click save when you&#39;re done.
              </CardDescription>
            <CardContent className="space-y-4 pt-4">
              <ControlledInput
                  name="name"
                  control={control}
                  {
                    ...{
                      "defaultValue": `${defaultValues.name}`,
                    }
                  }
                  label="Name"
                  placeholder="Morty Smith"
              />
            </CardContent>
          </Card>
          <ControlledTextarea
              {
                ...{
                  "className": `resize-none`,
                  "defaultValue": `${defaultValues.about_me ? defaultValues.about_me : ""}`,
                }
              }
              name="about_me"
              control={control}
              label="About me"
              placeholder="Tell us about yourself"
          />
          <div className={"flex items-end justify-end gap-2"}>
            <Button onClick={() => props.onSave()} className={"bg-white text-[#7C7878] text-decoration-line: underline hover:bg-black hover:text-white"}>
              Cancel
            </Button>
            <Button type={"submit"} className={"mt-8"} disabled={isPending}>Save changes</Button>
          </div>
        </div>
      </div>
    </form>
  );
}

