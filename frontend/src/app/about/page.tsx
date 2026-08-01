'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Brain, ShieldCheck, Zap, Users, ArrowRight, CheckCircle2,
  TrendingUp, Award, Globe, Heart, Sparkles, Code, Star
} from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';

const values = [
  {
    icon: ShieldCheck,
    title: 'Verified Execution First',
    desc: 'We replace unverified claim-based bidding with objective code telemetry, automated test gates, and 100% Escrow protection.',
    color: 'from-emerald-500/20 to-teal-500/20 text-emerald-500'
  },
  {
    icon: Brain,
    title: 'AI-Powered Precision',
    desc: 'Our proprietary Done Score algorithm matches clients with the top 3% of vetted talent in under 60 seconds.',
    color: 'from-teal-500/20 to-cyan-500/20 text-teal-500'
  },
  {
    icon: Users,
    title: 'Collaborative Micro-PODs',
    desc: 'We empower cross-functional execution squads (Lead Devs, UI/UX Designers, QA Specialists) to deliver enterprise software seamlessly.',
    color: 'from-cyan-500/20 to-blue-500/20 text-cyan-500'
  },
  {
    icon: Globe,
    title: 'Global Talent Inclusivity',
    desc: 'Connecting world-class founders and executioners across 120+ countries with instant, zero-hold payouts.',
    color: 'from-lime-500/20 to-green-500/20 text-lime-500'
  }
];

const stats = [
  { label: 'Verified Projects Delivered', value: '25,000+' },
  { label: 'Active Global Talent', value: '10,000+' },
  { label: 'Escrow Funds Protected', value: '$45M+' },
  { label: 'Average Match Time', value: '60 Secs' }
];

const team = [
  {
    name: 'Alexander Wright',
    role: 'Co-Founder & CEO',
    avatar: 'https://picsum.photos/seed/alexwright/200/200.jpg',
    bio: 'Former VP of Engineering at Stripe & Founder of 2 Tech SaaS startups.'
  },
  {
    name: 'Elena Rostova',
    role: 'Chief Product Architect',
    avatar: 'https://picsum.photos/seed/elena/200/200.jpg',
    bio: 'Pioneer in AI matching algorithms and automated QA execution engines.'
  },
  {
    name: 'Marcus Vance',
    role: 'Head of Developer Ecosystem',
    avatar: 'https://picsum.photos/seed/marcusvance/200/200.jpg',
    bio: 'Passionate about empowering remote engineering talent and Micro-POD squads globally.'
  }
];

export default function AboutPage() {
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
            <Link href="/about" className="text-emerald-500 font-bold">About Us</Link>
            <Link href="/our-services" className="hover:text-emerald-500 transition-colors">Our Services</Link>
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
            <Sparkles className="w-3.5 h-3.5" />
            <span>OUR MISSION & STORY</span>
          </div>

          <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15]" style={{ fontFamily: "'Sora', sans-serif" }}>
            Reinventing Freelance Hiring Through <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-lime-500 bg-clip-text text-transparent">Verified Execution.</span>
          </h1>

          <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--muted)' }}>
            GetiDone was built to replace unverified proposals and endless manual vetting with AI-powered matching, automated QA test gates, and 100% Escrow protection.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 px-6 border-t border-b" style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-emerald-600" style={{ fontFamily: "'Sora', sans-serif" }}>
                {s.value}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-extrabold text-3xl sm:text-4xl mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>
              Our Core Principles
            </h2>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              The foundational pillars that power the GetiDone ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v, idx) => {
              const IconComp = v.icon;
              return (
                <div key={idx} className="gd-card p-8 space-y-4 hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${v.color}`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-xl" style={{ fontFamily: "'Sora', sans-serif" }}>
                    {v.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 px-6 border-t" style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}>
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-extrabold text-3xl sm:text-4xl mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>
              Meet Our Leadership
            </h2>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              Engineers, designers, and visionaries shaping the future of work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((m, idx) => (
              <div key={idx} className="gd-card p-6 text-center space-y-4">
                <img src={m.avatar} className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-emerald-500/40" alt={m.name} />
                <div>
                  <h3 className="font-extrabold text-lg" style={{ fontFamily: "'Sora', sans-serif" }}>{m.name}</h3>
                  <div className="text-xs font-bold text-emerald-600 mb-2">{m.role}</div>
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#0A0F0D] to-[#121815] text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="font-extrabold text-3xl sm:text-4xl" style={{ fontFamily: "'Sora', sans-serif" }}>
            Ready to Experience Verified Execution?
          </h2>
          <p className="text-sm text-slate-300 max-w-lg mx-auto">
            Join thousands of founders and top freelancers executing software projects with 0% risk.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/register" className="btn-primary px-8 py-3.5 rounded-xl font-bold text-sm">
              Start Hiring Now
            </Link>
            <Link href="/services" className="btn-ghost px-8 py-3.5 rounded-xl font-bold text-sm text-white border-white/20">
              Browse Service Packages
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
            <Link href="/our-services" className="hover:text-white">Services</Link>
            <Link href="/how-it-works" className="hover:text-white">How It Works</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
