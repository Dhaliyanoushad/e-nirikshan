import { supabase } from "@/lib/supabase";

import { verifyProgress } from "@/lib/gemini";

import { getNews } from "@/lib/news";

import { getExpectedPhase } from "@/lib/timeline";



export async function POST(req){

const form=await req.formData();

const projectId=form.get("projectId");

const photo=form.get("photo");



const project=

await supabase

.from("contractor_projects")

.select("*")

.eq("project_id",projectId)

.single();



const filePath=

`photos/${projectId}-${Date.now()}.jpg`;


await supabase.storage

.from("photos")

.upload(filePath,photo);



const imageUrl=

`${process.env.NEXT_PUBLIC_SUPABASE_URL}

/storage/v1/object/public/${filePath}`;



const news=

await getNews(project.data.location);



const phase=

getExpectedPhase(

project.data.start_date,

project.data.contractor_report_timeline

);



const gemini=

await verifyProgress(

imageUrl,

phase.phase,

JSON.stringify(news)

);



await supabase

.from("contractor_projects")

.update({

latest_photo:{
url:imageUrl,
analysis:gemini
},

latest_news:news,

gemini_suggestions:{
suggestion:gemini.suggestion
}

})

.eq("project_id",projectId);



return Response.json({success:true});

}
