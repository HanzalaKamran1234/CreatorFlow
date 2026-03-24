const fetchFreeAI = async (systemPrompt: string, userPrompt: string): Promise<string> => {
  try {
    const res = await fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        model: 'openai'
      })
    });
    const text = await res.text();
    return text;
  } catch (err) {
    console.error("Free AI fetch error:", err);
    return '';
  }
};

export const summarizeTranscript = async (transcript: string, tone: string = 'Professional'): Promise<string> => {
  const content = `You are an expert content summarizer. Extract the key points, main arguments, and most valuable insights from the provided transcript concisely. Omit any filler words or irrelevant tangents. The final content will be generated in a ${tone} tone, so highlight points that fit this style.`;
  return await fetchFreeAI(content, transcript);
};

export const generateHooks = async (summary: string, tone: string = 'Professional'): Promise<string[]> => {
  const content = `You are a viral hook generator. Given the video summary, generate 5 highly engaging, curiosity-inducing hooks for short-form video or social media text. The tone must be strictly ${tone}. Return ONLY a raw JSON array of strings (e.g. ["hook1", "hook2"]). Do not return markdown.`;
  const text = await fetchFreeAI(content, summary);
  try {
    const parsed = JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());
    return Array.isArray(parsed) ? parsed : (parsed.hooks || []);
  } catch {
    return [text.substring(0, 100)];
  }
};

export const generateCaptions = async (summary: string, tone: string = 'Professional'): Promise<string> => {
  const content = `Given the summary, write a highly engaging and conversational Instagram caption. The tone must be strictly ${tone}. Include appropriate emojis and formatting. Keep it to 3-4 short paragraphs and add engaging hashtags at the end.`;
  return await fetchFreeAI(content, summary);
};

export const generateThread = async (summary: string, tone: string = 'Professional'): Promise<string[]> => {
  const content = `You are an expert Twitter ghostwriter. Create a compelling Twitter thread (5-7 tweets) based on the provided summary. The tone must be strictly ${tone}. Return ONLY a raw JSON array of strings (e.g. ["tweet 1", "tweet 2"]). Do not include markdown blocks.`;
  const text = await fetchFreeAI(content, summary);
  try {
    const parsed = JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());
    return Array.isArray(parsed) ? parsed : (parsed.thread || []);
  } catch {
    return [text.substring(0, 280)];
  }
};

export const generateLinkedInPost = async (summary: string, tone: string = 'Professional'): Promise<string> => {
  const content = `You are a top-tier LinkedIn thought leader. Write a high-converting, engaging LinkedIn post based on the summary. The tone must be strictly ${tone}. Use strong hook lines, concise formatting with line breaks, and an engaging question at the end.`;
  return await fetchFreeAI(content, summary);
};

export const generateVideoIdeas = async (summary: string, tone: string = 'Professional'): Promise<string[]> => {
  const content = `You are a YouTube strategist. Generate 3 unique, high-retention short-form video ideas (TikTok/Reels/Shorts) based on the summary. The tone of the ideas must be strictly ${tone}. Include the visual concept and text flow. Return ONLY a raw JSON array of strings. Do not include markdown blocks.`;
  const text = await fetchFreeAI(content, summary);
  try {
    const parsed = JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());
    return Array.isArray(parsed) ? parsed : (parsed.ideas || []);
  } catch {
    return [text.substring(0, 50)];
  }
};
