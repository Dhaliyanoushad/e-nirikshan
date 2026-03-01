import { supabase } from "../../lib/supabase";
import dynamic from "next/dynamic";

const KeralaMapClient = dynamic(() => import("./KeralaMapClient"), {
  ssr: false,
  loading: () => (
    <div className="h-[75vh] w-full bg-gray-100 animate-pulse flex items-center justify-center rounded-2xl">
      <div className="text-gray-400 font-medium">Loading Interactive Map...</div>
    </div>
  )
});

export default async function KeralaMap() {
  const { data } = await supabase
    .from("projects")
    .select("*");

  return <KeralaMapClient initialProjects={data || []} />;
}
