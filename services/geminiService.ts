
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateProjectDescription = async (projectName: string, category: string, keywords: string) => {
  const ai = getAI();
  const prompt = `你是一名专业的 UE/UX 资深设计师。请为名为 "${projectName}" 的项目（类别为 "${category}"）写一段简洁且有吸引力的项目介绍。
  内容应包括：1. 核心用户挑战，2. 设计解决方案，3. 最终成果及影响。
  如果提供了以下关键词，请将其融入其中：${keywords}。
  请使用中文撰写，字数控制在 200 字以内，保持专业感。`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "AI 生成描述失败，请重试。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "生成描述时出错，请检查连接或 API 密钥。";
  }
};

export const suggestTags = async (projectName: string, category: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `请为标题为 "${projectName}"、类别为 "${category}" 的项目建议 5 个相关的 UE/UX 设计标签（例如：“视觉识别”、“无障碍设计”、“原型设计”）。请使用中文。`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["tags"]
        }
      }
    });
    const data = JSON.parse(response.text || '{"tags":[]}');
    return data.tags as string[];
  } catch (error) {
    console.error("Gemini Tag Suggestion Error:", error);
    return ["UI 设计", "用户研究"];
  }
};
