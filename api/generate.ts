import type { VercelRequest, VercelResponse } from '@vercel/node';
import { YoutubeTranscript } from 'youtube-transcript';
import { createClient } from '@supabase/supabase-js';
import {
  summarizeTranscript,
  generateHooks,
  generateCaptions,
  generateThread,
  generateLinkedInPost,
  generateVideoIdeas
} from '../src/services/aiService';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url, userId } = req.body;

  if (!url || !userId) {
    return res.status(400).json({ error: 'YouTube URL and user authentication are required' });
  }

  // Basic validation mimicking a backend check
  if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
    return res.status(400).json({ error: 'Please enter a valid YouTube URL' });
  }

  try {
    const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    // Fetch user usage from Supabase
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('credits_remaining, videos_processed, plan')
      .eq('id', userId)
      .single();

    if (profileError || !profile) {
      console.error('Error fetching user profile:', profileError);
      return res.status(401).json({ error: 'User profile not found or database sync failed.' });
    }

    // Enforce Pro plan hard limit
    if (profile.plan === 'pro') {
      if (profile.videos_processed >= 250) {
        return res.status(429).json({ error: 'You have reached your monthly limit of 250 videos. Please upgrade or wait for reset.' });
      }
    } else if (profile.credits_remaining <= 0) {
      return res.status(403).json({ error: 'You have exhausted your generation credits. Please upgrade your plan.' });
    }

    // 1. Fetch transcript
    let transcriptText = '';
    try {
      const transcriptList = await YoutubeTranscript.fetchTranscript(url);
      transcriptText = transcriptList.map(t => t.text).join(' ');
    } catch (e) {
      console.error('Error fetching transcript:', e);
      return res.status(400).json({ error: 'Failed to fetch transcript. The video might not have captions enabled or is restricted.' });
    }

    if (transcriptText.length < 50) {
      return res.status(400).json({ error: 'Transcript is too short to generate meaningful content.' });
    }

    // 2. Summarize
    const summary = await summarizeTranscript(transcriptText);

    // 3. Parallel generate
    const [hooks, captions, thread, linkedin, videoIdeas] = await Promise.all([
      generateHooks(summary),
      generateCaptions(summary),
      generateThread(summary),
      generateLinkedInPost(summary),
      generateVideoIdeas(summary)
    ]);

    // Format structure to match frontend GeneratedContent interface
    const generatedData = {
      hooks,
      twitter: thread,
      instagram: captions,
      linkedin: linkedin,
      videoIdeas
    };

    // 4. Update usage stats
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        credits_remaining: profile.credits_remaining - 1,
        videos_processed: profile.videos_processed + 1
      })
      .eq('id', userId);

    if (updateError) {
      console.error('Failed to update usage count:', updateError);
    }

    // Return the data
    return res.status(200).json(generatedData);

  } catch (error: any) {
    console.error('Generation Endpoint Error:', error);
    return res.status(500).json({ error: 'Failed to generate content. Our AI might be experiencing high volume. Please try again.' });
  }
}
