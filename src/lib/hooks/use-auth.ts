"use client";

import { useEffect, useState } from "react";
import { getUser, signOut } from "../actions/auth";
import { User } from "../generics";
import { toast } from "./use-toast";

export default function useAuth() {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  async function getSignedInUser() {
    const user = await getUser();
    setUser(user?.user_metadata as User);
  }

  async function signUserOut() {
    try {
      setIsSigningOut(true);
      await signOut();
      window.location.reload();
    } catch (err) {
      toast({
        description: String(err),
        variant: "destructive",
      });
    } finally {
      setIsSigningOut(false);
    }
  }

  useEffect(() => {
    getSignedInUser();
  }, []);

  return { user, signUserOut, isSigningOut };
}
