'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Zap, ArrowRight, Plus, PlayCircle, Star, Brain, ShieldCheck,
  TrendingUp, Headset, FileEdit, Wand2, Handshake, CheckCheck,
  Sun, Moon, ChevronRight, Check, Search, Package, Users, Calendar,
  Code, Layout, Cpu, Megaphone, Smartphone, Server, Sparkles, X
} from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';

// ==================== MOCK FEATURED DATA ====================
const featuredCategories = [
  {
    id: 'tech',
    name: 'Programming & Tech',
    icon: Code,
    color: 'from-emerald-500/20 to-teal-500/20 text-emerald-500',
    count: '2,450+ Experts',
    subskills: ['Next.js 15', 'React', 'Node.js', 'PostgreSQL', 'TypeScript'],
    img: 'https://picsum.photos/seed/developer/600/400.jpg'
  },
  {
    id: 'ai',
    name: 'AI & Data Engineering',
    icon: Cpu,
    color: 'from-purple-500/20 to-indigo-500/20 text-purple-500',
    count: '1,820+ Experts',
    subskills: ['AI Agents', 'LLM Fine-tuning', 'Python', 'PyTorch', 'BigQuery'],
    img: 'https://picsum.photos/seed/aitech/600/400.jpg'
  },
  {
    id: 'design',
    name: 'UI/UX & Graphics',
    icon: Layout,
    color: 'from-pink-500/20 to-rose-500/20 text-pink-500',
    count: '3,100+ Experts',
    subskills: ['Figma Design System', 'Mobile App UI', 'Branding', 'Prototyping'],
    img: 'https://picsum.photos/seed/designer/600/400.jpg'
  },
  {
    id: 'mobile',
    name: 'Mobile App Dev',
    icon: Smartphone,
    color: 'from-cyan-500/20 to-blue-500/20 text-cyan-500',
    count: '1,290+ Experts',
    subskills: ['React Native', 'Flutter', 'iOS Swift', 'Android Kotlin'],
    img: 'https://picsum.photos/seed/mobileapp/600/400.jpg'
  },
  {
    id: 'devops',
    name: 'DevOps & Cloud',
    icon: Server,
    color: 'from-amber-500/20 to-orange-500/20 text-amber-500',
    count: '950+ Experts',
    subskills: ['AWS Cloud', 'Docker', 'Kubernetes', 'CI/CD Pipelines'],
    img: 'https://picsum.photos/seed/devops/600/400.jpg'
  },
  {
    id: 'marketing',
    name: 'Digital Marketing & SEO',
    icon: Megaphone,
    color: 'from-lime-500/20 to-green-500/20 text-lime-500',
    count: '1,640+ Experts',
    subskills: ['Technical SEO', 'PPC Campaigns', 'Content Strategy', 'Analytics'],
    img: 'https://picsum.photos/seed/marketing/600/400.jpg'
  }
];

const featuredPackages = [
  {
    id: 'sp1',
    title: 'Full-Stack Next.js 15 & Tailwind E-Commerce SaaS Build',
    freelancerName: 'Daniel Benson',
    freelancerAvatar: 'https://picsum.photos/seed/danielbenson/100/100.jpg',
    doneScore: 98,
    badge: 'VERIFIED EXECUTIONER',
    coverImage: 'https://picsum.photos/seed/ecommerceapp/600/400.jpg',
    rating: 4.9,
    startingPrice: 450,
    days: 3
  },
  {
    id: 'sp2',
    title: 'High-Converting Mobile App UI/UX & Figma Design System',
    freelancerName: 'Sarah Kim',
    freelancerAvatar: 'https://picsum.photos/seed/sarah/100/100.jpg',
    doneScore: 96,
    badge: 'TOP RATED',
    coverImage: 'https://picsum.photos/seed/saasdashboard/600/400.jpg',
    rating: 5.0,
    startingPrice: 350,
    days: 2
  },
  {
    id: 'sp3',
    title: 'AWS Cloud Infrastructure, Docker Containerization & CI/CD',
    freelancerName: 'Tunde A.',
    freelancerAvatar: 'https://picsum.photos/seed/tunde/100/100.jpg',
    doneScore: 94,
    badge: 'RISING TALENT',
    coverImage: 'https://picsum.photos/seed/devops/600/400.jpg',
    rating: 4.9,
    startingPrice: 300,
    days: 2
  }
];

