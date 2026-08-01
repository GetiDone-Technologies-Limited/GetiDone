'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Wand2, ShieldCheck, Lock, CheckCircle2, Package, Users, Calendar,
  ArrowRight, GitBranch, Terminal, DollarSign, Brain, Sparkles, Layers,
  Compass, FileEdit, Check
} from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { ThemeToggle } from '@/shared/components/common/ThemeToggle';

const clientSteps = [
  {
    step: '01',
    title: 'Define Requirements or Pick a Package',
    desc: 'Post a custom job spec outlining your budget and scope, or select a pre-packaged 3-tier Service Package from our Gig Marketplace.',
    icon: Package,
    detail: 'Choose between Basic, Standard, and Premium packages with defined turnaround times and pre-set test specs.'
  },
  {
    step: '02',
    title: 'AI Matching & Blueprint Consultation',
    desc: 'GetiDone’s AI matches you with the top 3% of vetted talent (95%+ Done Score) in under 60 seconds. Optionally book a 30-min strategy session.',
    icon: Wand2,
    detail: '100% of consultation fees are automatically credited toward your active project escrow if you hire within 14 days.'
  },
  {
    step: '03',
    title: 'Fund QA-Gated Escrow',
    desc: 'Deposit milestone funds safely into Escrow. Watch real-time code commits, automated test runs, and live preview deployments on your dashboard.',
    icon: Lock,
    detail: 'No guesswork. Code must pass automated Playwright and Jest test gates before deliverables reach your review.'
  },
  {
    step: '04',
    title: 'Approve & Release Payment',
    desc: 'Review the sandbox preview, sign off on the verified milestone, and release escrow payment instantly to the freelancer.',
    icon: CheckCircle2,
    detail: 'Done Scores update automatically based on timeliness, code quality, and review ratings.'
  }
];

const freelancerSteps = [
  {
    step: '01',
    title: 'Build Profile & Publish Packages',
    desc: 'Set up your verified execution profile, showcase past projects, and create 3-tier Service Packages with pre-set deliverable checklists.',
    icon: FileEdit,
    detail: 'Highlight your verified Done Score and offer 24h express delivery add-ons to boost orders.'
  },
  {
    step: '02',
    title: 'Receive Job Matches & Custom Offers',
    desc: 'Get matched directly with high-intent clients or send interactive Custom Offers directly inside direct message chats (/messages).',
    icon: Sparkles,
    detail: 'Custom offer cards allow clients to fund milestone escrow in 1-click directly from message threads.'
  },
  {
    step: '03',
    title: 'Sync Telemetry & Execute Code',
    desc: 'Push commits to Git. GetiDone’s sandbox environment runs automated test suites to verify your deliverables objectively.',
    icon: GitBranch,
    detail: 'Telemetry pulse tracks active work without invasive screen monitoring or keystroke tracking.'
  },
  {
    step: '04',
    title: 'Instant Escrow Payout',
    desc: 'Upon milestone verification and sign-off, funds land directly in your wallet balance with zero hold times.',
    icon: DollarSign,
    detail: 'Maintain high Done Scores to earn badges like TOP RATED and VERIFIED EXECUTIONER.'
  }
];

export default function HowItWorksPage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'client' | 'freelancer'>('client');

  const steps = activeTab === 'client' ? clientSteps : freelancerSteps;

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
            <Link href="/our-services" className="hover:text-emerald-500 transition-colors">Our Services</Link>
            <Link href="/how-it-works" className="text-emerald-500 font-bold">How It Works</Link>
            <Link href="/services" className="hover:text-emerald-500 transition-colors">Service Packages</Link>
            <Link href="/freelancers" className="hover:text-emerald-500 transition-colors">Find Talent</Link>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
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
            <Compass className="w-3.5 h-3.5" />
            <span>THE GETIDONE WORKFLOW</span>
          </div>

          <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15]" style={{ fontFamily: "'Sora', sans-serif" }}>
            How GetiDone Works<span className="text-emerald-500">.</span>
          </h1>

          <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--muted)' }}>
            From requirement specification to automated QA verification and instant escrow payouts—here is how modern software gets done.
          </p>

          {/* Pathway Switcher */}
          <div className="pt-4 flex justify-center">
            <div className="inline-flex p-1.5 rounded-2xl bg-[var(--bg-alt)] border border-[var(--border)]">
              <button
                type="button"
                onClick={() => setActiveTab('client')}
                className={`px-6 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'client' ? 'bg-[var(--sidebar)] text-white shadow-md' : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`}
              >
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Client (Buyer) Workflow</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('freelancer')}
                className={`px-6 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'freelancer' ? 'bg-[var(--sidebar)] text-white shadow-md' : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`}
              >
                <GitBranch className="w-4 h-4 text-teal-400" />
                <span>Freelancer (Seller) Workflow</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Workflow Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => {
            const IconComp = s.icon;
            return (
              <div key={s.step} className="gd-card p-6 flex flex-col justify-between space-y-4 border hover:border-emerald-500/40 transition-all duration-300">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-500/10 text-emerald-600 font-bold">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-black text-slate-300" style={{ fontFamily: "'Sora', sans-serif" }}>
                      STEP {s.step}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-lg leading-snug" style={{ fontFamily: "'Sora', sans-serif" }}>
                    {s.title}
                  </h3>

                  <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
                    {s.desc}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[var(--bg-alt)] border border-[var(--border)] text-[11px] text-[var(--muted)] font-medium">
                  <span className="font-bold text-emerald-600 block mb-0.5">KEY HIGHLIGHT:</span>
                  {s.detail}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Engine Technical Breakdown */}
      <section className="py-20 px-6 border-t" style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}>
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider border" style={{ background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--primary)' }}>
              UNDER THE HOOD
            </div>
            <h2 className="font-extrabold text-3xl sm:text-4xl" style={{ fontFamily: "'Sora', sans-serif" }}>
              The Telemetry & QA Execution Engine
            </h2>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              Why founders trust GetiDone for mission-critical software execution.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="gd-card p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base" style={{ fontFamily: "'Sora', sans-serif" }}>Done Score™ Evaluation</h3>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>
                Real-time scoring algorithm evaluating timeliness, Git commit frequency, unit test pass rates, and review feedback.
              </p>
            </div>

            <div className="gd-card p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500 text-white flex items-center justify-center font-bold">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base" style={{ fontFamily: "'Sora', sans-serif" }}>Automated Test Gates</h3>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>
                Code deliverables are automatically deployed into isolated sandbox containers where Playwright & Jest test suites run before review.
              </p>
            </div>

            <div className="gd-card p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500 text-white flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base" style={{ fontFamily: "'Sora', sans-serif" }}>0-Risk Escrow Release</h3>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>
                Funds remain securely held in Escrow and release only upon client milestone approval or verified automated test pass.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#0A0F0D] to-[#121815] text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="font-extrabold text-3xl sm:text-4xl" style={{ fontFamily: "'Sora', sans-serif" }}>
            Ready to Start Getting Things Done?
          </h2>
          <p className="text-sm text-slate-300 max-w-lg mx-auto">
            Join thousands of modern founders and executioners scaling on GetiDone.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/register" className="btn-primary px-8 py-3.5 rounded-xl font-bold text-sm">
              Create Your Account
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
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/our-services" className="hover:text-white">Services</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
