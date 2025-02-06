"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateQuestForm } from "@/components/forms/CreateQuestForm";

export default function CreateQuest() {
  return (
    <div className="space-y-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Create a New Quest</CardTitle>
          <CardDescription>
            Fill in the details to create your quest
          </CardDescription>
        </CardHeader>
        <CreateQuestForm />
      </Card>
    </div>
  );
}
