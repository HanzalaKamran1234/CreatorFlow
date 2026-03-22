import { motion } from 'framer-motion';
import { Twitter, ArrowRight, Heart, MessageCircle, Repeat2 } from 'lucide-react';

export default function ExampleOutput() {
  return (
    <section className="py-24 bg-brand-50/50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Text */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              See the <span className="text-gradient">quality</span> for yourself
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto lg:mx-0">
              Stop settling for generic AI generation. Our models are specifically tuned to sound like a native social media expert, formatting everything perfectly for maximum engagement.
            </p>
            
            <ul className="space-y-4 mb-8 text-left max-w-md mx-auto lg:mx-0">
              {[
                "Highly engaging, scroll-stopping hooks",
                "Formatted with perfect spacing & structure",
                "Maintains your core message and tone",
                "Ready to post with zero edits needed"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 px-6 py-3 rounded-xl font-medium transition-all shadow-md group"
            >
              <span>Try it with your video</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Example UI */}
          <div className="flex-1 w-full max-w-lg">
            <motion.div 
              initial={{ opacity: 0, y: 20, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-400/20 rounded-full blur-2xl" />

              {/* The Mock Tweet Card */}
              <div className="relative bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                        <img src="https://ui-avatars.com/api/?name=Creator&background=random" alt="Avatar" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                          Created by AI <span className="text-brand-500 text-xs">✓</span>
                        </div>
                        <div className="text-slate-500 text-sm">@creatorflow_user</div>
                      </div>
                    </div>
                    <Twitter className="text-[#1DA1F2]" size={20} />
                  </div>

                  <div className="text-slate-800 dark:text-slate-200 text-lg leading-relaxed space-y-4 mb-4">
                    <p>1/ Most creators upload a YouTube video and then forget about it.</p>
                    <p>But that one video could become 10 pieces of content.</p>
                    <p>Here's how... 🧵</p>
                  </div>

                  <div className="text-[#1DA1F2] text-sm mb-4">Show this thread</div>

                  <div className="flex items-center justify-between text-slate-500 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 hover:text-[#1DA1F2] cursor-pointer transition-colors"><MessageCircle size={18} /> 124</div>
                    <div className="flex items-center gap-2 hover:text-[#17BF63] cursor-pointer transition-colors"><Repeat2 size={18} /> 892</div>
                    <div className="flex items-center gap-2 hover:text-[#E0245E] cursor-pointer transition-colors"><Heart size={18} /> 4.2K</div>
                  </div>
                </div>
              </div>

              {/* Stack effect behind */}
              <div className="absolute top-4 left-4 w-full h-full border border-slate-200 dark:border-slate-800 rounded-2xl bg-white/50 dark:bg-slate-950/50 shadow-sm -z-10" />
              <div className="absolute top-8 left-8 w-full h-full border border-slate-200 dark:border-slate-800 rounded-2xl bg-white/20 dark:bg-slate-950/20 shadow-sm -z-20" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
