import { getWeather } from "../../../lib/weather";
import { verifyAuth } from "../../../lib/auth";
import { handleApiError, validateFields } from "../../../lib/errorHandler";

export const runtime = "nodejs";

export async function POST(req){
  try {
    // =====================================
    // 0. Authentication Check
    // =====================================
    const { user, error: authError } = await verifyAuth(req);
    if (authError) {
      return Response.json({ success: false, error: authError }, { status: 401 });
    }

    // =====================================
    // 1. Read form data
    // =====================================
    const formData = await req.formData();
    validateFields(formData, ["project_id", "image"]);

    const projectId = Number(formData.get("project_id"));
    const image = formData.get("image");


// =====================================
// 2. Fetch project
// =====================================

const { data: project, error: projectError } =
await supabase
.from("contractor_projects")
.select("*")
.eq("project_id", projectId)
.single();


if(projectError || !project){

return Response.json({
success:false,
error:"Project not found"
},{status:404});

}


// =====================================
// 3. Expected progress calculation
// =====================================

const expected =
getExpectedProgress(
project.start_date,
project.end_date,
project.contractor_report_timeline
);

const expectedProgress =
expected.expectedProgress;


// =====================================
// 4. Convert image to buffer
// =====================================

const imageBuffer =
Buffer.from(await image.arrayBuffer());


// =====================================
// 5. Fetch news and weather
// =====================================

let news = [];
let weather = null;

try{

news = await getNews(project.location);

}catch(e){

console.log("News error:", e.message);

}

try{

weather = await getWeather(project.location);

}catch(e){

console.log("Weather error:", e.message);

}


// =====================================
// 6. Gemini analysis
// =====================================

const analysis =
await verifyProgress({

imageBuffer,

expectedPhase: expected.phase,

news,

weather,

summary: project.project_summary

});


const actualProgress =
analysis?.completionPercent || 0;


// =====================================
// 7. Delay calculation
// =====================================

let delayPercent =
expectedProgress - actualProgress;

if(delayPercent < 0)
delayPercent = 0;


let status =
delayPercent > 10
? "delayed"
: "on_track";


// =====================================
// 8. Upload image to Supabase Storage
// =====================================

const filePath =
`project-photos/${projectId}-${Date.now()}.jpg`;


const { error: uploadError } =
await supabase.storage
.from("project-photos")
.upload(filePath, image);


if(uploadError){

console.log("Storage error:", uploadError.message);

}


// =====================================
// 9. Update database
// =====================================

const { error: updateError } =
await supabase
.from("contractor_projects")
.update({

latest_photo:{

storage_path:filePath,

completionPercent:actualProgress,

date:new Date().toISOString()

},

latest_news:news,

latest_weather:weather,

gemini_suggestions:{

completionPercent:actualProgress,

progress:analysis.progress,

suggestion:analysis.suggestion,

delayRisk:analysis.delayRisk,

newDeadline:analysis.newDeadline,

expectedPhase:expected.phase,

expectedProgress,

delayPercent,

status

}

})
.eq("project_id", projectId);


if(updateError){

console.log("DATABASE ERROR:");

console.log(updateError);

return Response.json({
success:false,
error:updateError.message
},{status:500});

}


// =====================================
// 10. Return response
// =====================================

return Response.json({

success:true,

expectedPhase:expected.phase,

expectedProgress,

actualProgress,

delayPercent,

status,

suggestion:analysis.suggestion,

weather,

news

});


}
  catch (error) {
    return handleApiError(error, "Update project error");
  }
}
