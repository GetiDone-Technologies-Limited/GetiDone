'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Zap, Users } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center bg-surface">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50" />
      
      <div className="mx-auto max-w-7xl px-6 relative z-10 w-full grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Column: Copy */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl sm:text-7xl font-bold text-white tracking-tight leading-[1.1]">
            Get Work Done.<br />
            The <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-400">Smart Way.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-on-surface-variant leading-relaxed">
            AI-powered work execution platform connecting businesses with trusted professionals through intelligent matching, secure payments, and real-time collaboration.
          </p>
          
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-on-primary hover:brightness-110 hover:scale-105 transition-all shadow-[0_0_20px_rgba(52,211,153,0.3)]"
            >
              Post a Job
            </Link>
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 rounded-xl border border-outline px-8 py-4 text-base font-semibold text-white hover:bg-white/5 transition-all"
            >
              Find Work
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-6 text-sm font-medium text-on-surface-variant">
            <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> AI Smart Matching</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> Secure Payments</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> Verified Professionals</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> Execution Pods™</span>
          </div>
        </motion.div>

        {/* Right Column: Illustration & Floating Cards */}
        <div className="relative h-[600px] hidden lg:block">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute inset-0 bg-surface-container rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
          >
            <Image 
              src="/hero-man-laptop.png" 
              alt="Professional using a laptop" 
              fill 
              className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60" />
          </motion.div>

          {/* Floating Card 1 */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute top-12 -left-12 bg-surface-container-high/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl w-64"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Project Posted</p>
                <p className="text-xs text-on-surface-variant">SaaS Platform Dev</p>
              </div>
            </div>
          </motion.div>

          {/* Floating Card 2 */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="absolute top-1/2 -translate-y-1/2 -right-12 bg-surface-container-high/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl w-72"
          >
            <p className="text-xs font-semibold tracking-wider text-primary uppercase mb-3">AI Match Found</p>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-3">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Dan" className="w-10 h-10 rounded-full border-2 border-surface-container-high bg-slate-800" />
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sam" className="w-10 h-10 rounded-full border-2 border-surface-container-high bg-slate-800" />
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Eli" className="w-10 h-10 rounded-full border-2 border-surface-container-high bg-slate-800" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">98%</div>
                <div className="text-xs text-on-surface-variant">Match Score</div>
              </div>
            </div>
          </motion.div>

          {/* Floating Card 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="absolute bottom-12 -left-4 bg-surface-container-high/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl w-64"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Project Completed</p>
                <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-1"><ShieldCheck className="w-3 h-3" /> Escrow Protected</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">
                <Zap className="w-4 h-4" />
              </div>
            </div>
          </motion.div>

          {/* Connecting lines SVG (Abstract representation) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M -10,20 Q 50,50 110,80" fill="none" stroke="#34D399" strokeWidth="0.5" strokeDasharray="2,2" />
             <path d="M -10,80 Q 50,50 110,20" fill="none" stroke="#34D399" strokeWidth="0.5" strokeDasharray="2,2" />
          </svg>
        </div>
      </div>
    </section>
  );
}
