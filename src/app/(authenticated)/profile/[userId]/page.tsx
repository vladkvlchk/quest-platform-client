"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

import QuestHistoryCard from "@/components/widgets/QuestHistoryCard";
import { ProfileForm } from "@/components/forms/ProfileForm";
import ProfileDescription from "@/components/widgets/ProfileDescription";
import { useProfile } from "@/hooks/mutations/useProfile";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components";
import { useQuestsHistory } from "@/hooks/mutations/useQuestsHistory";
import UserProgressListener from "@/components/atoms/UserProgressListener";
import LoadingPage from "@/components/atoms/LoadingPage";

export default function ProfilePage() {
  const { userId } = useParams();
  const [isEditingState, setIsEditingState] = useState(false);
  const {
    getProfile: { data: profileData, isLoading, refetch },
  } = useProfile(userId as string);
  const { data: questsHistoryResponse, isLoading: isQuestsHistoryLoading } =
    useQuestsHistory(userId as string);
  const { data: session } = useSession();
  const router = useRouter();

  const isOwner = session?.user.id === userId;
  useEffect(() => {
    if (!isEditingState) {
      refetch();
    }
  }, [isEditingState, refetch]);

  if (isLoading) return <LoadingPage />;

  const changeState = (isEditing: boolean) => {
    setIsEditingState(isEditing);
  };

  if (!profileData || !profileData.user) {
    return <p>Something went wrong</p>;
  }

  const onClickCard = (id: string) => router.push("/quest/" + id);

  const profileHeight = isEditingState ? "h-[390px]" : "h-[358px]";
  return (
  <>
    <CardHeader>
      <CardTitle>{isOwner ? "My profile" : "Profile"}</CardTitle>
    </CardHeader>
      <div
        className={`${profileHeight} shadow-[10px_13px_7.5px_rgba(0,0,0,0.25)] mx-5 flex flex-row rounded-[40px] border px-9`}
      >
        <div className={"pt-6 w-full"}>
          {isEditingState && isOwner ? (
            <ProfileForm
              userId={userId as string}
              defaultValues={profileData.user}
              isEditing={isEditingState}
              onSave={() => changeState(false)}
            />
          ) : (
            <ProfileDescription
              isOwner={isOwner}
              {...profileData.user}
              onEditClick={() => changeState(true)}
            />
          )}
        </div>
      </div>
      <CardContent className="my-4">
        <UserProgressListener />
      </CardContent>
      <CardHeader>
        <CardTitle>Completed quests</CardTitle>
        <CardDescription>
          completed -{" "}
          {questsHistoryResponse
            ? questsHistoryResponse.quest_history.length
            : "0"}
        </CardDescription>
      </CardHeader>
      <div className={"grid grid-cols-5 gap-x-5 gap-y-6 pb-6 mx-5"}>
        {isQuestsHistoryLoading && <CardTitle>Loading...</CardTitle>}
        {!questsHistoryResponse && !isQuestsHistoryLoading && <CardDescription>Something went wrong</CardDescription>}
        {questsHistoryResponse && questsHistoryResponse.quest_history.length === 0 && <CardDescription>No quests completed</CardDescription>}
        {questsHistoryResponse && questsHistoryResponse.quest_history && [...questsHistoryResponse.quest_history].reverse().map((quest) => {
          return(
            <div key={quest.quest_id} onClick={() => onClickCard(`${quest.quest_id}`)}>
              <QuestHistoryCard {...quest}/>
            </div>
          )
          })}
      </div>
    </>
  );
}
