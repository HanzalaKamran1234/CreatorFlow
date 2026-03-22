import { PlaySquare } from 'lucide-react';

export default function Footer() {
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

          <div className="flex items-center gap-6 text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
            <a href="#" className="hover:text-brand-600 transition-colors">Twitter</a>
            <a href="#" className="hover:text-brand-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-600 transition-colors">Terms of Service</a>
            <a href="mailto:hello@creatorflow.ai" className="hover:text-brand-600 transition-colors">Contact</a>
          </div>

        </div>
        
        <div className="mt-8 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} CreatorFlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
