"use client";

import { DrawingProvider } from "@/lib/contexts/drawing-context";
import { PropsWithChildren } from "react";
import { Toaster } from "./ui/toaster";

export default function Providers(props: PropsWithChildren) {
  return (
    <DrawingProvider>
      <Toaster />
      {props.children}
    </DrawingProvider>
  );
}
