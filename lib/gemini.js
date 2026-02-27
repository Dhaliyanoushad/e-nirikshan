import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY);

export async function generateTimeline(pdfUrl, duration, budget){

const model = genAI.getGenerativeModel({
model: "gemini-1.5-flash"
});

const prompt = `
Analyze construction plan.

Duration: ${duration}
Budget: ${budget}

Return ONLY JSON:

{
"timeline":[
{"phase":"foundation","start_month":0,"end_month":1},
{"phase":"structure","start_month":1,"end_month":4}
],
"feasible":true,
"suggestions":"short suggestion max 15 words"
}
`;

const result = await model.generateContent([
prompt,
{
fileData:{
fileUri: pdfUrl,
mimeType:"application/pdf"
}
}
]);

return JSON.parse(result.response.text());

}
