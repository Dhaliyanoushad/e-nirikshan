import { supabase } from "@/lib/supabase";

import { generateTimeline } from "@/lib/gemini";



export async function POST(req){

const form=await req.formData();

const projectId=form.get("projectId");

const pdf=form.get("pdf");

const duration=form.get("duration");

const budget=form.get("budget");



const filePath=`plans/${projectId}.pdf`;


await supabase.storage

.from("plans")

.upload(filePath,pdf);



const pdfUrl=

`${process.env.NEXT_PUBLIC_SUPABASE_URL}

/storage/v1/object/public/${filePath}`;



const result=

await generateTimeline(pdfUrl,duration,budget);



await supabase

.from("contractor_projects")

.update({

contractor_report_timeline:result.timeline,

gemini_suggestions:{
feasible:result.feasible,
suggestion:result.suggestion
}

})

.eq("project_id",projectId);



return Response.json({success:true});

}
