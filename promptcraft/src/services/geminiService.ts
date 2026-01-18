import { GoogleGenAI } from "@google/genai";
import { ModelOption } from "../types";

export const generateOptimizedPrompt = async (
  goal: string,
  targetModel: ModelOption,
  apiKey: string
): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `You are a world-class prompt engineer and AI optimization expert. 
    Your task is to take a raw user goal and transform it into a highly effective, production-ready prompt specifically optimized for the "${targetModel}" LLM architecture.
    
    Guidelines:
    1. Structure the prompt clearly using delimiters if necessary.
    2. Include persona adoption, context, constraints, and output format requirements.
    3. Use language patterns that ${targetModel} is known to respond well to.
    4. Return ONLY the optimized prompt text. Do not include any conversational filler or "Here is the prompt:".`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `My goal is: "${goal}". \n\nPlease write the optimized prompt now.`,
      config: {
        systemInstruction: systemInstruction,
        thinkingConfig: { thinkingBudget: 0 }
      },
    });

    return response.text || "";
  } catch (error) {
    console.error("Error generating prompt:", error);
    throw new Error("Failed to generate prompt. Please check your API key and try again.");
  }
};
