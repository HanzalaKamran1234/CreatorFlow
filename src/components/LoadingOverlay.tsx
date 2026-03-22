import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, CheckCircle2, Loader2 } from 'lucide-react';

const loadingSteps = [
  "Initializing AI models...",
  "Fetching YouTube transcript...",
  "Analyzing video context...",
  "Identifying key viral moments...",
  "Drafting engaging Twitter thread...",
  "Structuring LinkedIn post...",
  "Generating Instagram hooks...",
  "Finalizing content package..."
];

export default function LoadingOverlay() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Progress through steps automatically to simulate work
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 400); // Fast enough to be interesting, slow enough to read

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl p-8 border border-slate-200 dark:border-slate-800 flex flex-col items-center"
      >
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-brand-500 rounded-full blur-xl opacity-20 animate-pulse" />
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white shadow-lg overflow-hidden">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(255,255,255,0.3)_360deg)]"
            />
            <div className="absolute inset-[2px] bg-slate-900 rounded-xl flex items-center justify-center">
               <Bot size={36} className="text-brand-400" />
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">
          Generating Magic...
        </h3>

        <div className="w-full space-y-3">
          {loadingSteps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;

            // Only show recent relevant steps to keep it clean
            if (index < currentStep - 2 || index > currentStep + 1) return null;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-center gap-3 ${
                  isCompleted ? 'text-green-600 dark:text-green-400' :
                  isCurrent ? 'text-brand-600 dark:text-brand-400' :
                  'text-slate-400 dark:text-slate-600'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 size={18} />
                ) : isCurrent ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <div className="w-[18px] h-[18px] rounded-full border-2 border-slate-300 dark:border-slate-700" />
                )}
                <span className={`text-sm font-medium ${isCurrent ? 'font-bold' : ''}`}>
                  {step}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="w-full mt-8 bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <motion.div 
            className="h-full bg-brand-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / loadingSteps.length) * 100}%` }}
            transition={{ ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
