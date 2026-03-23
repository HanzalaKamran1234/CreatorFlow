import Stripe from 'stripe';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16', // or latest
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { planType, userId, returnUrl } = req.body;

  if (!planType || !userId || !returnUrl) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  // NOTE: These should be replaced with actual Price IDs from your Stripe Dashboard
  const PRICE_IDS: Record<string, string> = {
    starter: 'price_1TE3NjRwaqT5nkAdlSNRE56a',
    pro: 'price_1TE3PyRwaqT5nkAd7fbDBqgi',
  };

  const priceId = PRICE_IDS[planType];

  if (!priceId) {
    return res.status(400).json({ error: 'Invalid plan type' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${returnUrl}?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${returnUrl}?canceled=true`,
      client_reference_id: userId, // This links the payment to the exact Clerk user
      metadata: {
        planType, 
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe error:', error.message);
    return res.status(500).json({ error: 'Error creating checkout session' });
  }
}
