import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <h1>
        Here will be the middleware that will redirect user on /explore-quests
        page if he is authed or on /auth page in case he is not
      </h1>
      <Button className="flex w-max">
        <Link href="/explore-quests">Explore Quests <ChevronRight className="" /></Link>
      </Button>
      <Button className="inline">
        <Link href="/auth">Auth Page <ChevronRight className="" /></Link>
      </Button>
    </div>
  );
}
