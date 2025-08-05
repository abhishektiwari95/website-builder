import { NextResponse } from "next/server";
import { chatSession } from "@/configs/AiModel";
export async function POST(req) {
  const { prompt } = await req.json();
  try {
    
    const result = await chatSession.sendMessage(prompt);
    const AIresp =   result.response.text();  
    return NextResponse.json({ result: AIresp });
    
  } catch (e) {
    console.error("AI Error:", error); // ✅ helpful for debugging
    console.log(error)
    return NextResponse.json({ error: e});
  }
}
