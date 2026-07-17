'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function CTASection() {
  return (
    <section className="bg-surface py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="mx-auto max-w-4xl px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl sm:text-7xl font-bold text-white mb-8 tracking-tight">Ready to Get Work Done?</h2>
          <p className="text-xl text-on-surface-variant mb-12 max-w-2xl mx-auto">
            Join the premium network of forward-thinking companies and top-tier professionals executing flawlessly.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex justify-center items-center rounded-xl bg-primary px-10 py-5 text-lg font-bold text-on-primary hover:brightness-110 hover:scale-105 transition-all shadow-[0_0_30px_rgba(52,211,153,0.4)]"
            >
              Post a Job
            </Link>
            <Link
              href="/register?type=freelancer"
              className="w-full sm:w-auto inline-flex justify-center items-center rounded-xl bg-white px-10 py-5 text-lg font-bold text-surface hover:bg-slate-200 transition-all"
            >
              Join as Freelancer
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