const featuredExecutioners = [
  {
    id: 1,
    name: 'Sarah Kim',
    role: 'Lead UI/UX Architect',
    avatar: 'https://picsum.photos/seed/sarah/100/100.jpg',
    doneScore: 98,
    badge: 'VERIFIED EXECUTIONER',
    rating: 4.9,
    rate: 75,
    skills: ['Figma System', 'UI/UX Design', 'Prototyping', 'React']
  },
  {
    id: 2,
    name: 'Marcus Lee',
    role: 'Full Stack & Mobile Architect',
    avatar: 'https://picsum.photos/seed/marcus/100/100.jpg',
    doneScore: 99,
    badge: 'TOP RATED',
    rating: 4.8,
    rate: 95,
    skills: ['React Native', 'Next.js 15', 'Node.js', 'PostgreSQL']
  },
  {
    id: 3,
    name: 'Alex Chen',
    role: 'AI Agent & Data Specialist',
    avatar: 'https://picsum.photos/seed/alex/100/100.jpg',
    doneScore: 97,
    badge: 'VERIFIED EXECUTIONER',
    rating: 4.9,
    rate: 85,
    skills: ['Python AI', 'LLMs', 'BigQuery', 'LangChain']
  }
];

interface ToastState {
  title: string;
  msg: string;
  visible: boolean;
}

