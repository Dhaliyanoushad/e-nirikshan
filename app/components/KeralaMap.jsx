import { supabase } from "../../lib/supabase";
import KeralaMapClient from "./KeralaMapClient";

export default async function KeralaMap() {
  const { data } = await supabase
    .from("projects")
    .select("*");

  return <KeralaMapClient initialProjects={data || []} />;
}
