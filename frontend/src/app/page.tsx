'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Zap, ArrowRight, Plus, PlayCircle, Star, Brain, ShieldCheck,
  TrendingUp, Headset, FileEdit, Wand2, Handshake, CheckCheck,
  Sun, Moon, ChevronRight, Check
} from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';

export default function LandingPage() {
  const { user } = useAuthStore();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-xl border-b transition-colors" style={{ background: 'var(--navbar-bg)', borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="getidone-text">
            <span style={{ color: 'var(--text)' }}>Geti</span><span style={{ color: 'var(--primary)' }}>Done</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold" style={{ color: 'var(--muted)' }}>
            <a href="#features" className="hover:text-emerald-500 transition-colors">Features</a>
            <a href="#process" className="hover:text-emerald-500 transition-colors">How It Works</a>
            <a href="#categories" className="hover:text-emerald-500 transition-colors">Categories</a>
            <a href="#testimonials" className="hover:text-emerald-500 transition-colors">Reviews</a>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Switcher Toggle */}
            <button
              onClick={toggleTheme}
              className="relative w-14 h-8 rounded-full p-1 transition-colors flex items-center justify-between cursor-pointer"
              style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)' }}
              title="Toggle Dark / Light Theme"
            >
              <Sun className="w-3.5 h-3.5 text-amber-500 z-10" />
              <Moon className="w-3.5 h-3.5 text-slate-400 z-10" />
              <span
                className="absolute top-1 left-1 w-6 h-6 rounded-full bg-[var(--primary)] transition-transform duration-300 shadow-md"
                style={{ transform: isDarkMode ? 'translateX(24px)' : 'translateX(0)' }}
              />
            </button>

            {user ? (
              <Link
                href={user.role === 'CLIENT' ? '/client' : '/freelancer'}
                className="btn-primary text-sm px-4 py-2.5 rounded-xl font-bold flex items-center gap-2"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link href="/login" className="btn-ghost px-4 py-2.5 rounded-xl text-sm font-semibold hidden sm:block">
                  Log in
                </Link>
                <Link href="/register" className="btn-primary text-sm px-5 py-2.5 rounded-xl font-bold flex items-center gap-2">
                  <span>Start Hiring</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left Text */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-bold tracking-wider uppercase border" style={{ background: 'rgba(16,185,129,0.1)', borderColor: 'rgba(16,185,129,0.2)', color: 'var(--primary)' }}>
              <Zap className="w-3.5 h-3.5" />
              <span>AI-POWERED HIRING MARKETPLACE</span>
            </div>

            <h1 className="font-extrabold text-5xl md:text-6xl leading-[1.1] mb-6" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text)' }}>
              Hire the Top 3% of Global Talent. <span className="bg-gradient-to-r from-emerald-500 to-lime-500 bg-clip-text text-transparent">In 60 Seconds.</span>
            </h1>

            <p className="text-lg mb-8 max-w-lg leading-relaxed" style={{ color: 'var(--muted)' }}>
              Stop sifting through endless proposals. GetiDone’s AI matches you with the perfect verified freelancer instantly. Post a job, get matched, and scale your team effortlessly.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="/jobs/new" className="btn-primary text-base px-8 py-4 rounded-xl font-bold flex items-center gap-2">
                <Plus className="w-5 h-5" />
                <span>Post a Job - It&apos;s Free</span>
              </Link>
              <a href="#process" className="btn-ghost text-base px-8 py-4 rounded-xl font-semibold flex items-center gap-2">
                <PlayCircle className="w-5 h-5 text-emerald-500" />
                <span>See How It Works</span>
              </a>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex -space-x-4">
                {['user1', 'user2', 'user3', 'user4'].map((u, i) => (
                  <img
                    key={u}
                    src={`https://picsum.photos/seed/${u}/100/100.jpg`}
                    className="w-12 h-12 rounded-full border-4 border-white object-cover"
                    alt="User"
                  />
                ))}
              </div>
              <div>
                <div className="flex text-amber-400 text-sm">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-xs font-semibold mt-1" style={{ color: 'var(--soft)' }}>
                  Trusted by 10,000+ founders
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="relative">
            <div className="gd-card p-6 border shadow-2xl relative z-10" style={{ background: 'var(--card)' }}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>GetiDone AI Match</div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl border flex items-center gap-3" style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-500/20 text-emerald-600">
                    <FileEdit className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-bold tracking-wider uppercase text-[var(--soft)]">REQUIREMENTS</div>
                    <div className="font-bold text-sm" style={{ color: 'var(--text)' }}>React & Next.js Developer Needed</div>
                  </div>
                  <CheckCheck className="w-5 h-5 text-emerald-500" />
                </div>

                <div className="p-4 rounded-2xl border-2 border-emerald-500 bg-emerald-500/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-500 text-white font-bold">
                    <Wand2 className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-bold tracking-wider uppercase text-emerald-600">INSTANT MATCH</div>
                    <div className="font-bold text-sm" style={{ color: 'var(--text)' }}>Daniel Benson (98% Match)</div>
                  </div>
                  <div className="text-2xl font-extrabold text-emerald-600" style={{ fontFamily: "'Sora', sans-serif" }}>98%</div>
                </div>
              </div>
            </div>

            {/* Floating Hired Badge */}
            <div className="absolute -bottom-6 -right-6 px-6 py-4 rounded-2xl bg-emerald-500 text-white shadow-xl z-20">
              <div className="text-xs font-bold uppercase tracking-wider opacity-90">Hired in</div>
              <div className="text-2xl font-extrabold" style={{ fontFamily: "'Sora', sans-serif" }}>60 Secs</div>
            </div>
          </div>
        </div>

        {/* Trust Bar */}
        <div className="max-w-7xl mx-auto mt-24">
          <p className="text-center text-xs font-bold tracking-widest uppercase mb-8" style={{ color: 'var(--soft)' }}>
            TRUSTED BY LEADING COMPANIES & STARTUPS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16 opacity-60 font-extrabold text-xl" style={{ color: 'var(--muted)', fontFamily: "'Sora', sans-serif" }}>
            <span>Paystack</span>
            <span>Flutterwave</span>
            <span>TechNova</span>
            <span>Frame.io</span>
            <span>Innovatech</span>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full mb-4 text-xs font-bold uppercase tracking-wider border" style={{ background: 'rgba(16,185,129,0.1)', borderColor: 'rgba(16,185,129,0.2)', color: 'var(--primary)' }}>
              WHY GETIDONE
            </div>
            <h2 className="font-extrabold text-4xl mb-4" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text)' }}>
              Everything You Need to Scale Your Team
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
              From AI matching to secure escrow payments, we&apos;ve built the ultimate platform for modern execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[250px]">
            {/* AI Matching Large Card */}
            <div className="lg:col-span-2 lg:row-span-2 gd-card relative overflow-hidden group p-8 flex flex-col justify-end">
              <img src="https://picsum.photos/seed/aitech/800/600.jpg" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="AI Tech" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="relative z-10 text-white">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-emerald-500 shadow-lg shadow-emerald-500/40">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-extrabold text-2xl mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>AI-Powered Matching</h3>
                <p className="text-sm opacity-80 max-w-md">
                  Stop wasting time on bad hires. Our algorithm analyzes your job requirements and instantly matches you with the top 3% of vetted professionals.
                </p>
              </div>
            </div>

            {/* Escrow Card */}
            <div className="gd-card p-8 flex flex-col justify-between" style={{ background: 'var(--bg-alt)' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-emerald-500 bg-white border" style={{ borderColor: 'var(--border)' }}>
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-xl mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>Secure Escrow</h3>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>Funds are held safely until you approve the work. Zero risk, 100% protection.</p>
              </div>
            </div>

            {/* Talent Card */}
            <div className="gd-card relative overflow-hidden group p-6 flex flex-col justify-end">
              <img src="https://picsum.photos/seed/talent1/400/400.jpg" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Talent" />
              <div className="absolute top-4 left-4 px-3 py-1 bg-emerald-500 rounded-full text-xs font-bold text-white z-10">VETTED</div>
              <div className="relative z-10 text-white font-bold">Top 3% Global Talent</div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>

            {/* Analytics Card */}
            <div className="gd-card p-8 flex flex-col justify-between" style={{ background: 'var(--bg-alt)' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lime-500 bg-white border" style={{ borderColor: 'var(--border)' }}>
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-xl mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>Smart Analytics</h3>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>Track project velocity, spending, and team performance in real-time.</p>
              </div>
            </div>

            {/* Support Card */}
            <div className="lg:col-span-2 gd-card relative overflow-hidden group p-8 flex flex-col justify-end">
              <img src="https://picsum.photos/seed/support/800/400.jpg" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Support" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="relative z-10 text-white">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 bg-lime-500 shadow-lg shadow-lime-500/40">
                  <Headset className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-extrabold text-xl mb-1" style={{ fontFamily: "'Sora', sans-serif" }}>24/7 VIP Support</h3>
                <p className="text-xs opacity-80">Dedicated account management for enterprise teams. We&apos;re always here to help.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (4 Steps) */}
      <section id="process" className="py-24 px-6 border-t border-b" style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full mb-4 text-xs font-bold uppercase tracking-wider border" style={{ background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--primary)' }}>
              HOW IT WORKS
            </div>
            <h2 className="font-extrabold text-4xl mb-4" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text)' }}>
              Work Made Simple in 4 Steps
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
              From concept to completion, we&apos;ve streamlined the entire execution workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { step: '1', title: 'Post a Job', desc: 'Tell us what you need. Outline your scope, budget, and timeline in minutes.', icon: <FileEdit className="w-7 h-7 text-emerald-500" /> },
              { step: '2', title: 'Get Matched', desc: 'Our AI instantly analyzes your needs and matches you with top vetted talent.', icon: <Wand2 className="w-7 h-7 text-lime-500" /> },
              { step: '3', title: 'Collaborate', desc: 'Chat, share files, and track project progress securely in real time.', icon: <Handshake className="w-7 h-7 text-teal-500" /> },
              { step: '4', title: 'Get It Done', desc: 'Approve milestones, release escrow funds, and launch your project.', icon: <CheckCheck className="w-7 h-7 text-amber-500" /> },
            ].map(s => (
              <div key={s.step} className="gd-card p-6 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-white border relative" style={{ borderColor: 'var(--border)' }}>
                  {s.icon}
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center justify-center shadow-md">
                    {s.step}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text)' }}>{s.title}</h3>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12">
            <div>
              <div className="inline-block px-4 py-1 rounded-full mb-4 text-xs font-bold uppercase tracking-wider border" style={{ background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--primary)' }}>
                EXPERT CATEGORIES
              </div>
              <h2 className="font-extrabold text-4xl" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text)' }}>
                Find Top Talent in Any Field
              </h2>
            </div>
            <Link href="/freelancers" className="text-sm font-bold text-emerald-500 hover:underline mt-4 md:mt-0 flex items-center gap-1">
              Browse All Categories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { name: 'Development & IT', sub: 'React, Next.js, Node, AWS', img: 'https://picsum.photos/seed/developer/600/400.jpg' },
              { name: 'UI/UX Designers', sub: 'Web, Mobile, Figma, Prototyping', img: 'https://picsum.photos/seed/designer/600/400.jpg' },
              { name: 'Digital Marketing', sub: 'SEO, Social Media, Ads', img: 'https://picsum.photos/seed/marketing/600/400.jpg' },
              { name: 'Writing & Content', sub: 'Copywriting, Blogs, Strategy', img: 'https://picsum.photos/seed/writer/600/400.jpg' },
            ].map(cat => (
              <Link key={cat.name} href="/freelancers" className="gd-card relative overflow-hidden group h-60 block">
                <img src={cat.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={cat.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6 text-white">
                  <div>
                    <h3 className="font-extrabold text-xl mb-0.5" style={{ fontFamily: "'Sora', sans-serif" }}>{cat.name}</h3>
                    <p className="text-xs text-gray-300">{cat.sub}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 border-t" style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full mb-4 text-xs font-bold uppercase tracking-wider border" style={{ background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--primary)' }}>
              CLIENT SUCCESS STORIES
            </div>
            <h2 className="font-extrabold text-4xl mb-4" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text)' }}>
              Loved by Founders & Teams
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
              Don&apos;t just take our word for it. Here&apos;s what our community has to say.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: '"GetiDone completely changed how we scale. We posted a job for a Senior React dev and had a perfect match in under two minutes. The escrow system gave us total peace of mind."',
                name: 'John Carter',
                role: 'CEO, TechNova Inc.',
                avatar: 'https://picsum.photos/seed/johnavatar/100/100.jpg',
              },
              {
                quote: '"As a freelancer, GetiDone\'s AI matching means I spend less time searching and more time doing what I love. The instant payment release is the best I\'ve seen in the industry."',
                name: 'Sarah Kim',
                role: 'Senior UI/UX Designer',
                avatar: 'https://picsum.photos/seed/sarah/100/100.jpg',
              },
              {
                quote: '"The POD Teams feature is brilliant. We hired a full development squad (Dev, QA, PM) in one click. They integrated seamlessly with our workflow. Highly recommended."',
                name: 'Marcus Lee',
                role: 'CTO, Innovatech',
                avatar: 'https://picsum.photos/seed/marcus/100/100.jpg',
              },
            ].map((t, idx) => (
              <div key={idx} className="gd-card p-8 flex flex-col justify-between">
                <div>
                  <div className="flex text-amber-400 mb-4">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text)' }}>{t.quote}</p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                  <img src={t.avatar} className="w-11 h-11 rounded-full object-cover" alt={t.name} />
                  <div>
                    <div className="font-bold text-sm" style={{ color: 'var(--text)' }}>{t.name}</div>
                    <div className="text-xs" style={{ color: 'var(--muted)' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden bg-gradient-to-br from-[#0A0F0D] to-[#121815] text-white">
        <div className="max-w-5xl mx-auto rounded-3xl p-12 text-center relative z-10">
          <h2 className="font-extrabold text-4xl md:text-5xl mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
            Ready to Get Work Done?
          </h2>
          <p className="text-base mb-8 max-w-xl mx-auto text-slate-300">
            Join thousands of companies and freelancers building the future on GetiDone. Post your first job for free today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/register" className="btn-primary text-base px-8 py-4 rounded-xl font-bold flex items-center gap-2">
              <span>Get Started for Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#features" className="btn-ghost text-base px-8 py-4 rounded-xl font-semibold border border-white/20 text-white hover:bg-white/10">
              Explore Platform
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t text-xs" style={{ background: '#0A0F0D', borderColor: 'rgba(255,255,255,0.08)', color: '#94A39A' }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <div className="getidone-text mb-4 text-xl">
              <span className="text-white">Geti</span><span className="text-[var(--primary)]">Done</span>
            </div>
            <p className="text-xs max-w-xs leading-relaxed">
              The smartest way to hire and get hired. Powered by AI, secured by escrow.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">For Clients</h4>
            <ul className="space-y-2">
              <li><Link href="/freelancers" className="hover:text-emerald-400 transition-colors">How to Hire</Link></li>
              <li><Link href="/projects" className="hover:text-emerald-400 transition-colors">Project Catalog</Link></li>
              <li><Link href="/team" className="hover:text-emerald-400 transition-colors">Enterprise PODs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">For Freelancers</h4>
            <ul className="space-y-2">
              <li><Link href="/jobs/search" className="hover:text-emerald-400 transition-colors">How to Find Work</Link></li>
              <li><Link href="/freelancer" className="hover:text-emerald-400 transition-colors">GetiDone Pro</Link></li>
              <li><Link href="/profile" className="hover:text-emerald-400 transition-colors">Community</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/settings" className="hover:text-emerald-400 transition-colors">Help & Support</Link></li>
              <li><Link href="/contracts" className="hover:text-emerald-400 transition-colors">Trust & Safety</Link></li>
              <li><Link href="/files" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <p>© 2026 GetiDone Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white">Terms</Link>
            <Link href="#" className="hover:text-white">Privacy</Link>
            <Link href="#" className="hover:text-white">Cookies</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
