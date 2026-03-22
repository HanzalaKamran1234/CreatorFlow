import { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExampleOutput from './components/ExampleOutput';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import ResultsDashboard from './components/ResultsDashboard';
import DashboardModal from './components/DashboardModal';
import type { GeneratedContent } from './services/mockApi';
import { createClerkSupabaseClient } from './lib/supabase';
import { useUser, useAuth, useClerk } from '@clerk/clerk-react';

function App() {
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();
  const { openSignIn } = useClerk();

  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isDashboardModalOpen, setIsDashboardModalOpen] = useState(false);
  
  const [videosProcessed, setVideosProcessed] = useState(() => {
    const saved = localStorage.getItem('creatorflow_processed');
    return saved !== null ? parseInt(saved, 10) : 0;
  });
  
  const [remainingCredits, setRemainingCredits] = useState(() => {
    const saved = localStorage.getItem('creatorflow_credits');
    return saved !== null ? parseInt(saved, 10) : 3;
  });

  useEffect(() => {
    localStorage.setItem('creatorflow_processed', videosProcessed.toString());
  }, [videosProcessed]);

  useEffect(() => {
    localStorage.setItem('creatorflow_credits', remainingCredits.toString());
  }, [remainingCredits]);
  
  useEffect(() => {
    if (isSignedIn && user) {
      fetchUserProfile();
    }
  }, [isSignedIn, user]);

  const fetchUserProfile = async () => {
    try {
      const token = await getToken({ template: 'supabase' });
      if (!token) return;
      
      const supabase = createClerkSupabaseClient(token);
      const { data, error } = await supabase
        .from('profiles')
        .select('credits_remaining, videos_processed')
        .eq('id', user?.id)
        .single();
        
      if (data && !error) {
        setRemainingCredits(data.credits_remaining);
        setVideosProcessed(data.videos_processed);
      }
    } catch (err) {
      console.warn("Could not fetch Supabase profile using Clerk Token", err);
    }
  };

  const resultsRef = useRef<HTMLDivElement>(null);

  const handleGenerateComplete = async (data: GeneratedContent) => {
    setGeneratedContent(data);
    
    let newProcessed = videosProcessed + 1;

    if (!isSignedIn && remainingCredits > 0) {
      setRemainingCredits((prev) => prev - 1);
    }
    if (isSignedIn && user) {
      setVideosProcessed(newProcessed);
      // Synchronize generation count to Supabase securely
      try {
        const token = await getToken({ template: 'supabase' });
        if (token) {
          const supabase = createClerkSupabaseClient(token);
          const { error } = await supabase.from('profiles').update({
            videos_processed: newProcessed,
          }).eq('id', user.id);
          if (error) console.warn(error);
        }
      } catch (err) {
        console.warn('Failed to update Supabase profile stats', err);
      }
    }
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-200">
      <Navbar 
        onDashboardClick={() => setIsDashboardModalOpen(true)}
      />
      <main>
        <Hero 
          onComplete={handleGenerateComplete} 
          isLoggedIn={isSignedIn || false}
          remainingCredits={remainingCredits}
          onRequireAuth={() => openSignIn()}
        />
        <ExampleOutput />
        <div ref={resultsRef}>
          <ResultsDashboard data={generatedContent} />
        </div>
        <HowItWorks />
        <Features />
        <Pricing />
      </main>
      <Footer />
      
      <DashboardModal 
        isOpen={isDashboardModalOpen} 
        onClose={() => setIsDashboardModalOpen(false)} 
        onLogout={() => setIsDashboardModalOpen(false)}
        videosProcessed={videosProcessed}
        remainingCredits={remainingCredits}
      />
    </div>
  );
}

export default App;
