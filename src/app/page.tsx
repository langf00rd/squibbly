import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "squibble canvas",
};

export default function Page() {
  return (
    <main className="h-screen w-screen gap-3 flex items-center flex-col justify-center">
      <h1 className="font-bold text-xl">welcome to squibbly</h1>
      <Link href={ROUTES.app}>
        <Button>launch app</Button>
      </Link>
    </main>
  );
}
