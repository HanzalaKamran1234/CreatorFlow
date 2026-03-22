import { motion } from 'framer-motion';
import { Layers, Share2, Zap, Copy, FileText } from 'lucide-react';

const features = [
  {
    icon: <Layers className="w-6 h-6 text-brand-500" />,
    title: 'AI Content Repurposing',
    description: 'Transform your long-form video into perfectly formatted content tailored for specific platforms, maintaining your unique voice.',
  },
  {
    icon: <Share2 className="w-6 h-6 text-purple-500" />,
    title: 'Multiple Formats',
    description: 'Get Twitter threads, professional LinkedIn posts, engaging Instagram captions, and short-form video scripts all at once.',
  },
  {
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
    title: 'Viral Hook Generator',
    description: 'Stop struggling with intros. Our AI generates 5 highly engaging hooks designed to capture attention and stop the scroll.',
  },
  {
    icon: <Copy className="w-6 h-6 text-green-500" />,
    title: 'One-Click Copy',
    description: 'Seamlessly copy any generated piece of content to your clipboard with a single click, ready instantly for posting.',
  },
  {
    icon: <FileText className="w-6 h-6 text-blue-500" />,
    title: 'Lightning Fast Results',
    description: 'Skip the hours of manual editing and rewriting. Get a full week of high-converting social content in under 60 seconds.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Everything you need to <span className="text-gradient">go viral</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Our platform is built specifically for creators who want to maximize their reach without maximizing their workload.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              key={index}
              className="p-8 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
