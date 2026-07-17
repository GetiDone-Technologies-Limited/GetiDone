'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Zap, ExternalLink, Bot, Briefcase, ChevronRight, Loader2 } from 'lucide-react';

interface AI_Match {
  freelancer: {
    id: string;
    name: string;
    doneScore: number;
    skills: { id: string; name: string }[];
  };
  matchPercentage: number;
  matchedSkills: string[];
  aiReason: string;
}

export function SmartMatchDemo() {
  const [matches, setMatches] = useState<AI_Match[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const handleRunMatching = async () => {
    setIsLoading(true);
    setHasRun(true);
    try {
      // Wait for 1s to simulate realistic search if the backend is very fast, helps the "wow" factor
      const response = await fetch('http://localhost:3001/matching/recommend/seed-job-1');
      if (response.ok) {
        const data = await response.json();
        setMatches(data);
      }
    } catch (error) {
      console.error('Failed to run matching demo', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="demo" className="bg-surface py-32 border-y border-outline relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 border border-primary/20">
            <Bot className="w-4 h-4" /> Live AI Engine Demo
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-on-surface mb-6">Experience AI Smart Matching</h2>
          <p className="text-lg text-on-surface-variant">See how our AI analyzes job requirements and ranks top talent based on deep skill understanding, not just keywords.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Panel: The Job */}
          <div className="bg-surface-container border border-outline rounded-2xl p-8 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider">Sample Job Posting</h3>
                <p className="text-xs text-on-surface-variant mt-1">ID: seed-job-1</p>
              </div>
            </div>
            
            <h4 className="text-2xl font-bold text-on-surface mb-4">Build a MVP Web Application</h4>
            <p className="text-on-surface-variant mb-8 flex-grow">
              Looking for an experienced full-stack developer to build a web MVP using Next.js and NestJS. Must be able to deliver within 30 days.
            </p>

            <div className="mb-8">
              <h5 className="text-sm font-semibold text-on-surface mb-3">Required Skills</h5>
              <div className="flex flex-wrap gap-2">
                {['Next.js', 'NestJS', 'React', 'TypeScript'].map(skill => (
                  <span key={skill} className="px-3 py-1 rounded-lg bg-surface-container-high text-xs font-medium text-on-surface border border-outline">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <button 
              onClick={handleRunMatching}
              disabled={isLoading}
              className="w-full py-4 rounded-xl bg-primary text-on-primary font-bold text-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:shadow-[0_0_30px_rgba(52,211,153,0.5)]"
            >
              {isLoading ? (
                <><Loader2 className="w-6 h-6 animate-spin" /> Analyzing Candidates...</>
              ) : (
                <><Zap className="w-6 h-6" /> Run AI Match</>
              )}
            </button>
          </div>

          {/* Right Panel: The Results */}
          <div className="bg-surface-container border border-outline rounded-2xl p-8 relative min-h-[500px]">
            {!hasRun && !isLoading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <Bot className="w-16 h-16 text-outline mb-4" />
                <h4 className="text-xl font-bold text-on-surface mb-2">Waiting for Job Data</h4>
                <p className="text-on-surface-variant max-w-sm">Click the Run AI Match button to see our AI evaluate and rank the talent pool in real-time.</p>
              </div>
            ) : isLoading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 space-y-6">
                 {/* Skeleton Loading State */}
                 {[1,2,3].map(i => (
                    <div key={i} className="w-full h-24 rounded-xl bg-surface-container-high animate-pulse border border-outline/50" />
                 ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-2">Top Recommended Talent</h3>
                <AnimatePresence>
                  {matches.map((match, idx) => (
                    <motion.div 
                      key={match.freelancer.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.15 }}
                      className="bg-surface border border-outline rounded-xl p-5 hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-bold text-on-surface flex items-center gap-1 text-lg">
                            {match.freelancer.name} <CheckCircle2 className="w-4 h-4 text-primary" />
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                             <ShieldCheck className="w-3 h-3 text-primary" />
                             <span className="text-xs text-on-surface-variant font-medium">DoneScore™ {match.freelancer.doneScore}</span>
                          </div>
                        </div>
                        
                        {/* Circular Progress for Match % */}
                        <div className="relative w-14 h-14 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <path
                              className="text-surface-container-high"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                            />
                            <motion.path
                              className="text-primary"
                              strokeDasharray={`${match.matchPercentage}, 100`}
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              initial={{ strokeDasharray: "0, 100" }}
                              animate={{ strokeDasharray: `${match.matchPercentage}, 100` }}
                              transition={{ duration: 1, delay: 0.5 }}
                            />
                          </svg>
                          <span className="absolute text-xs font-bold text-on-surface">{match.matchPercentage}%</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-primary/5 border border-primary/10 mt-4 relative">
                        <Bot className="absolute top-3 left-3 w-4 h-4 text-primary" />
                        <p className="text-sm text-on-surface-variant pl-7 leading-relaxed">
                          <strong className="text-on-surface">AI Reason: </strong>
                          {match.aiReason}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {matches.length === 0 && (
                    <div className="text-center p-8 border border-dashed border-outline rounded-xl mt-4">
                      <p className="text-on-surface-variant">No strong matches found for this specific job.</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
