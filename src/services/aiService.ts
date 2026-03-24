import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const summarizeTranscript = async (transcript: string): Promise<string> => {
  const response = await openai.chat.completions.create({
    model: 'gpt-5-nano',
    messages: [
      {
        role: 'system',
        content: 'You are an expert content summarizer. Extract the key points, main arguments, and most valuable insights from the provided transcript concisely. Omit any filler words or irrelevant tangents.',
      },
      {
        role: 'user',
        content: transcript,
      },
    ],
  });

  return response.choices[0]?.message.content || '';
};

export const generateHooks = async (summary: string): Promise<string[]> => {
  const response = await openai.chat.completions.create({
    model: 'gpt-5-nano',
    messages: [
      {
        role: 'system',
        content: 'You are a viral hook generator. Given the video summary, generate 5 highly engaging, curiosity-inducing hooks for short-form video or social media text. Return ONLY a JSON array of strings.',
      },
      {
        role: 'user',
        content: summary,
      },
    ],
    response_format: { type: 'json_object' }, 
  });

  try {
    const rawContent = response.choices[0]?.message.content || '{"hooks":[]}';
    const parsed = JSON.parse(rawContent);
    return Array.isArray(parsed) ? parsed : (parsed.hooks || []);
  } catch {
    return [];
  }
};

export const generateCaptions = async (summary: string): Promise<string> => {
  const response = await openai.chat.completions.create({
    model: 'gpt-5-nano',
    messages: [
      {
        role: 'system',
        content: 'Given the summary, write a highly engaging and conversational Instagram caption. Include appropriate emojis and formatting. Keep it to 3-4 short paragraphs and add engaging hashtags at the end.',
      },
      {
        role: 'user',
        content: summary,
      },
    ],
  });

  return response.choices[0]?.message.content || '';
};

export const generateThread = async (summary: string): Promise<string[]> => {
  const response = await openai.chat.completions.create({
    model: 'gpt-5-mini',
    messages: [
      {
        role: 'system',
        content: 'You are an expert Twitter ghostwriter. Create a compelling Twitter thread (5-7 tweets) based on the provided summary. Return ONLY a JSON array of strings, where each string is a single tweet in the thread.',
      },
      {
        role: 'user',
        content: summary,
      },
    ],
    response_format: { type: 'json_object' },
  });

  try {
    const rawContent = response.choices[0]?.message.content || '{"thread":[]}';
    const parsed = JSON.parse(rawContent);
    return Array.isArray(parsed) ? parsed : (parsed.thread || []);
  } catch {
    return [];
  }
};

export const generateLinkedInPost = async (summary: string): Promise<string> => {
  const response = await openai.chat.completions.create({
    model: 'gpt-5-mini',
    messages: [
      {
        role: 'system',
        content: 'You are a top-tier LinkedIn thought leader. Write a high-converting, professional, yet engaging LinkedIn post based on the summary. Use strong hook lines, concise formatting with line breaks, and an engaging question at the end.',
      },
      {
        role: 'user',
        content: summary,
      },
    ],
  });

  return response.choices[0]?.message.content || '';
};

export const generateVideoIdeas = async (summary: string): Promise<string[]> => {
  const response = await openai.chat.completions.create({
    model: 'gpt-5-mini',
    messages: [
      {
        role: 'system',
        content: 'You are a YouTube strategist. Generate 3 unique, high-retention short-form video ideas (TikTok/Reels/Shorts) based on the summary. Include the visual concept and text flow. Return ONLY a JSON array of strings.',
      },
      {
        role: 'user',
        content: summary,
      },
    ],
    response_format: { type: 'json_object' },
  });

  try {
    const rawContent = response.choices[0]?.message.content || '{"ideas":[]}';
    const parsed = JSON.parse(rawContent);
    return Array.isArray(parsed) ? parsed : (parsed.ideas || []);
  } catch {
    return [];
  }
};
