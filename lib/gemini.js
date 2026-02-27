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

try{

const model = genAI.getGenerativeModel({

model:"gemini-2.5-flash"

});


const prompt = `

You are a civil engineer.

Analyze project plan and create COMPLETE timeline.

Minimum 6 phases.

Cover full duration.

Plan:
${planText}

Duration:
${duration}

Budget:
${budget}

Return ONLY JSON:

{
"timeline":[
{"phase":"Site prep","start":0,"end":1}
],
"feasible":true,
"suggestion":"short"
}

`;


const result =
await model.generateContent(prompt);


const text =
result.response.text()
.replace(/```json|```/g,"")
.trim();


return JSON.parse(text);

}
catch(error){

console.error(error);

return fallbackTimeline();

}

}



function fallbackTimeline(){

return{

timeline:[],

feasible:false,

suggestion:"AI failed"

};

}



/* =====================================================
PROGRESS VERIFIER
===================================================== */

export async function verifyProgress({

imageBuffer,
expectedPhase,
news,
summary

}){

try{

const model =
genAI.getGenerativeModel({

model:"gemini-2.5-flash"

});


const result =
await model.generateContent([

{
inlineData:{
data:imageBuffer.toString("base64"),
mimeType:"image/jpeg"
}
},

`

You are a construction inspector.

Expected phase:
${expectedPhase}

Project summary:
${summary}

News:
${JSON.stringify(news)}

Analyze image.

Return ONLY JSON:

{

"progress":"short",

"suggestion":"short",

"delayRisk":"low|medium|high",

"completionPercent":number

}

`

]);


const text =
result.response.text()
.replace(/```json|```/g,"")
.trim();


return JSON.parse(text);

}
catch(error){

console.error(error);

return{

progress:"unknown",

suggestion:"AI failed",

delayRisk:"unknown",

completionPercent:0

};

}

}
