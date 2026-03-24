export interface GeneratedContent {
  twitter: string[];
  linkedin: string;
  instagram: string;
  hooks: string[];
  videoIdeas: string[];
}

export const generateContentFromVideo = async (url: string, userId?: string, tone: string = 'Professional'): Promise<GeneratedContent> => {
  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, userId, tone })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to generate content. Please try again.');
  }

  return res.json();
};
