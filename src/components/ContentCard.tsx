import { useState } from 'react';
import { Copy, RefreshCw, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContentCardProps {
  title: string;
  content: string | string[];
  onRegenerate: () => void;
}

export default function ContentCard({ title, content, onRegenerate }: ContentCardProps) {
  const [copied, setCopied] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleCopy = async () => {
    const textToCopy = Array.isArray(content) ? content.join('\n\n') : content;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    setIsRegenerating(true);
    // Simulate regeneration delay
    setTimeout(() => {
      onRegenerate();
      setIsRegenerating(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
        <div className="flex gap-2">
          <button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className={`p-2 rounded-lg text-slate-500 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-slate-800 transition-colors ${isRegenerating ? 'animate-spin text-brand-500' : ''}`}
            title="Regenerate"
          >
            <RefreshCw size={18} />
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-brand-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition-colors"
          >
            {copied ? (
              <>
                <Check size={16} className="text-green-500" />
                <span className="text-sm text-green-600 dark:text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span className="text-sm">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className={`prose prose-slate dark:prose-invert max-w-none ${isRegenerating ? 'opacity-50 blur-sm flex items-center justify-center min-h-[100px]' : ''} transition-all duration-300`}>
        {Array.isArray(content) ? (
          <ul className="space-y-4 list-none pl-0">
            {content.map((item, idx) => (
              <li key={idx} className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl text-slate-700 dark:text-slate-300">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
            {content}
          </div>
        )}
      </div>
      
      {/* Toast Notification for copying (optional inline) */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: copied ? 1 : 0, y: copied ? 0 : 10 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-sm py-2 px-4 rounded-full shadow-lg pointer-events-none"
      >
        Copied to clipboard
      </motion.div>
    </motion.div>
  );
}
