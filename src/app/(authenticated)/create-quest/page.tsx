import {
  CardDescription,
  CardHeader,
  CardTitle,
  LevelForm,
  LevelNavigation,
} from "@/components";

export default function CreateQuest() {
  return (
    <div className="space-y-4 p-4">
      <CardHeader>
        <CardTitle>Create a New Quest</CardTitle>
        <CardDescription>
          Fill in the details to create your quest
        </CardDescription>
      </CardHeader>
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-4">
        <LevelForm />
        <LevelNavigation />
      </div>
    </div>
  );
}
