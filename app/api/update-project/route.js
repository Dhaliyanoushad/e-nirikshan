import { supabase } from "../../../lib/supabase";
import { verifyProgress } from "../../../lib/gemini";
import { getExpectedProgress } from "../../../lib/progressTimeline";
import { getNews } from "../../../lib/news";
import { getWeather } from "../../../lib/weather";

export const runtime = "nodejs";

export async function POST(req){

try{

// =====================================
// 1. Read form data
// =====================================

const formData = await req.formData();

const projectId = Number(formData.get("project_id"));
const image = formData.get("image");

if(!projectId || !image){

return Response.json({
success:false,
error:"Missing project_id or image"
},{status:400});

}


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
catch(error){

console.log("SERVER ERROR:");

console.log(error);

return Response.json({

success:false,

error:error.message

},{status:500});

}

}
