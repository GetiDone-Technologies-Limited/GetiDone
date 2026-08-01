'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Package, Users, Calendar, ShieldCheck, Zap, ArrowRight, CheckCircle2,
  Brain, Code, Terminal, Layers, Sparkles, Star, Lock, DollarSign
} from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';

const services = [
  {
    id: 'packages',
    title: 'Fixed-Price Service Packages',
    badge: 'FIVERR-STYLE GIG CATALOG',
    icon: Package,
    accent: 'from-emerald-500/20 to-teal-500/20 text-emerald-500',
    desc: 'Browse standardized 3-tier packages (Basic, Standard, Premium) from verified top-tier executioners. Order instantly with 1-click escrow protection.',
    features: [
      '3-Tier Price & Deliverable Switcher',
      'Turnaround Times & Express 24h Add-ons',
      'Pre-configured QA Test Specifications',
      '1-Click Escrow Checkout'
    ],
    actionText: 'Browse Service Packages',
    actionHref: '/services'
  },
  {
    id: 'talent',
    title: 'AI Talent Matching & Custom Contracts',
    badge: 'UPWORK-STYLE TALENT MARKETPLACE',
    icon: Users,
    accent: 'from-teal-500/20 to-cyan-500/20 text-teal-500',
    desc: 'Post custom project requirements and let GetiDone’s AI match you with top 3% vetted talent in under 60 seconds based on verified Done Scores.',
    features: [
      'Done Score™ Verified Ranks (95%+ Match)',
      'Custom Milestone Proposals & Bidding',
      'In-Chat Custom Milestone Offers in /messages',
      'Hourly Work Diary & Telemetry Tracking'
    ],
    actionText: 'Find Top Talent',
    actionHref: '/freelancers'
  },
  {
    id: 'consultations',
    title: '1-on-1 Paid Strategy Consultations',
    badge: 'UPWORK-STYLE BLUEPRINTING',
    icon: Calendar,
    accent: 'from-cyan-500/20 to-blue-500/20 text-cyan-500',
    desc: 'Book 30-minute or 60-minute 1-on-1 strategy sessions with senior architects to review PRDs, database schemas, and project roadmaps before hiring.',
    features: [
      'Direct Calendar Slot Booking',
      '100% Fee Credit Toward Project Escrow',
      'AI-Generated Project PRD Blueprint',
      'Senior Architecture Guidance'
    ],
    actionText: 'Book a Consultation',
    actionHref: '/freelancers'
  },
  {
    id: 'pods',
    title: 'Enterprise Micro-POD Squads',
    badge: 'ENTERPRISE TEAM ASSEMBLY',
    icon: Layers,
    accent: 'from-purple-500/20 to-indigo-500/20 text-purple-500',
    desc: 'Assemble multi-role execution teams (Lead Full-Stack Dev, UI/UX Architect, QA Engineer) in 1-click for end-to-end enterprise product builds.',
    features: [
      'Multi-Role Cross-Functional PODs',
      'Dedicated Technical Project Lead',
      'Unified Milestone Escrow',
      '24/7 Priority SLA Support'
    ],
    actionText: 'Explore Team PODs',
    actionHref: '/team'
  }
];

export default function OurServicesPage() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-xl border-b transition-colors" style={{ background: 'var(--navbar-bg)', borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="getidone-text text-2xl font-black">
            <span style={{ color: 'var(--text)' }}>Geti</span><span style={{ color: 'var(--primary)' }}>Done</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold" style={{ color: 'var(--muted)' }}>
            <Link href="/about" className="hover:text-emerald-500 transition-colors">About Us</Link>
            <Link href="/our-services" className="text-emerald-500 font-bold">Our Services</Link>
            <Link href="/how-it-works" className="hover:text-emerald-500 transition-colors">How It Works</Link>
            <Link href="/services" className="hover:text-emerald-500 transition-colors">Service Packages</Link>
            <Link href="/freelancers" className="hover:text-emerald-500 transition-colors">Find Talent</Link>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <Link href={user.role === 'CLIENT' ? '/client' : '/freelancer'} className="btn-primary text-sm px-4 py-2.5 rounded-xl font-bold flex items-center gap-2">
                <span>Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link href="/register" className="btn-primary text-sm px-5 py-2.5 rounded-xl font-bold flex items-center gap-2">
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border" style={{ background: 'rgba(16,185,129,0.1)', borderColor: 'rgba(16,185,129,0.2)', color: 'var(--primary)' }}>
            <Zap className="w-3.5 h-3.5" />
            <span>FULL EXECUTION PLATFORM</span>
          </div>

          <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15]" style={{ fontFamily: "'Sora', sans-serif" }}>
            Our Service Offerings<span className="text-emerald-500">.</span>
          </h1>

          <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--muted)' }}>
            Combining the simplicity of Fiverr&apos;s productized packages with the power of Upwork&apos;s custom talent marketplace—all backed by 0-risk automated test gates.
          </p>
        </div>
      </section>

      {/* Services Breakdown Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          {services.map((s) => {
            const IconComp = s.icon;
            return (
              <div key={s.id} className="gd-card p-8 lg:p-10 border group hover:border-emerald-500/40 transition-all duration-300">
                <div className="grid lg:grid-cols-3 gap-8 items-center">
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${s.accent}`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-extrabold tracking-widest text-emerald-600 uppercase">
                        {s.badge}
                      </span>
                    </div>

                    <h2 className="font-extrabold text-2xl sm:text-3xl" style={{ fontFamily: "'Sora', sans-serif" }}>
                      {s.title}
                    </h2>

                    <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                      {s.desc}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      {s.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs font-semibold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Card */}
                  <div className="p-6 rounded-2xl bg-[var(--bg-alt)] border border-[var(--border)] flex flex-col justify-between space-y-6 text-center lg:text-left">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-[var(--soft)] mb-1">AVAILABLE NOW</div>
                      <div className="font-extrabold text-lg" style={{ fontFamily: "'Sora', sans-serif" }}>Verified Protection</div>
                      <p className="text-xs mt-1 text-[var(--muted)]">100% Escrow funding & automated QA test validation.</p>
                    </div>

                    <Link href={s.actionHref} className="btn-primary py-3 rounded-xl text-xs font-bold text-center block">
                      {s.actionText}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#0A0F0D] to-[#121815] text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="font-extrabold text-3xl sm:text-4xl" style={{ fontFamily: "'Sora', sans-serif" }}>
            Ready to Explore Service Packages & Talent?
          </h2>
          <p className="text-sm text-slate-300 max-w-lg mx-auto">
            Browse verified service packages or post a job requirement for instant AI matching.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/services" className="btn-primary px-8 py-3.5 rounded-xl font-bold text-sm">
              Browse Service Packages
            </Link>
            <Link href="/freelancers" className="btn-ghost px-8 py-3.5 rounded-xl font-bold text-sm text-white border-white/20">
              Find Vetted Talent
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t text-xs" style={{ background: '#0A0F0D', borderColor: 'rgba(255,255,255,0.08)', color: '#94A39A' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 GetiDone Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/how-it-works" className="hover:text-white">How It Works</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
