import { motion } from 'framer-motion';
import { Link, Cpu, Sparkles } from 'lucide-react';

const steps = [
  {
    icon: <Link className="w-8 h-8 text-brand-500" />,
    title: 'Paste your YouTube link',
    description: 'Simply copy and paste any public YouTube video link into our generator. Works great with podcasts, vlogs, and educational videos.',
  },
  {
    icon: <Cpu className="w-8 h-8 text-brand-500" />,
    title: 'CreatorFlow analyzes transcript',
    description: 'Our advanced AI models instantly extract the transcript, identify key moments, and understand the context of your video.',
  },
  {
    icon: <Sparkles className="w-8 h-8 text-brand-500" />,
    title: 'Get ready-to-post content',
    description: 'Within seconds, receive a Twitter thread, LinkedIn post, Instagram caption, short video ideas, and viral hooks.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            How it <span className="text-gradient">Works</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Three simple steps to unlock a week's worth of content from a single video.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-brand-200 dark:via-brand-800 to-transparent z-0" />

          {steps.map((step, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              key={index}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-brand-50 dark:bg-slate-900 border-4 border-white dark:border-slate-950 flex items-center justify-center mb-6 shadow-xl relative">
                <div className="absolute inset-0 rounded-full bg-brand-400/20 blur-xl animate-pulse" />
                {step.icon}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
