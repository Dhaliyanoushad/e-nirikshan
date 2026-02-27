import { extractText } from "unpdf";

export async function extractPdfText(fileBuffer){

  try{

    const text = await extractText(
      new Uint8Array(fileBuffer)
    );

    return text;

  }
  catch(error){

    console.error("PDF extraction failed:", error);

    return "";

  }

}
