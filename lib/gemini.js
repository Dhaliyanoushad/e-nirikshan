import { GoogleGenerativeAI } from "@google/generative-ai";


// Initialize ONCE
const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_KEY
);



export async function generateTimeline(planText, duration, budget) {

  try {

    // ✅ Use stable model name
    const model = genAI.getGenerativeModel({

      model: "gemini-2.5-flash"

    });



    const prompt = `
You are a construction planning AI.

Plan:
${planText}

Duration: ${duration}
Budget: ${budget}

Return ONLY valid JSON.

{
"timeline":[
{"phase":"foundation","start":0,"end":1}
],
"feasible":true,
"suggestion":"short"
}
`;



    const result = await model.generateContent(prompt);


    let text = result.response.text();


    // Clean markdown formatting
    text = text.replace(/```json|```/g, "").trim();



    // Try parsing safely
    try {

      return JSON.parse(text);

    } catch {

      console.error("Invalid JSON from Gemini:", text);

      return fallback();

    }



  } catch (error) {

    console.error("Gemini API Error:", error);

    return fallback();

  }

}



// fallback function
function fallback() {

  return {

    timeline: [],

    feasible: false,

    suggestion: "Unable to analyze plan"

  };

}
