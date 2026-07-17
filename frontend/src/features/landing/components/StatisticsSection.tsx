'use client';

import { motion } from 'framer-motion';

export function StatisticsSection() {
  const stats = [
    { value: '50,000+', label: 'Verified Professionals' },
    { value: '98%', label: 'Success Rate' },
    { value: '120+', label: 'Countries' },
    { value: '$25M+', label: 'Projects Completed' }
  ];

  return (
    <section className="bg-surface-container border-y border-white/5 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10 text-center">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="px-4"
            >
              <div className="text-4xl sm:text-5xl font-black text-white mb-2">{stat.value}</div>
              <div className="text-sm font-semibold tracking-wider text-primary uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
