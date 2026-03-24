import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUser, useClerk } from '@clerk/clerk-react';
import { useState } from 'react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for testing the waters and seeing the quality of our AI.',
    features: [
      { text: '3 videos per month', included: true },
      { text: 'Twitter Thread generation', included: true },
      { text: 'LinkedIn & Instagram posts', included: true },
      { text: 'Viral hooks & short ideas', included: true },
      { text: 'Regenerate content', included: false },
      { text: 'Priority support', included: false },
    ],
    cta: 'Start for Free',
    highlighted: false,
  },
  {
    name: 'Starter',
    price: '$4',
    period: '/mo',
    description: 'Great for weekly uploaders wanting professional content.',
    features: [
      { text: '15 video generations', included: true },
      { text: 'Twitter Thread generation', included: true },
      { text: 'LinkedIn & Instagram posts', included: true },
      { text: 'Viral hooks & short ideas', included: true },
      { text: 'Regenerate content (Limited)', included: true },
      { text: 'Priority email support', included: false },
    ],
    cta: 'Get Starter',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/mo',
    description: 'For serious creators who want to scale their audience aggressively.',
    features: [
      { text: 'Unlimited video generations (250 videos limit)', included: true },
      { text: 'Twitter Thread generation', included: true },
      { text: 'LinkedIn & Instagram posts', included: true },
      { text: 'Viral hooks & short ideas', included: true },
      { text: 'Regenerate content infinitely', included: true },
      { text: 'Priority email support', included: true },
    ],
    cta: 'Upgrade to Pro',
    highlighted: true,
  },
];

export default function Pricing() {
  const { user, isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleCheckout = async (planName: string) => {
    if (planName === 'Free') return; // Free plan has no checkout

    if (!isSignedIn || !user) {
      openSignIn();
      return;
    }

    try {
      setIsLoading(planName);
      const planType = planName.toLowerCase();
      
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planType,
          userId: user.id,
          returnUrl: window.location.origin
        })
      });

      const { url, error } = await res.json();
      
      if (error) {
        console.error("Checkout validation failed:", error);
        alert(error);
      } else if (url) {
        window.location.href = url; // Redirect securely to Stripe
      }
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Failed to initialize checkout. Make sure you are running Vercel Dev or the site is deployed.");
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <section id="pricing" className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-400/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Simple, <span className="text-gradient">transparent pricing</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Choose the plan that best fits your content creation needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              key={plan.name}
              className={`relative p-8 rounded-3xl flex flex-col ${plan.highlighted ? 'border-2 border-brand-500 bg-slate-50 dark:bg-slate-900 shadow-xl' : 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm'}`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-500 text-white text-xs font-bold uppercase tracking-widest py-1 px-4 rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 min-h-[48px]">
                {plan.description}
              </p>
              <div className="flex items-end gap-1 mb-8">
                <span className="text-5xl font-extrabold">{plan.price}</span>
                {plan.period && (
                  <span className="text-lg text-slate-500 font-medium pb-1">{plan.period}</span>
                )}
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    {feature.included ? (
                      <div className="w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 flex-shrink-0">
                        <Check size={14} strokeWidth={3} />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 flex-shrink-0">
                        <X size={14} strokeWidth={3} />
                      </div>
                    )}
                    <span className={feature.included ? 'text-slate-800 dark:text-slate-200 font-medium' : 'text-slate-500 dark:text-slate-500 line-through'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handleCheckout(plan.name)}
                disabled={isLoading === plan.name}
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all mt-auto ${plan.highlighted ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-md' : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white'} ${isLoading === plan.name ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isLoading === plan.name ? 'Loading...' : plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