export default function LandingPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Search State
  const [searchMode, setSearchMode] = useState<'talent' | 'services'>('services');
  const [searchQuery, setSearchQuery] = useState('');

  // Consultation Modal State
  const [showConsultModal, setShowConsultModal] = useState(false);
  const [selectedTalent, setSelectedTalent] = useState<typeof featuredExecutioners[0] | null>(null);
  const [consultDate, setConsultDate] = useState('');
  const [consultTime, setConsultTime] = useState('10:00 AM');
  const [consultDuration, setConsultDuration] = useState<'30' | '60'>('30');

  const [toastState, setToastState] = useState<ToastState>({ title: '', msg: '', visible: false });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const showToast = (title: string, msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastState({ title, msg, visible: true });
    toastTimer.current = setTimeout(() => setToastState(t => ({ ...t, visible: false })), 3200);
  };

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchMode === 'services') {
      router.push(`/services?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push(`/freelancers?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleBookConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTalent || !consultDate) return;
    const fee = consultDuration === '30' ? Math.round(selectedTalent.rate * 0.6) : selectedTalent.rate;
    showToast('Consultation Booked!', `Your ${consultDuration}-min strategy session with ${selectedTalent.name} on ${consultDate} ($${fee}) has been scheduled.`);
    setShowConsultModal(false);
  };

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-xl border-b transition-colors" style={{ background: 'var(--navbar-bg)', borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="getidone-text text-2xl font-black">
            <span style={{ color: 'var(--text)' }}>Geti</span><span style={{ color: 'var(--primary)' }}>Done</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold" style={{ color: 'var(--muted)' }}>
            <Link href="/services" className="hover:text-emerald-500 transition-colors flex items-center gap-1.5">
              <Package className="w-4 h-4 text-emerald-500" />
              <span>Service Packages</span>
            </Link>
            <Link href="/freelancers" className="hover:text-emerald-500 transition-colors flex items-center gap-1.5">
              <Users className="w-4 h-4 text-teal-500" />
              <span>Find Talent</span>
            </Link>
            <a href="#categories" className="hover:text-emerald-500 transition-colors">Categories</a>
            <a href="#guarantee" className="hover:text-emerald-500 transition-colors">Verified Model</a>
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

      {/* Hero Section with Interactive Dual Search Bar */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left Text & Interactive Search */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-bold tracking-wider uppercase border" style={{ background: 'rgba(16,185,129,0.1)', borderColor: 'rgba(16,185,129,0.2)', color: 'var(--primary)' }}>
              <Zap className="w-3.5 h-3.5" />
              <span>VERIFIED EXECUTION & INSTANT PACKAGES</span>
            </div>

            <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-6" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text)' }}>
              Hire Vetted Executioners. <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-lime-500 bg-clip-text text-transparent">Or Buy Fixed Packages.</span>
            </h1>

            <p className="text-base sm:text-lg mb-8 max-w-lg leading-relaxed" style={{ color: 'var(--muted)' }}>
              GetiDone combines Fiverr&apos;s instant 1-click service packages with Upwork&apos;s elite talent discovery—backed by 0-risk automated test gates and Escrow protection.
            </p>

            {/* Interactive Search Bar (Fiverr / Upwork Dual Mode) */}
            <div className="gd-card p-3 border shadow-xl mb-8" style={{ background: 'var(--card)' }}>
              <div className="flex items-center gap-2 mb-2 p-1 rounded-xl bg-[var(--bg-alt)]">
                <button
                  type="button"
                  onClick={() => setSearchMode('services')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    searchMode === 'services' ? 'bg-[var(--sidebar)] text-white shadow-sm' : 'text-[var(--muted)] hover:text-[var(--text)]'
                  }`}
                >
                  <Package className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Browse Service Packages</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSearchMode('talent')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    searchMode === 'talent' ? 'bg-[var(--sidebar)] text-white shadow-sm' : 'text-[var(--muted)] hover:text-[var(--text)]'
                  }`}
                >
                  <Users className="w-3.5 h-3.5 text-teal-400" />
                  <span>Search Top Talent</span>
                </button>
              </div>

              <form onSubmit={handleHeroSearchSubmit} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--soft)' }} />
                  <input
                    type="text"
                    placeholder={searchMode === 'services' ? 'Search service packages (e.g. Next.js SaaS, Mobile App, Figma Kit)...' : 'Search top talent (e.g. Full Stack Dev, UI/UX Architect, DevOps)...'}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none bg-[var(--bg-alt)] border border-transparent focus:bg-[var(--card)] focus:border-emerald-500 transition-all"
                  />
                </div>
                <button type="submit" className="btn-primary px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2">
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Popular Search Chips */}
            <div className="flex items-center gap-2 flex-wrap text-xs font-semibold" style={{ color: 'var(--muted)' }}>
              <span className="font-bold text-[var(--soft)]">Popular:</span>
              {['Next.js 15', 'Figma Design System', 'AI Agents', 'AWS DevOps', 'React Native'].map(chip => (
                <button
                  key={chip}
                  onClick={() => {
                    setSearchQuery(chip);
                    router.push(`/services?q=${encodeURIComponent(chip)}`);
                  }}
                  className="px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--card)] hover:border-emerald-500 hover:text-emerald-600 transition-colors cursor-pointer"
                >
                  {chip}
                </button>
              ))}
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
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-600">VERIFIED EXECUTION ENGINE</div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl border flex items-center gap-3" style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-500/20 text-emerald-600">
                    <Package className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-bold tracking-wider uppercase text-[var(--soft)]">INSTANT PACKAGE ORDER</div>
                    <div className="font-bold text-sm" style={{ color: 'var(--text)' }}>Next.js 15 E-Commerce Build</div>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-600">$450</span>
                </div>

                <div className="p-4 rounded-2xl border-2 border-emerald-500 bg-emerald-500/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-500 text-white font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-bold tracking-wider uppercase text-emerald-600">DONE SCORE VERIFIED</div>
                    <div className="font-bold text-sm" style={{ color: 'var(--text)' }}>Daniel Benson (98% Done Score)</div>
                  </div>
                  <div className="text-2xl font-extrabold text-emerald-600" style={{ fontFamily: "'Sora', sans-serif" }}>98%</div>
                </div>
              </div>
            </div>

            {/* Floating Hired Badge */}
            <div className="absolute -bottom-6 -right-6 px-6 py-4 rounded-2xl bg-emerald-500 text-white shadow-xl z-20">
              <div className="text-xs font-bold uppercase tracking-wider opacity-90">Verified Escrow</div>
              <div className="text-2xl font-extrabold" style={{ fontFamily: "'Sora', sans-serif" }}>100% Safe</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories Ribbon Grid (Fiverr & Upwork Hybrid) */}
      <section id="categories" className="py-20 px-6 border-t border-b" style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12">
            <div>
              <div className="inline-block px-4 py-1 rounded-full mb-3 text-xs font-bold uppercase tracking-wider border" style={{ background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--primary)' }}>
                EXPLORE BY CATEGORY
              </div>
              <h2 className="font-extrabold text-3xl sm:text-4xl" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text)' }}>
                Find Top Executioners & Packages
              </h2>
            </div>
            <Link href="/services" className="text-sm font-bold text-emerald-600 hover:underline mt-4 md:mt-0 flex items-center gap-1.5">
              <span>View All Categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCategories.map((cat) => {
              const IconComp = cat.icon;
              return (
                <div
                  key={cat.id}
                  onClick={() => router.push(`/services?cat=${encodeURIComponent(cat.name)}`)}
                  className="gd-card group relative p-6 flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/40"
                >
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${cat.color}`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', color: 'var(--primary)' }}>
                        {cat.count}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-xl mb-1.5 group-hover:text-emerald-600 transition-colors" style={{ fontFamily: "'Sora', sans-serif" }}>
                        {cat.name}
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.subskills.map(sk => (
                          <span key={sk} className="text-[11px] font-semibold px-2 py-0.5 rounded-md text-[var(--muted)]" style={{ background: 'var(--bg-alt)' }}>
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t mt-4 flex items-center justify-between text-xs font-bold text-emerald-600" style={{ borderColor: 'var(--border)' }}>
                    <span>Browse Packages & Talent</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Service Packages (Fiverr Style Showcase) */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12">
            <div>
              <div className="inline-block px-4 py-1 rounded-full mb-3 text-xs font-bold uppercase tracking-wider border" style={{ background: 'rgba(16,185,129,0.1)', borderColor: 'rgba(16,185,129,0.2)', color: 'var(--primary)' }}>
                FIVERR-STYLE PACKAGES
              </div>
              <h2 className="font-extrabold text-3xl sm:text-4xl" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text)' }}>
                Popular Service Packages<span className="text-emerald-500">.</span>
              </h2>
              <p className="text-sm mt-1.5" style={{ color: 'var(--muted)' }}>
                Pre-packaged fixed price deliverables backed by automated test specs and escrow safety.
              </p>
            </div>
            <Link href="/services" className="btn-ghost px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5">
              <span>Explore Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPackages.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => router.push(`/services`)}
                className="gd-card group flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/40"
              >
                <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                  <img
                    src={pkg.coverImage}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-white border border-white/10">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>DONE SCORE: {pkg.doneScore}%</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
                    {pkg.badge}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <img src={pkg.freelancerAvatar} className="w-7 h-7 rounded-full object-cover" alt={pkg.freelancerName} />
                      <span className="text-xs font-bold" style={{ color: 'var(--text)' }}>{pkg.freelancerName}</span>
                    </div>

                    <h3 className="font-extrabold text-base line-clamp-2 leading-snug" style={{ fontFamily: "'Sora', sans-serif" }}>
                      {pkg.title}
                    </h3>
                  </div>

                  <div className="pt-3 border-t flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
                    <div>
                      <div className="text-[10px] font-bold uppercase" style={{ color: 'var(--soft)' }}>STARTING AT</div>
                      <div className="text-xl font-extrabold text-emerald-600" style={{ fontFamily: "'Sora', sans-serif" }}>${pkg.startingPrice}</div>
                    </div>
                    <span className="text-xs font-bold text-[var(--muted)]">{pkg.days} Days Delivery</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Verified Executioners (Upwork Style Talent Spotlight) */}
      <section className="py-20 px-6 border-t" style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12">
            <div>
              <div className="inline-block px-4 py-1 rounded-full mb-3 text-xs font-bold uppercase tracking-wider border" style={{ background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--primary)' }}>
                UPWORK-STYLE TALENT SPOTLIGHT
              </div>
              <h2 className="font-extrabold text-3xl sm:text-4xl" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text)' }}>
                Top Verified Executioners<span className="text-emerald-500">.</span>
              </h2>
              <p className="text-sm mt-1.5" style={{ color: 'var(--muted)' }}>
                Vetted professionals with verified Done Scores, active telemetry, and strategy consultation availability.
              </p>
            </div>
            <Link href="/freelancers" className="btn-ghost px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5">
              <span>View All Freelancers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredExecutioners.map((talent) => (
              <div key={talent.id} className="gd-card p-6 flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="relative">
                      <img src={talent.avatar} className="w-14 h-14 rounded-full object-cover border border-[var(--border)]" alt={talent.name} />
                      <span className="w-3 h-3 rounded-full bg-emerald-500 absolute bottom-0 right-0 border-2 border-white" />
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-500 text-white shadow-sm">
                        {talent.badge}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-bold mt-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{talent.rating}</span>
                        <span className="text-[var(--muted)]">({talent.doneScore}% Done)</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-extrabold text-lg leading-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
                    {talent.name}
                  </h3>
                  <p className="text-xs font-semibold mb-3 text-emerald-600">
                    {talent.role}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {talent.skills.map(sk => (
                      <span key={sk} className="text-[11px] font-semibold px-2.5 py-1 rounded-md" style={{ background: 'rgba(16,185,129,0.08)', color: 'var(--primary-dark)' }}>
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
                  <div className="text-lg font-extrabold" style={{ fontFamily: "'Sora', sans-serif" }}>
                    ${talent.rate}<span className="text-xs font-medium" style={{ color: 'var(--muted)' }}>/hr</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedTalent(talent);
                        setShowConsultModal(true);
                      }}
                      className="btn-ghost px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Consult</span>
                    </button>
                    <Link href={`/freelancers/${talent.id}`} className="btn-primary px-4 py-2 rounded-xl text-xs font-bold">
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verified Execution Guarantee (GetiDone Core Differentiator) */}
      <section id="guarantee" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full mb-3 text-xs font-bold uppercase tracking-wider border" style={{ background: 'rgba(16,185,129,0.1)', borderColor: 'rgba(16,185,129,0.2)', color: 'var(--primary)' }}>
              WHY GETIDONE IS DIFFERENT
            </div>
            <h2 className="font-extrabold text-3xl sm:text-4xl mb-4" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text)' }}>
              0% Risk Verified Execution Model
            </h2>
            <p className="text-sm sm:text-base max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
              Unverified promises cost time and money. GetiDone introduces objective automated QA test gates and escrow telemetry.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="gd-card p-8 space-y-4" style={{ background: 'var(--bg-alt)' }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-emerald-500 text-white font-bold">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-xl" style={{ fontFamily: "'Sora', sans-serif" }}>Done Score™ Algorithm</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
                Freelancer ranks are derived from active Git telemetry, automated test suite pass rates, and verified milestone delivery accuracy.
              </p>
            </div>

            <div className="gd-card p-8 space-y-4" style={{ background: 'var(--bg-alt)' }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-teal-500 text-white font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-xl" style={{ fontFamily: "'Sora', sans-serif" }}>QA-Gated Escrow</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
                Milestone funds are held securely in Escrow and released only when deliverables pass defined acceptance criteria and automated test suites.
              </p>
            </div>

            <div className="gd-card p-8 space-y-4" style={{ background: 'var(--bg-alt)' }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-lime-500 text-white font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-xl" style={{ fontFamily: "'Sora', sans-serif" }}>Micro-POD Squads</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
                Assemble multi-role execution teams (Lead Dev, UI/UX Designer, QA Specialist) in 1-click for end-to-end enterprise product delivery.
              </p>
            </div>
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
            Join thousands of companies and freelancers building the future on GetiDone. Post your first job or browse service packages today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/register" className="btn-primary text-base px-8 py-4 rounded-xl font-bold flex items-center gap-2">
              <span>Get Started for Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/services" className="btn-ghost text-base px-8 py-4 rounded-xl font-semibold border border-white/20 text-white hover:bg-white/10">
              Browse Service Packages
            </Link>
          </div>
        </div>
      </section>

      {/* 1-on-1 Consultation Booking Modal */}
      {showConsultModal && selectedTalent && (
        <div
          className="modal-backdrop active"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowConsultModal(false);
          }}
        >
          <div className="modal-content p-7 max-w-lg">
            <div className="flex items-start justify-between mb-5 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-md flex items-center justify-center bg-emerald-500 text-white text-xs font-bold">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-emerald-600 uppercase">1-ON-1 CONSULTATION</span>
                </div>
                <h2 className="font-extrabold text-xl" style={{ fontFamily: "'Sora', sans-serif" }}>
                  Book Strategy Session
                </h2>
                <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                  With <span className="font-bold text-[var(--text)]">{selectedTalent.name}</span> (${selectedTalent.rate}/hr)
                </div>
              </div>
              <button
                onClick={() => setShowConsultModal(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleBookConsultation} className="space-y-4">
              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>SESSION DURATION</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setConsultDuration('30')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      consultDuration === '30' ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 font-bold' : 'border-[var(--border)] bg-[var(--bg-alt)] text-[var(--muted)]'
                    }`}
                  >
                    <div className="text-xs font-bold">30 Minutes</div>
                    <div className="text-base font-extrabold mt-1">${Math.round(selectedTalent.rate * 0.6)}</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConsultDuration('60')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      consultDuration === '60' ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 font-bold' : 'border-[var(--border)] bg-[var(--bg-alt)] text-[var(--muted)]'
                    }`}
                  >
                    <div className="text-xs font-bold">60 Minutes</div>
                    <div className="text-base font-extrabold mt-1">${selectedTalent.rate}</div>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>DATE</label>
                  <input
                    type="date"
                    value={consultDate}
                    onChange={e => setConsultDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none"
                    style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>PREFERRED TIME</label>
                  <select
                    value={consultTime}
                    onChange={e => setConsultTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none cursor-pointer"
                    style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                  >
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>100% of consultation fee is credited toward project escrow if you hire within 14 days.</span>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowConsultModal(false)}
                  className="flex-1 btn-ghost py-3 rounded-xl text-sm font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confirm & Schedule</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <div
        className="fixed bottom-6 right-6 flex items-center gap-3 px-5 py-4 rounded-[14px] z-50 transition-all duration-[400ms]"
        style={{
          background: 'var(--sidebar)',
          border: '1px solid rgba(16,185,129,0.2)',
          boxShadow: '0 16px 40px -12px rgba(15,26,20,0.4)',
          color: 'white',
          maxWidth: 360,
          transform: toastState.visible ? 'translateX(0)' : 'translateX(140%)',
        }}
      >
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--primary)' }}>
          <Check className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="text-sm font-bold">{toastState.title}</div>
          <div className="text-xs" style={{ color: 'var(--sidebar-text)' }}>{toastState.msg}</div>
        </div>
        <button
          onClick={() => setToastState(t => ({ ...t, visible: false }))}
          className="ml-auto opacity-60 hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Footer */}
      <footer className="py-16 px-6 border-t text-xs" style={{ background: '#0A0F0D', borderColor: 'rgba(255,255,255,0.08)', color: '#94A39A' }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <div className="getidone-text mb-4 text-xl">
              <span className="text-white">Geti</span><span className="text-[var(--primary)]">Done</span>
            </div>
            <p className="text-xs max-w-xs leading-relaxed">
              The smartest way to hire and get hired. Combining Fiverr&apos;s instant packages with Upwork&apos;s elite talent discovery.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">Marketplace</h4>
            <ul className="space-y-2">
              <li><Link href="/services" className="hover:text-emerald-400 transition-colors">Service Packages</Link></li>
              <li><Link href="/freelancers" className="hover:text-emerald-400 transition-colors">Find Talent</Link></li>
              <li><Link href="/projects" className="hover:text-emerald-400 transition-colors">Project Catalog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">For Freelancers</h4>
            <ul className="space-y-2">
              <li><Link href="/jobs/search" className="hover:text-emerald-400 transition-colors">Find Work</Link></li>
              <li><Link href="/services" className="hover:text-emerald-400 transition-colors">Create Package</Link></li>
              <li><Link href="/profile" className="hover:text-emerald-400 transition-colors">My Profile</Link></li>
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
