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
      await signup({
        email: data.email as string,
        password: data.password as string,
        first_name: data.first_name as string,
        last_name: data.last_name as string,
      });
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
              <div className="flex gap-3">
                <div>
                  <Label htmlFor="first_name">First name</Label>
                  <Input id="first_name" name="first_name" required />
                </div>
                <div>
                  <Label htmlFor="last_name">Last name</Label>
                  <Input id="last_name" name="last_name" required />
                </div>
              </div>
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
