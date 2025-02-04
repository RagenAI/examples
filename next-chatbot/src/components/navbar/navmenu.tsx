import Link from "next/link";
import { Separator } from "../ui/separator";

export function NavMenu() {
  return (
    <div className="flex h-5 items-center space-x-4 text-sm">
      <div>
        <Link href="/">All threads</Link>
      </div>
      <Separator orientation="vertical" />
      <div>
        <Link href="/create">Create new thread</Link>
      </div>
    </div>
  );
}
