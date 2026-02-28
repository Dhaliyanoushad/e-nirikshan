import { supabase } from "../../../lib/supabase";
import { extractPdfText } from "../../../lib/pdfExtractor";
import { generateTimeline } from "../../../lib/gemini";

export const runtime = "nodejs";

export async function POST(req) {

try {

// =============================
// 1. Read form data
// =============================

const formData = await req.formData();

const projectId = formData.get("project_id");
const pdfFile = formData.get("pdf");
const start = formData.get("start_date");
const end = formData.get("end_date");
const budget = formData.get("budget") || "unknown";


if (!projectId || !pdfFile || !start || !end) {

return Response.json({

success: false,
error: "Missing required fields"

}, { status: 400 });

}


// =============================
// 2. Convert PDF to buffer
// =============================

const buffer = Buffer.from(
await pdfFile.arrayBuffer()
);


// =============================
// 3. Extract PDF text
// =============================

const text = await extractPdfText(buffer);

if (!text || text.length < 50) {

return Response.json({

success: false,
error: "PDF text extraction failed"

}, { status: 500 });

}


// =============================
// 4. Calculate duration
// =============================

const months = Math.abs(

(new Date(end) - new Date(start))

/ (1000 * 60 * 60 * 24 * 30)

);

const duration = `${months.toFixed(1)} months`;


// =============================
// 5. Generate AI timeline
// =============================

const aiResult = await generateTimeline(

text,
duration,
budget

);


if (!aiResult) {

return Response.json({

success: false,
error: "AI timeline generation failed"

}, { status: 500 });

}


// =============================
// 6. Update database
// =============================

const { error: updateError } = await supabase

.from("contractor_projects")

.update({

contractor_report_timeline: aiResult.timeline,

gemini_suggestions: {

feasible: aiResult.feasible,
suggestion: aiResult.suggestion

}

})

.eq("project_id", projectId);


if (updateError) {

console.error("DB update error:", updateError);

return Response.json({

success: false,
error: updateError.message

}, { status: 500 });

}


// =============================
// 7. Return success
// =============================

return Response.json({

success: true,

timeline: aiResult.timeline,

suggestion: aiResult.suggestion

});


}

catch (error) {

console.error("Create project error:", error);

return Response.json({

success: false,
error: error.message

}, { status: 500 });

}

}
