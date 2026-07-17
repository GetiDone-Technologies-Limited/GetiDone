'use client';

import { motion } from 'framer-motion';

const stories = [
  {
    company: 'FinTech Innovators',
    revenue: '+210%',
    metric: 'Faster Delivery',
    quote: '"GetiDone allowed us to bypass the grueling hiring process. We built an entire engineering pod in 48 hours and shipped our MVP 2 months early."',
    author: 'Sarah Jenkins, CTO'
  },
  {
    company: 'HealthTech Global',
    revenue: '100%',
    metric: 'Compliance Rate',
    quote: '"The verified professionals and secure escrow gave us the confidence to execute a massive UI overhaul with top-tier global talent."',
    author: 'Dr. Ahmad Ali, Product Head'
  }
];

export function SuccessStoriesSection() {
  return (
    <section className="bg-surface-container-low py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Featured Success Stories</h2>
          <p className="text-lg text-on-surface-variant">See how enterprise teams are using GetiDone to accelerate growth.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {stories.map((story, i) => (
            <motion.div 
              key={story.company}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-surface rounded-3xl p-10 border border-white/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-surface-container rounded-lg border border-white/10 flex items-center justify-center font-bold text-white font-heading">
                  {story.company.charAt(0)}
                </div>
                <h4 className="text-xl font-bold text-white">{story.company}</h4>
              </div>

              <p className="text-lg text-on-surface-variant italic mb-8 relative z-10 leading-relaxed">
                {story.quote}
              </p>

              <div className="flex items-center justify-between border-t border-white/10 pt-6">
                <div>
                  <div className="text-3xl font-black text-primary">{story.revenue}</div>
                  <div className="text-sm text-on-surface-variant font-medium mt-1">{story.metric}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-white">{story.author}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
