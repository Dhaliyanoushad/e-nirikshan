import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
process.env.NEXT_PUBLIC_GEMINI_KEY
);



/* =====================================================
TIMELINE GENERATOR
===================================================== */

export async function generateTimeline(

planText,
duration,
budget

){

console.log("\n========== GEMINI TIMELINE START ==========");

console.log("📄 Plan length:", planText?.length);

console.log("⏱ Duration:", duration);

console.log("💰 Budget:", budget);


try{

const model = genAI.getGenerativeModel({

model:"gemini-2.5-flash"

});


const prompt = `

You are a senior civil engineer.

Analyze the construction plan and generate a COMPLETE timeline.

Plan:
${planText}

Duration:
${duration}

Budget:
${budget}

RULES:

• Minimum 6 phases  
• Cover entire duration  
• Logical civil engineering sequence  

Return ONLY valid JSON.

FORMAT:

{
"timeline":[
{
"phase":"Site Preparation",
"start":0,
"end":1
}
],
"feasible":true,
"suggestion":"short recommendation"
}

NO explanation.
NO markdown.

`;


console.log("🤖 Sending timeline request...");


const result = await model.generateContent(prompt);


const raw = result.response.text();


console.log("📥 Raw timeline response:");

console.log(raw);


const cleaned = raw
.replace(/```json|```/g,"")
.trim();


let parsed;


try{

parsed = JSON.parse(cleaned);

}
catch{

console.log("❌ Timeline parse failed");

return fallbackTimeline();

}


console.log("✅ Timeline parsed successfully");

console.log(parsed);

console.log("========== GEMINI TIMELINE END ==========\n");


return parsed;

}
catch(error){

console.log("❌ Timeline generation failed:");

console.log(error.message);

return fallbackTimeline();

}

}



function fallbackTimeline(){

return{

timeline:[],

feasible:false,

suggestion:"AI failed to generate timeline"

};

}



/* =====================================================
PROGRESS ANALYZER
===================================================== */

export async function verifyProgress({

imageBuffer,
expectedPhase,
news,
weather,
summary

}){


console.log("\n========== GEMINI IMAGE ANALYSIS START ==========");

console.log("📍 Expected phase:", expectedPhase);

console.log("📰 News count:", news?.length);

console.log("🌦 Weather:", weather);

console.log("📄 Summary length:", summary?.length);

console.log("🖼 Image size:", imageBuffer?.length);


try{

const model = genAI.getGenerativeModel({

model:"gemini-2.5-flash"

});


const prompt = `

You are a government construction inspector AI.

Expected Phase:
${expectedPhase}

Project Summary:
${summary}

Weather:
${JSON.stringify(weather)}

News:
${JSON.stringify(news)}

TASK:

Analyze construction image progress and external risks.

Return ONLY valid JSON.

FORMAT:

{
"completionPercent": number,
"progress": "short description",
"suggestion": "actionable suggestion",
"delayRisk": "low or medium or high",
"newDeadline": "YYYY-MM-DD or null"
}

NO explanation.
NO markdown.

`;


console.log("🤖 Sending image analysis request...");


const result = await model.generateContent([

{
inlineData:{
data:imageBuffer.toString("base64"),
mimeType:"image/jpeg"
}
},

prompt

]);


const raw = result.response.text();


console.log("📥 Raw analysis response:");

console.log(raw);


const cleaned = raw
.replace(/```json|```/g,"")
.trim();


let parsed;


try{

parsed = JSON.parse(cleaned);

}
catch{

console.log("❌ Analysis parse failed");

parsed = fallbackAnalysis();

}


console.log("✅ Analysis parsed successfully");

console.log(parsed);

console.log("========== GEMINI IMAGE ANALYSIS END ==========\n");


return parsed;

}
catch(error){

console.log("❌ Image analysis failed:");

console.log(error.message);

return fallbackAnalysis();

}

}



function fallbackAnalysis(){

return{

completionPercent:0,

progress:"Unable to analyze",

suggestion:"Manual inspection required",

delayRisk:"unknown",

newDeadline:null

};

}
