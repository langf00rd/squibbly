"use server";

import { Artifact } from "@/lib/generics";
import { createClient } from "@/lib/utils/supabase/server";

export async function deleteArtifactByID(id: Artifact["id"]) {
  const supabase = await createClient();
  const { error } = await supabase.from("artifact").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function createDrawing(payload: Record<string, unknown>) {
  delete payload.created_at;
  delete payload.id;
  const supabase = await createClient();
  payload.user = (await supabase.auth.getUser()).data.user?.email;
  const { error, data } = await supabase
    .from("artifact")
    .insert([payload])
    .select();
  if (error) throw new Error(error.message);
  return data as Artifact[];
}

export async function updateArtifcat(payload: Artifact) {
  console.log("SERVER UPDATING", payload);
  const supabase = await createClient();
  const { error } = await supabase
    .from("artifact")
    .update(payload)
    .eq("id", payload.id);
  if (error) throw new Error(error.message);
}

export async function getUserArtifacts() {
  const supabase = await createClient();
  const email = (await supabase.auth.getUser()).data.user?.email;

  const { data, error } = await supabase
    .from("artifact")
    .select("*")
    .eq("user", email);

  if (error) throw new Error(error.message);

  return data;
}
