import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Youtube, ArrowRight, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { generateContentFromVideo, type GeneratedContent } from '../services/api';
import LoadingOverlay from './LoadingOverlay';

interface HeroProps {
  onComplete: (data: GeneratedContent) => void;
  isLoggedIn: boolean;
  userId?: string;
  remainingCredits: number;
  onRequireAuth: () => void;
}

export default function Hero({ onComplete, isLoggedIn, userId, remainingCredits, onRequireAuth }: HeroProps) {
  const [url, setUrl] = useState('');
  const [tone, setTone] = useState('Professional');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    if (!isLoggedIn) {
      onRequireAuth();
      return;
    }
    
    if (remainingCredits <= 0) {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const data = await generateContentFromVideo(url, userId, tone);
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
            disabled={isLoading || (isLoggedIn && remainingCredits <= 0)}
            placeholder={!isLoggedIn ? "Paste your YouTube video link here..." : (remainingCredits <= 0 ? "You're out of credits! Upgrade to continue." : "Paste your YouTube video link here...")}
            className="w-full flex-1 bg-transparent border-none outline-none py-4 px-4 md:pl-16 text-slate-900 dark:text-white placeholder:text-slate-400 text-lg disabled:opacity-50"
            required={!isLoggedIn || remainingCredits > 0}
          />
          <div className="hidden md:block w-px h-10 bg-slate-200 dark:bg-slate-700 mx-2"></div>
          <select 
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            disabled={isLoading || (isLoggedIn && remainingCredits <= 0)}
            className="bg-transparent border-none outline-none px-2 py-4 text-slate-700 dark:text-slate-300 font-medium disabled:opacity-50 hidden sm:block appearance-none cursor-pointer"
          >
            <option value="Professional" className="text-slate-900">Professional</option>
            <option value="Casual" className="text-slate-900">Casual</option>
            <option value="Humorous" className="text-slate-900">Humorous</option>
            <option value="Bold" className="text-slate-900">Bold</option>
            <option value="Educational" className="text-slate-900">Educational</option>
          </select>
          {!isLoggedIn ? (
            <button
              type="button"
              onClick={() => onRequireAuth()}
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg active:scale-[0.98] whitespace-nowrap"
            >
              <span>Sign In to Generate</span>
              <ArrowRight size={20} />
            </button>
          ) : remainingCredits <= 0 ? (
            <button
              type="button"
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg active:scale-[0.98] whitespace-nowrap"
            >
              <Sparkles size={20} />
              <span>Upgrade to Pro</span>
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading || !url.trim()}
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:bg-brand-500 disabled:opacity-75 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg active:scale-[0.98] whitespace-nowrap"
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
          )}
        </motion.form>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex items-start gap-3 text-red-600 bg-red-50 dark:bg-red-900/20 py-4 px-6 text-left max-w-2xl mx-auto rounded-xl border border-red-200 dark:border-red-900/40 shadow-sm"
          >
            <AlertCircle size={22} className="flex-shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="text-sm font-bold mb-1">Could not generate content</span>
              <span className="text-sm font-medium text-red-500 dark:text-red-400">{error}</span>
            </div>
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={`mt-6 text-sm font-medium ${remainingCredits <= 0 && isLoggedIn ? 'text-amber-500 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400'}`}
        >
          {!isLoggedIn 
            ? 'Create a free account to instantly get 3 free video generations.'
            : (remainingCredits > 0 
                ? (remainingCredits > 900000 
                    ? 'You have unlimited video generations (250/mo limit) on the Pro plan! ✨' 
                    : `You have ${remainingCredits} free ${remainingCredits === 1 ? 'video' : 'videos'} remaining.`) 
                : 'Your free trial has ended. Please upgrade below to continue.')
          }
        </motion.p>
      </div>

      <AnimatePresence>
        {isLoading && <LoadingOverlay />}
      </AnimatePresence>
    </section>
  );
}
