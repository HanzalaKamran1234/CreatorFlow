import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
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

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const buf = await buffer(req);
  const signature = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf.toString(), signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful checkout session
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const userId = session.client_reference_id; // The Clerk ID we passed earlier
    const planType = session.metadata?.planType; 

    if (userId && planType) {
      console.log(`Payment successful for user ${userId} on plan ${planType}`);

      // Assign credits based on plan
      const newCredits = planType === 'pro' ? 999999 : (planType === 'starter' ? 15 : 0);

      const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
      const supabase = createClient(supabaseUrl, supabaseKey);

      // Securely update user's credits using Service Role Key
      const { error } = await supabase
        .from('profiles')
        .update({ credits_remaining: newCredits })
        .eq('id', userId);

      if (error) {
        console.error('Error updating user credits in Supabase:', error);
      } else {
        console.log(`Successfully upgraded user ${userId} to ${planType}`);
      }
    }
  }

  res.json({ received: true });
}
