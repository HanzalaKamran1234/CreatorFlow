import { useState, useEffect } from 'react';
import { X, Clock, Loader2, Sparkles, Youtube, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import type { GeneratedContent } from '../services/api';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
  onSelectHistory?: (data: GeneratedContent) => void;
}

interface GenerationRecord {
  id: string;
  youtube_url: string;
  tone: string;
  content: GeneratedContent;
  created_at: string;
}

export default function HistoryModal({ isOpen, onClose, userId, onSelectHistory }: HistoryModalProps) {
  const [generations, setGenerations] = useState<GenerationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && userId) {
      loadHistory();
    }
  }, [isOpen, userId]);

  const loadHistory = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('generations')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Could not load history:', error);
      } else if (data) {
        setGenerations(data as GenerationRecord[]);
      }
    } catch (err) {
      console.warn(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-slate-50 dark:bg-slate-900 w-full max-w-4xl max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col"
        >
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-950">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Clock className="text-brand-500" />
              Content History
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6 overflow-y-auto flex-1">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                <Loader2 className="animate-spin mb-4" size={32} />
                <p>Loading your past generations...</p>
              </div>
            ) : generations.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="text-slate-400" size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">No history found</h3>
                <p className="text-slate-500 max-w-sm mx-auto">
                  You haven't generated any content yet. Head over to the dashboard to turn your first video into a week of content!
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 text-brand-600 font-medium hover:underline"
                >
                  Go to Dashboard
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {generations.map((gen) => (
                  <div key={gen.id} className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <Youtube size={18} className="text-red-500" />
                          <a href={gen.youtube_url} target="_blank" rel="noreferrer" className="text-slate-800 dark:text-slate-200 font-medium truncate max-w-[200px] md:max-w-xs hover:underline">
                            {gen.youtube_url}
                          </a>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Tone: {gen.tone || 'Professional'}</span>
                          <span>{new Date(gen.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (onSelectHistory) onSelectHistory(gen.content);
                          onClose();
                        }}
                        className="flex items-center justify-center gap-2 py-2 px-5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-medium transition-colors"
                      >
                        <span>View Content</span>
                        <ArrowRight size={16} />
                      </button>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
