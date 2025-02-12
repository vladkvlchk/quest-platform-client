import { Copyright, Github } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center w-full py-4 text-gray-300 text-sm border-t border-gray-800">
      <div className="flex items-center gap-2">
        <Copyright size={16} />
        <span>2025 Multiplayer Virtual Pathfinder. All rights reserved.</span>
      </div>

      <div className="flex gap-4 mt-2">
        <Link
          href="https://github.com/vladkvlchk/quest-platform-client"
          target="_blank"
          className="flex items-center gap-2 hover:text-white transition"
        >
          <Github size={16} />
          GitHub
        </Link>

        <Link href="https://github.com/vladkvlchk" className="hover:text-white transition">
          Contributor 1
        </Link>

        <Link href="https://github.com/ReGeNss" className="hover:text-white transition">
          Contributor 2
        </Link>
      </div>
    </footer>
  );
}
