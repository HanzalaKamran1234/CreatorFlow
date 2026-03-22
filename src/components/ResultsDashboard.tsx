import { motion } from 'framer-motion';
import ContentCard from './ContentCard';
import type { GeneratedContent } from '../services/mockApi';
import { Sparkles, Video, Instagram, Linkedin, Twitter } from 'lucide-react';

interface ResultsDashboardProps {
  data: GeneratedContent | null;
}

export default function ResultsDashboard({ data }: ResultsDashboardProps) {
  if (!data) return null;

  return (
    <section id="results" className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-medium mb-6"
          >
            <Sparkles size={16} />
            <span>Success! Your content is ready.</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Your Generated <span className="text-gradient">Content</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Review, copy, or regenerate individual pieces of content specifically tailored for each platform.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold text-xl text-slate-800 dark:text-slate-200">
                <Twitter className="text-blue-400" />
                Twitter / X
              </div>
              <ContentCard
                title="Viral Thread"
                content={data.twitter}
                onRegenerate={() => console.log('Regenerate Twitter')}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold text-xl text-slate-800 dark:text-slate-200">
                <Linkedin className="text-blue-700 dark:text-blue-500" />
                LinkedIn
              </div>
              <ContentCard
                title="Professional Post"
                content={data.linkedin}
                onRegenerate={() => console.log('Regenerate LinkedIn')}
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold text-xl text-slate-800 dark:text-slate-200">
                <Instagram className="text-pink-600" />
                Instagram
              </div>
              <ContentCard
                title="Caption & Hashtags"
                content={data.instagram}
                onRegenerate={() => console.log('Regenerate Instagram')}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold text-xl text-slate-800 dark:text-slate-200">
                <Sparkles className="text-brand-500" />
                Ideation
              </div>
              <ContentCard
                title="Viral Hooks"
                content={data.hooks}
                onRegenerate={() => console.log('Regenerate Hooks')}
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold text-xl text-slate-800 dark:text-slate-200">
                <Video className="text-red-500" />
                Shorts / Reels
              </div>
              <ContentCard
                title="Short Video Ideas"
                content={data.videoIdeas}
                onRegenerate={() => console.log('Regenerate Ideas')}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
