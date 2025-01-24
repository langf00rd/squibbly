"use server";

import { createClient } from "@/lib/utils/supabase/server";

export async function login(email: string, password: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error.message;
}

export async function signup(email: string, password: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) throw error.message;
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}
