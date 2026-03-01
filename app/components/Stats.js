import { supabase } from "../../lib/supabase";
import StatsClient from "./StatsClient";

export default async function Stats() {
  const { count: total } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true });

  const { count: ongoing } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .ilike("status", "ongoing");

  const { count: completed } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .ilike("status", "completed");

  const { count: delayed } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .or("status.ilike.delayed,status.ilike.risk");

  const statsData = [
    { value: total || 0, label: "TOTAL PROJECTS" },
    { value: ongoing || 0, label: "ONGOING PROJECTS" },
    { value: completed || 0, label: "COMPLETED PROJECTS" },
    { value: delayed || 0, label: "DELAYED PROJECTS" },
  ];

  return <StatsClient stats={statsData} />;
}
