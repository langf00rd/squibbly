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

export async function signup(props: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: props.email,
    password: props.password,
    options: {
      data: {
        first_name: props.first_name,
        last_name: props.last_name,
      },
    },
  });

  if (error) throw error.message;

  const createUserResult = await createUser({
    email: props.email,
  });

  if (createUserResult.error) throw createUserResult.error.message;
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}

export async function createUser(payload: Record<string, unknown>) {
  const supabase = await createClient();
  return await supabase.from("users").insert([payload]).select();
}
