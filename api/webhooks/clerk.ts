import { Webhook } from 'svix';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable: any) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const svix_id = req.headers['svix-id'] as string;
  const svix_timestamp = req.headers['svix-timestamp'] as string;
  const svix_signature = req.headers['svix-signature'] as string;

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ error: 'Missing svix headers' });
  }

  const payload = (await buffer(req)).toString();

  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || '';
  const wh = new Webhook(webhookSecret);
  let evt: any;

  try {
    evt = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return res.status(400).json({ error: 'Webhook verification failed' });
  }

  if (evt.type === 'user.created') {
    const { id, email_addresses, first_name } = evt.data;
    const primaryEmail = email_addresses?.[0]?.email_address;
    
    // Initialize Supabase Service Role client to bypass RLS for inserting users
    const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    try {
      const { error } = await supabase
        .from('profiles')
        .insert({
          id: id,
          email: primaryEmail,
          credits_remaining: 3,
          videos_processed: 0
        });

      if (error) throw error;
      console.log('Successfully synced new Clerk user to Supabase profiles.');

      if (primaryEmail && process.env.RESEND_API_KEY) {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: primaryEmail,
          subject: `Welcome to CreatorFlow! ✨`,
          html: `<p>Hi ${first_name || 'there'}!</p>
                 <p>Welcome to CreatorFlow! You've been credited with 3 free video generations to test out the AI.</p>
                 <p>Start turning your YouTube videos into a week of content right now!</p>`
        });
        console.log('Successfully sent Resend welcome email.');
      }
    } catch (dbError: any) {
      console.error('Database sync failed:', dbError);
      return res.status(500).json({ error: 'Failed to sync user.' });
    }
  }

  return res.status(200).json({ success: true });
}
