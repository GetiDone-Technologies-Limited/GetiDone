'use client';

import { motion } from 'framer-motion';

export function TrustedBySection() {
  const logos = [
    { name: 'paystack', svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><rect width="24" height="24" rx="4"/></svg> },
    { name: 'Flutterwave', svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2L2 22h20L12 2z"/></svg> },
    { name: 'HubSpot', svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><circle cx="12" cy="12" r="10"/></svg> },
    { name: 'Moniepoint', svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M3 3h18v18H3z"/></svg> },
    { name: 'Interswitch', svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M4 12h16M12 4v16"/></svg> },
    { name: 'AWS', svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2L2 22h20L12 2z"/></svg> },
    { name: 'Google Cloud', svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><circle cx="12" cy="12" r="10"/></svg> }
  ];

  return (
    <section className="bg-surface py-16 border-y border-outline-variant">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-sm font-semibold tracking-wider text-slate-500 uppercase mb-8">
          Trusted by forward-thinking companies and individuals
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-20">
          {logos.map((logo, i) => (
            <motion.div 
              key={logo.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-xl font-bold font-heading text-slate-400 hover:text-slate-900 transition-colors duration-300"
            >
              {logo.svg}
              {logo.name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
