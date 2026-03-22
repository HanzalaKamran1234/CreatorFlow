import { useState, useEffect } from 'react';
import { Menu, X, PlaySquare, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

interface NavbarProps {
  onDashboardClick: () => void;
}

export default function Navbar({ onDashboardClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
              <PlaySquare size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight">CreatorFlow</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-slate-600 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400 font-medium transition-colors">Features</a>
            <a href="#how-it-works" className="text-slate-600 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400 font-medium transition-colors">How it Works</a>
            <a href="#pricing" className="text-slate-600 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400 font-medium transition-colors">Pricing</a>
          </nav>

          {/* Login / CTA / Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedIn>
              <button 
                onClick={onDashboardClick}
                className="flex items-center gap-2 text-slate-600 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400 font-medium transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                  <User size={18} />
                </div>
                <span>Dashboard</span>
              </button>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-slate-600 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400 font-medium transition-colors">
                  Log in
                </button>
              </SignInButton>
              <SignInButton mode="modal">
                <button className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 px-5 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg">
                  Get Started Free
                </button>
              </SignInButton>
            </SignedOut>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-600 dark:text-slate-300 hover:text-brand-600"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl"
        >
          <div className="px-4 pt-2 pb-6 space-y-4">
            <a href="#features" className="block text-slate-600 dark:text-slate-300 font-medium py-2">Features</a>
            <a href="#how-it-works" className="block text-slate-600 dark:text-slate-300 font-medium py-2">How it Works</a>
            <a href="#pricing" className="block text-slate-600 dark:text-slate-300 font-medium py-2">Pricing</a>
            <hr className="border-slate-200 dark:border-slate-800" />
            <SignedIn>
              <button 
                onClick={() => { setMobileMenuOpen(false); onDashboardClick(); }}
                className="block w-full text-left text-brand-600 dark:text-brand-400 font-bold py-2 flex items-center gap-2"
              >
                <User size={18} /> Dashboard
              </button>
              <div className="py-2">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left text-slate-600 dark:text-slate-300 font-medium py-2"
                >
                  Log in
                </button>
              </SignInButton>
              <SignInButton mode="modal">
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full bg-brand-600 text-white text-center rounded-lg font-medium py-3 mt-4"
                >
                  Get Started Free
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </motion.div>
      )}
    </header>
  );
}
