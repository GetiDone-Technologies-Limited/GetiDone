'use client';

import { motion } from 'framer-motion';
import { BrainCircuit, Users, Lock, Shield } from 'lucide-react';

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Smart Matching',
    description: 'We don\'t do bidding. Our AI algorithm analyzes your project and instantly connects you with the top 1% of suitable professionals based on skills, availability, and past performance.'
  },
  {
    icon: Users,
    title: 'Execution Pods™',
    description: 'Create dedicated virtual workspaces for your teams and freelancers. Share files, track milestones, and communicate in real-time, all within one secure environment.'
  },
  {
    icon: Lock,
    title: 'Escrow Protection',
    description: 'Your funds are held securely in escrow. Payments are only released when you approve the delivered work, ensuring 100% peace of mind for both clients and freelancers.'
  },
  {
    icon: Shield,
    title: 'Verified Trust System',
    description: 'Every professional undergoes strict KYC verification. Our proprietary DoneScore™ rating system continuously evaluates performance, reliability, and quality.'
  }
];

export function WhyChooseSection() {
  return (
    <section className="bg-surface py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h3 className="text-sm font-bold tracking-widest text-primary uppercase mb-4">Why Choose GetiDone</h3>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Built for Trust. Designed for Results.</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, i) => (
            <motion.div 
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-surface-container border border-white/5 rounded-3xl p-10 hover:border-primary/30 transition-colors flex flex-col sm:flex-row gap-6 items-start group"
            >
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <feature.icon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
