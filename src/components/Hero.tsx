import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Youtube, ArrowRight, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { generateContentFromVideo, type GeneratedContent } from '../services/mockApi';
import LoadingOverlay from './LoadingOverlay';

interface HeroProps {
  onComplete: (data: GeneratedContent) => void;
  isLoggedIn: boolean;
  remainingCredits: number;
  onRequireAuth: () => void;
}

export default function Hero({ onComplete, isLoggedIn, remainingCredits, onRequireAuth }: HeroProps) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    if (!isLoggedIn && remainingCredits <= 0) {
      onRequireAuth();
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const data = await generateContentFromVideo(url);
      onComplete(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred while generating content.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-brand-100/50 to-transparent dark:from-brand-900/20 pointer-events-none -z-10 blur-3xl" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 -left-40 w-96 h-96 bg-brand-400/20 dark:bg-brand-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm mb-8"
        >
          <Sparkles size={16} className="text-brand-500" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Powered by advanced AI models
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
        >
          Turn One YouTube Video Into <br className="hidden md:block" />
          <span className="text-gradient">a Week of Content</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10"
        >
          CreatorFlow automatically transforms your YouTube videos into posts for Twitter, LinkedIn, and Instagram in seconds. No more staring at a blank page.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto relative glass rounded-2xl p-2 md:p-3 flex flex-col md:flex-row items-center gap-2 group focus-within:ring-2 focus-within:ring-brand-500 transition-all dark:bg-slate-900/50"
        >
          <div className="absolute left-6 text-slate-400 hidden md:block">
            <Youtube size={24} />
          </div>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isLoading}
            placeholder="Paste your YouTube video link here..."
            className="w-full flex-1 bg-transparent border-none outline-none py-4 px-4 md:pl-16 text-slate-900 dark:text-white placeholder:text-slate-400 text-lg disabled:opacity-50"
            required
          />
          <button
            type="submit"
            disabled={isLoading || !url.trim()}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:bg-brand-500 disabled:opacity-75 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Analyzing Video...</span>
              </>
            ) : (
              <>
                <span>Generate Content</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </motion.form>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex items-center justify-center gap-2 text-red-500 bg-red-50/50 dark:bg-red-900/10 py-2 px-4 rounded-lg inline-flex max-w-2xl mx-auto border border-red-100 dark:border-red-900/30"
          >
            <AlertCircle size={18} />
            <span className="text-sm font-medium">{error}</span>
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 text-sm text-slate-500 dark:text-slate-400"
        >
          {isLoggedIn 
            ? 'Generate unlimited content on your current plan.' 
            : `No credit card required. ${remainingCredits > 0 ? `${remainingCredits} free ${remainingCredits === 1 ? 'video' : 'videos'} remaining.` : 'Trial ended. Sign in to continue.'}`
          }
        </motion.p>
      </div>

      <AnimatePresence>
        {isLoading && <LoadingOverlay />}
      </AnimatePresence>
    </section>
  );
}
