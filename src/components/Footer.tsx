import { PlaySquare } from 'lucide-react';

interface FooterProps {
  onOpenLegal: (type: 'privacy' | 'terms') => void;
  onOpenContact: () => void;
}

export default function Footer({ onOpenLegal, onOpenContact }: FooterProps) {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 py-12 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white">
              <PlaySquare size={18} />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">CreatorFlow</span>
          </div>

          <div className="flex items-center gap-6 text-sm font-medium text-slate-500 transition-colors">
            <button onClick={() => onOpenLegal('privacy')} className="hover:text-brand-600 transition-colors">Privacy Policy</button>
            <button onClick={() => onOpenLegal('terms')} className="hover:text-brand-600 transition-colors">Terms of Service</button>
            <button onClick={onOpenContact} className="hover:text-brand-600 transition-colors">Contact</button>
          </div>

        </div>
        
        <div className="mt-8 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} CreatorFlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
