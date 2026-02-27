import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";


const genAI = new GoogleGenerativeAI(
process.env.NEXT_PUBLIC_GEMINI_KEY
);


export async function POST(req){

try{

// 1. Read image

const formData = await req.formData();

const image = formData.get("image");


if(!image){

return Response.json({

success:false,
error:"No image uploaded"

},{status:400});

}


// 2. Convert to buffer

const buffer = Buffer.from(
await image.arrayBuffer()
);


// 3. Gemini Vision

const model = genAI.getGenerativeModel({

model:"gemini-2.5-flash"

});


const result = await model.generateContent([

{
inlineData:{

data:buffer.toString("base64"),

mimeType:"image/jpeg"

}
},

`

Describe this construction image.

Return ONLY JSON:

{

"description":"",

"stage":"",

"completionPercent":number

}

`

]);



const text = result.response.text()
.replace(/```json|```/g,"")
.trim();


return Response.json({

success:true,
analysis:JSON.parse(text)

});


}
catch(error){

console.error(error);

return Response.json({

success:false,
error:error.message

},{status:500});

}

}
