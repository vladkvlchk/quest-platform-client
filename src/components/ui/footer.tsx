import { Copyright } from "lucide-react";

export default function Footer() {
  return (
      <div className="flex pb-4 justify-center items-center w-full">
        <h2 className="flex gap-2">
          <Copyright /> Multiplayer Virtual Pathfinder. All rights protected.
        </h2>
      </div>
  );
}

