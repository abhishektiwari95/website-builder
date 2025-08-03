 const {GoogleGenrativeAI,
    HarmCategory,HarmBlockThreshold
 } = require('@google/generative-ai');

 const apiKey = process.env.GEMINI_API_KEY;
 const genAI = new GoogleGenrativeAI(apiKey);

 const model = genAI.getGenerativeModal({
    model:"gemini-2.0-flash-exp",
 });

 const generationConfig = {
    temprature:1,
    topP:0.95,
    topk:40,
    maxOutputTokens:8192,
    responseMimeType:"text/plain",
 }

 export const chatSession = model.startChat({
    generationConfig,
    history:[],
 });

//  const result = await chatSession.sendMessage("INSERT_INPUT_HERE" );
//  console.log(result.response.text());