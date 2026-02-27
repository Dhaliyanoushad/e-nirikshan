import { supabase } from "@/lib/supabase";
import { verifyProgress } from "@/lib/gemini";
import { getNews } from "@/lib/news";
import { getExpectedPhase } from "@/lib/timeline";

export const runtime = "nodejs";

export async function POST(req) {

try {

// 1. Read form data

const form = await req.formData();

const projectId = form.get("projectId");

const photo = form.get("photo");


if (!projectId || !photo) {

return Response.json({

success: false,

error: "Missing projectId or photo"

}, { status: 400 });

}



// 2. Fetch project

const { data: project, error: projectError } = await supabase

.from("contractor_projects")

.select("*")

.eq("project_id", projectId)

.single();


if (projectError || !project) {

return Response.json({

success: false,

error: "Project not found"

}, { status: 404 });

}



// 3. Save photo to storage (optional, for record)

const filePath = `photos/${projectId}-${Date.now()}.jpg`;

const { error: uploadError } = await supabase.storage

.from("photos")

.upload(filePath, photo);


if (uploadError) {

console.error(uploadError);

}



// 4. Convert photo → buffer for Gemini

const imageBuffer = Buffer.from(

await photo.arrayBuffer()

);



// 5. Get news

const news = await getNews(project.location);



// 6. Get expected phase

const phase = getExpectedPhase(

project.start_date,

project.contractor_report_timeline

);



// 7. Call Gemini with image buffer (NOT URL)

const gemini = await verifyProgress({

imageBuffer,

expectedPhase: phase.phase,

news: news,

projectSummary: project.project_summary

});



// 8. Update database

const { error: updateError } = await supabase

.from("contractor_projects")

.update({

latest_photo: {

storage_path: filePath,

analysis: gemini

},

latest_news: news,

gemini_suggestions: {

suggestion: gemini?.suggestion || null,

delayRisk: gemini?.delayRisk || null

}

})

.eq("project_id", projectId);


if (updateError) {

console.error(updateError);

return Response.json({

success: false,

error: "Database update failed"

}, { status: 500 });

}



// 9. Return success

return Response.json({

success: true,

analysis: gemini

});


}

catch (error) {

console.error("Update project error:", error);

return Response.json({

success: false,

error: error.message

}, { status: 500 });

}

}
