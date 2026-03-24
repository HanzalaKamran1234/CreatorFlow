import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

// Initialize the API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const summarizeTranscript = async (transcript: string, tone: string = 'Professional'): Promise<string> => {
  const prompt = `You are an expert content strategist. Summarize the following YouTube transcript into a comprehensive text that captures the core message, key takeaways, and interesting anecdotes.
Tone: ${tone}
Transcript: ${transcript}`;

  const result = await model.generateContent(prompt);
  return result.response.text();
};

export const generateHooks = async (summary: string, tone: string = 'Professional'): Promise<string[]> => {
  const prompt = `Based on the following video summary, generate exactly 5 highly engaging, viral hooks for short-form video (TikTok/Reels/Shorts).
Make them punchy and attention-grabbing.
Tone: ${tone}
Summary: ${summary}`;

  const modelWithJson = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.STRING,
        },
      },
    }
  });

  const result = await modelWithJson.generateContent(prompt);
  return JSON.parse(result.response.text());
};

export const generateCaptions = async (summary: string, tone: string = 'Professional'): Promise<string> => {
  const prompt = `Write an engaging Instagram/TikTok caption for a video with the following summary. 
Include relevant emojis and 3-5 hashtags. Keep it structured and easy to read.
Tone: ${tone}
Summary: ${summary}`;

  const result = await model.generateContent(prompt);
  return result.response.text();
};

export const generateThread = async (summary: string, tone: string = 'Professional'): Promise<string[]> => {
  const prompt = `Write a high-value Twitter thread (3-5 tweets) based on the following summary. 
The first tweet should be a strong hook. The last tweet should have a call to action.
Tone: ${tone}
Summary: ${summary}`;

  const modelWithJson = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.STRING,
        },
      },
    }
  });

  const result = await modelWithJson.generateContent(prompt);
  return JSON.parse(result.response.text());
};

export const generateLinkedInPost = async (summary: string, tone: string = 'Professional'): Promise<string> => {
  const prompt = `Write a highly engaging LinkedIn post based on the following summary. 
Use appropriate formatting (line breaks, strong opening hook, actionable takeaways).
Tone: ${tone}
Summary: ${summary}`;

  const result = await model.generateContent(prompt);
  return result.response.text();
};

export const generateVideoIdeas = async (summary: string, tone: string = 'Professional'): Promise<string[]> => {
  const prompt = `Based on the following summary, suggest 3 distinct, creative ideas for new follow-up videos or spin-off content.
Tone: ${tone}
Summary: ${summary}`;

  const modelWithJson = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.STRING,
        },
      },
    }
  });

  const result = await modelWithJson.generateContent(prompt);
  return JSON.parse(result.response.text());
};
