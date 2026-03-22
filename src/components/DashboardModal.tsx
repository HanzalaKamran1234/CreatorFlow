import { X, LogOut, Video, Coins } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

interface DashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  videosProcessed: number;
  remainingCredits: number;
}

export default function DashboardModal({ 
  isOpen, 
  onClose, 
  onLogout,
  videosProcessed,
  remainingCredits
}: DashboardModalProps) {
  if (!isOpen) return null;

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Supabase signout failed', err);
    } finally {
      onLogout();
    }
  };

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
          className="relative bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="p-8">
            <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Your Dashboard</h2>

            <div className="space-y-4 mb-8">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                    <Video size={18} />
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-300">Videos Processed</span>
                </div>
                <span className="text-xl font-bold">{videosProcessed}</span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-lg">
                    <Coins size={18} />
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-300">Remaining Credits</span>
                </div>
                <span className="text-xl font-bold">{remainingCredits}</span>
              </div>
            </div>

            <button 
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-3 rounded-xl font-medium transition-colors"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
