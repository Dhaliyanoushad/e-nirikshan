import { GoogleGenerativeAI } from "@google/generative-ai";


// Prevent redeclaration in Next.js hot reload

let genAI;

if (!global.genAI) {

  global.genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GEMINI_KEY
  );

}

genAI = global.genAI;



export async function generateTimeline(pdfUrl, duration, budget) {

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });


  const prompt = `
Return ONLY JSON.

{
"timeline":[
{"phase":"foundation","start":0,"end":1}
],
"feasible":true,
"suggestion":"short"
}
`;


  const result = await model.generateContent([
    prompt,
    {
      fileData: {
        fileUri: pdfUrl,
        mimeType: "application/pdf",
      },
    },
  ]);


  return JSON.parse(result.response.text());

}



export async function verifyProgress(imageUrl, phase, news) {

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });


  const prompt = `
Expected phase:${phase}

Return ONLY JSON:

{
"on_track":true,
"suggestion":"short"
}
`;


  const result = await model.generateContent([
    prompt,
    {
      fileData: {
        fileUri: imageUrl,
        mimeType: "image/jpeg",
      },
    },
  ]);


  return JSON.parse(result.response.text());

}
