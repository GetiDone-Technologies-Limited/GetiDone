'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Star, MapPin, Briefcase, Clock, ShieldCheck, ChevronDown, ExternalLink } from 'lucide-react';
import { expertsSeed, EXPERTS_CATEGORIES } from '../data/expertsSeed';
import { Professional } from '../types';

export function ExpertsSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [activeCategory, setActiveCategory] = useState(categoryParam || 'Popular');
  const [visibleCount, setVisibleCount] = useState(12);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredExperts = useMemo(() => {
    let filtered = expertsSeed;
    if (activeCategory !== 'Popular') {
      filtered = expertsSeed.filter(expert => expert.category === activeCategory);
    }
    return filtered;
  }, [activeCategory]);

  const visibleExperts = filteredExperts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredExperts.length;

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(12);
    // Sync with URL without scrolling
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', cat);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  if (!isClient) return null; // Avoid hydration mismatch

  return (
    <section id="find-talent" className="bg-surface py-32 border-y border-outline">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-on-surface mb-6">Find Experts in Any Category</h2>
          <p className="text-lg text-on-surface-variant">Browse verified professionals across industries ready to execute your next project.</p>
        </div>

        {/* Categories Scroller */}
        <div className="flex overflow-x-auto pb-6 mb-12 -mx-6 px-6 sm:mx-0 sm:px-0 scrollbar-hide gap-3 no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {EXPERTS_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-primary text-on-primary border-primary shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                  : 'bg-surface-container border-outline text-on-surface hover:border-primary/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Experts Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visibleExperts.map((expert) => (
              <motion.div
                key={expert.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-surface-container border border-outline rounded-2xl p-6 hover:border-primary/50 transition-colors group flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${expert.avatarSeed}`} alt={expert.name} className="w-14 h-14 rounded-full bg-slate-800" />
                    <div>
                      <h4 className="font-bold text-on-surface flex items-center gap-1">
                        {expert.name} <CheckCircle2 className="w-4 h-4 text-primary" />
                      </h4>
                      <p className="text-sm text-on-surface-variant">{expert.role}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-primary font-bold">{expert.hourlyRate}</span>
                    <div className="flex items-center gap-1 text-xs text-yellow-500 font-medium">
                      <Star className="w-3 h-3 fill-current" /> {expert.rating}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-on-surface-variant mb-6">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {expert.location}</span>
                  <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {expert.projects} Projects</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {expert.experience}</span>
                </div>

                <p className="text-sm text-on-surface-variant mb-6 flex-grow">
                  "{expert.bio}"
                </p>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {expert.skills.slice(0, 3).map(skill => (
                      <span key={skill} className="bg-surface-container-high text-xs text-on-surface px-2.5 py-1 rounded-md">
                        {skill}
                      </span>
                    ))}
                    {expert.skills.length > 3 && (
                      <span className="bg-surface-container-high text-xs text-on-surface px-2.5 py-1 rounded-md">
                        +{expert.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-outline flex items-center justify-between">
                   <div className="flex items-center gap-1">
                     <ShieldCheck className="w-4 h-4 text-primary" />
                     <span className="text-xs font-semibold text-on-surface">Trust {expert.trustScore}</span>
                   </div>
                   <div className="flex gap-2">
                     <button className="p-2 rounded-lg bg-surface-container-high hover:bg-black/5 text-on-surface transition-colors">
                       <ExternalLink className="w-4 h-4" />
                     </button>
                     <button className="px-4 py-2 rounded-lg bg-primary text-on-primary text-sm font-semibold hover:brightness-110 transition-colors">
                       Hire
                     </button>
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredExperts.length === 0 && (
          <div className="text-center py-20">
             <p className="text-on-surface-variant">No experts found in this category yet. We are expanding rapidly!</p>
          </div>
        )}

        {hasMore && (
          <div className="mt-16 text-center">
            <button 
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-outline hover:border-primary text-on-surface text-sm font-semibold transition-colors"
            >
              Load More <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
