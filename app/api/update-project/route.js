import { supabase } from "../../../lib/supabase";

import { verifyProgress } from "../../../lib/gemini";

import { getExpectedProgress } from "../../../lib/progressTimeline";


export const runtime = "nodejs";


export async function POST(req) {

try {

// =====================================
// 1. Read form data
// =====================================

const formData = await req.formData();

const projectId = formData.get("project_id");

const image = formData.get("image");


if (!projectId || !image) {

return Response.json({

success: false,

error: "Missing project_id or image"

}, { status: 400 });

}


// =====================================
// 2. Fetch project from database
// =====================================

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


// =====================================
// 3. Convert image → buffer
// =====================================

const imageBuffer = Buffer.from(

await image.arrayBuffer()

);


// =====================================
// 4. Send image to Gemini
// =====================================

const analysis = await verifyProgress({

imageBuffer,

expectedPhase: "",

news: "",

summary: project.project_summary

});


const actualProgress =

analysis?.completionPercent || 0;


// =====================================
// 5. Calculate expected progress
// =====================================

const expected = getExpectedProgress(

project.start_date,

project.end_date,

project.contractor_report_timeline

);


const expectedProgress = expected.expectedProgress;


// =====================================
// 6. Compare expected vs actual
// =====================================

let status;

let delayPercent = 0;

let suggestion;


if (actualProgress >= expectedProgress) {

status = "on_track";

suggestion = "Project is progressing on schedule.";

}
else {

status = "delayed";

delayPercent = expectedProgress - actualProgress;

suggestion =

`Project delayed by ${delayPercent}%.
Increase manpower, extend work hours, or optimize resources.`;

}


// =====================================
// 7. Save image to Supabase Storage
// =====================================

const filePath =

`project-photos/${projectId}-${Date.now()}.jpg`;


await supabase.storage

.from("project-photos")

.upload(filePath, image);



// =====================================
// 8. Update database
// =====================================

const { error: updateError } = await supabase

.from("contractor_projects")

.update({

latest_photo: {

storage_path: filePath,

stage: analysis?.stage,

completionPercent: actualProgress,

date: new Date()

},

gemini_suggestions: {

status,

expectedPhase: expected.phase,

expectedProgress,

actualProgress,

delayPercent,

suggestion

}

})

.eq("project_id", projectId);


if (updateError) {

return Response.json({

success: false,

error: updateError.message

}, { status: 500 });

}


// =====================================
// 9. Return result
// =====================================

return Response.json({

success: true,

expectedPhase: expected.phase,

expectedProgress,

actualProgress,

delayPercent,

status,

suggestion

});


}

catch (error) {

console.error(error);

return Response.json({

success: false,

error: error.message

}, { status: 500 });

}

}
