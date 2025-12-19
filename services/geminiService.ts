
import { GoogleGenAI } from "@google/genai";
import { Transaction } from "../types.ts";

export const getFinancialAdvice = async (transactions: Transaction[]): Promise<string> => {
  if (transactions.length === 0) return "Adicione algumas transações para receber conselhos financeiros personalizados!";

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const summary = transactions.map(t => `${t.date}: ${t.description} (${t.type}) - R$ ${t.amount}`).join('\n');

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analise as seguintes transações financeiras e forneça 3 dicas curtas e práticas de economia ou investimento em Português do Brasil. Seja motivador.\n\nTransações:\n${summary}`,
      config: {
        systemInstruction: "Você é um consultor financeiro especialista e amigável. Analise gastos e dê dicas úteis.",
        temperature: 0.7,
      }
    });

    return response.text || "Não foi possível gerar dicas no momento. Tente novamente mais tarde.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Ocorreu um erro ao consultar o assistente de IA.";
  }
};
