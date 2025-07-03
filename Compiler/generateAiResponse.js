const {GoogleGenAI} = require('@google/genai')

const dotenv = require('dotenv');
dotenv.config();



const ai = new GoogleGenAI({apiKey: process.env.GOOGLE_GEMINI_API})


const  generateAiResponse =  async (code)=>{
    const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `give a 100 words feedback fro the code : ${code}, include progress,optimization , future scope and just start with the first line, nothing else i want in response, not even your validation like : ok,let's go..etc useless validations. just go with the buisness with the first line itself, as it makes user experience fast. try to respond in points like : current progress,optimization and future scope , 30-35 words each `, 
  });
  return response.text;



}
module.exports = {
    generateAiResponse

}