import { supabase } from "../../lib/supabase";
import KeralaMapWrapper from "./KeralaMapWrapper";

export default async function KeralaMap() {
  const { data } = await supabase
    .from("projects")
    .select("*");

  return <KeralaMapWrapper initialProjects={data || []} />;
}
