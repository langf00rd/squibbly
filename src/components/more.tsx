"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useAuth from "@/lib/hooks/use-auth";
import { MoreVertical } from "lucide-react";
import type React from "react";
import ArtifactsList from "./artifacts-list";
import { Button } from "./ui/button";

export default function More() {
  const { user, signUserOut, isSigningOut } = useAuth();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="secondary">
          <MoreVertical />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="m-3 space-y-5 max-h-[500px] overflow-scroll">
        <p className="text-sm">
          <span className="font-semibold">
            {user?.first_name} {user?.last_name}
          </span>{" "}
          <br /> {user?.email}
        </p>
        <Button
          size="sm"
          className="w-full"
          isLoading={isSigningOut}
          onClick={signUserOut}
        >
          Sign Out
        </Button>
        <hr />
        <ArtifactsList />
      </PopoverContent>
    </Popover>
  );
}
