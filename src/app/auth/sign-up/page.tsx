"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROUTES } from "@/lib/constants";
import Link from "next/link";
import { signup } from "../actions";
import { toast } from "@/lib/hooks/use-toast";
import { useState } from "react";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    const form = new FormData(evt.target as HTMLFormElement);
    const data = Object.fromEntries(form.entries());
    try {
      setIsLoading(true);
      await signup(data.email as string, data.password as string);
      window.location.href = ROUTES.app;
    } catch (err) {
      toast({
        description: String(err),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#fff9ee]">
      <div className="flex flex-col gap-6">
        <Card className="rounded-3xl w-[400px]">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome to squibbly 🐶</CardTitle>
            <CardDescription>
              Enter your email and password to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button isLoading={isLoading} className="w-full">
                Continue
              </Button>
              <p>
                Already have an account?{" "}
                <Link href={ROUTES.auth.signIn} className="text-primary">
                  Sign in
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
