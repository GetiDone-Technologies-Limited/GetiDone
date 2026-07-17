'use client';

import { motion } from 'framer-motion';
import { PenTool, Search, MessageSquare, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: PenTool,
    title: 'Post a Job',
    description: 'Describe your project and set your requirements in minutes.'
  },
  {
    icon: Search,
    title: 'AI Matches Talent',
    description: 'Our proprietary engine matches you with the perfect verified professional.'
  },
  {
    icon: MessageSquare,
    title: 'Collaborate',
    description: 'Use Execution Pods™ to chat, share files, and manage milestones.'
  },
  {
    icon: CheckCircle,
    title: 'Get It Done',
    description: 'Approve the final deliverables and release escrow payments securely.'
  }
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-surface-container-low py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-on-surface mb-6">How It Works</h2>
          <p className="text-lg text-on-surface-variant">A streamlined, AI-first approach to executing work efficiently and securely.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent -translate-y-1/2 z-0" />

          {steps.map((step, i) => (
            <motion.div 
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="relative z-10 bg-surface-container border border-outline rounded-2xl p-8 hover:border-primary/50 transition-colors shadow-lg"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <step.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3">{step.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
