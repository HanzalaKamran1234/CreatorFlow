/**
 * FREE TEST ENGINE
 * This engine generates perfectly structured simulated AI content from real YouTube transcripts.
 * It bypasses all OpenAI/Pollinations API limits, timeouts, and costs, 
 * allowing you to test the entire SaaS billing, history, email arrays, and UI loops flawlessly.
 */

export const summarizeTranscript = async (transcript: string, tone: string = 'Professional'): Promise<string> => {
  const clean = transcript.replace(/\n/g, ' ').substring(0, 300);
  return `[${tone} Video Breakdown Engine Activated]\n\nCore insights from this video:\n${clean}...`;
};

export const generateHooks = async (summary: string, tone: string = 'Professional'): Promise<string[]> => {
  return [
    `Want to know the secret to this? (${tone.toUpperCase()} EDITION) 🤫\n\n${summary.substring(0, 40)}...`,
    `Top 3 things I learned from this video you MUST know:`,
    `Stop scrolling! You won't believe this insight...`,
    `The ultimate guide to mastering this exact topic 📈`,
    `Why 99% of people are doing this wrong:`
  ];
};

export const generateCaptions = async (summary: string, tone: string = 'Professional'): Promise<string> => {
  return `🔥 Deep Dive Alert!\n\nJust watched an incredible video and I had to share my thoughts. The core message is:\n\n"${summary.substring(0, 150)}..."\n\nWhat do you guys think? Do you agree? Let me know down below! 👇\n\n#creator #${tone.toLowerCase()} #viral`;
};

export const generateThread = async (summary: string, tone: string = 'Professional'): Promise<string[]> => {
  return [
    `🧵 I just finished watching this video. Here's a massive breakdown. (${tone} Tone) 👇`,
    `1️⃣ First major takeaway: The execution matters more than the idea itself. Look at how they approached the problem.`,
    `2️⃣ Second point: Consistency. "${summary.substring(0, 60)}..." This quote perfectly summarizes their workflow.`,
    `3️⃣ Third point: Scaling. It's not about doing more work, it's about doing the right work.`,
    `4️⃣ Final thoughts: I'll definitely be applying this to my own routines. Follow me for more daily breakdowns! 🚀`
  ];
};

export const generateLinkedInPost = async (summary: string, tone: string = 'Professional'): Promise<string> => {
  return `🚀 I just encountered a fantastic perspective on this topic today.\n\nIf you want to scale effectively, you need to hear this insight:\n\n"${summary.substring(0, 120)}..."\n\nIn our industry, taking a ${tone.toLowerCase()} approach like this changes everything.\n\nDo you agree with this methodology? Let's discuss in the comments!\n\n#leadership #growth #mindset`;
};

export const generateVideoIdeas = async (summary: string, tone: string = 'Professional'): Promise<string[]> => {
  return [
    `Concept 1 (${tone}): A rapid-fire Green Screen reaction to the most controversial 10 seconds of this video, focusing on: "${summary.substring(0, 30)}..."`,
    `Concept 2: A 3-step tutorial breaking down the core concept for beginners using a whiteboard.`,
    `Concept 3: A POV stitch where you share how this specific mindset shift changed your workflow.`
  ];
};
