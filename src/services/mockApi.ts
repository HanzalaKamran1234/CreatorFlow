export interface GeneratedContent {
  twitter: string[];
  linkedin: string;
  instagram: string;
  hooks: string[];
  videoIdeas: string[];
}

export const generateContentFromVideo = async (url: string): Promise<GeneratedContent> => {
  // Basic validation mimicking a backend check
  if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
    throw new Error('Please enter a valid YouTube URL');
  }

  try {
    console.log("Attempting to fetch real transcript from /api/transcript...");
    const res = await fetch('/api/transcript', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    
    if (res.ok) {
      const data = await res.json();
      console.log("✅ Successfully fetched real transcript snippet:", data.transcript.substring(0, 100) + "...");
    } else {
      console.warn("API route failed or returned error. Make sure you are running via 'vercel dev' or deployed on Vercel.");
    }
  } catch (err) {
    console.warn("Could not hit /api/transcript. Note: NextJS/Vite standard dev servers don't always serve the /api folder natively unless via Vercel CLI.", err);
  }

  // Simulate AI generation delay
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Return mock content
  return {
    twitter: [
      "1/ Just watched an incredible breakdown of how top creators use AI. The systems they build are wild. Thread 🧵",
      "2/ Most people think AI is just ChatGPT. But the real leverage is in automation. If you're doing repetitive tasks, you're losing.",
      "3/ Step 1: Identify bottlenecks. What takes you the most time? For most, it's ideation and repurposing.",
      "4/ Step 2: Build the pipeline. Top creators put 1 long-form video into a system and get 20+ pieces of micro-content out.",
      "5/ The takeaway? Stop working harder on distribution. Let the systems do the heavy lifting. Build once, distribute everywhere."
    ],
    linkedin: "I recently dove deep into the systems used by top creators, and what I found completely changed my perspective on content creation.\n\nWe often romanticize the 'grind' of creating every single day. But the most successful creators aren't necessarily working more hours; they're building better systems.\n\nBy leveraging AI to automate the repurposing of their core content, they achieve 10x the output with a fraction of the effort.\n\nAre you building systems, or are you just grinding?\n\n#ContentCreation #AI #Productivity #CreatorEconomy",
    instagram: "The secret to endless content isn't working 24/7... it's having the right systems. 🚀\n\nStop letting your best long-form content die after one post. Transform it. Repurpose it. Multiply it.\n\nWork smarter, not harder. ✨\n\n👇 Drop a 🔥 if you're ready to scale your content.\n\n#creators #contentstrategy #worksmart #creatorflow #socialmedia",
    hooks: [
      "Here's the exact system top creators use to work 4 hours a week.",
      "Stop posting on social media until you understand this ONE concept.",
      "I watched 100 hours of YouTube so you don't have to. Here's what I learned.",
      "The biggest lie you've been told about growing an audience.",
      "Steal this AI content strategy before your competitors do."
    ],
    videoIdeas: [
      "A hook-heavy short explaining the 'Repurposing Multiplier' effect with on-screen graphics showing 1 video turning into 10 posts.",
      "A fast-paced tutorial showing exactly how to use AI tools (like CreatorFlow) to save 10 hours a week.",
      "A direct-to-camera 'real talk' video discussing why most creators burn out and how systems prevent it."
    ]
  };
};
