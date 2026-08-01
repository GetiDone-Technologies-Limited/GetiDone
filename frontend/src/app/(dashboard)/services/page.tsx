'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Package, Search, Star, Clock, CheckCircle2, ShieldCheck, Zap,
  ChevronDown, ExternalLink, ArrowRight, Check, X, Code, Filter, Sparkles, User
} from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';

interface ServiceTier {
  name: 'Basic' | 'Standard' | 'Premium';
  price: number;
  days: number;
  features: string[];
}

interface ServicePackageItem {
  id: string;
  title: string;
  freelancerName: string;
  freelancerAvatar: string;
  freelancerRole: string;
  badge: 'TOP RATED' | 'VERIFIED EXECUTIONER' | 'RISING TALENT';
  doneScore: number;
  category: 'Web Development' | 'UI/UX Design' | 'Mobile Apps' | 'DevOps' | 'AI & Data';
  coverImage: string;
  rating: number;
  reviewsCount: number;
  startingPrice: number;
  tiers: ServiceTier[];
}

const initialPackages: ServicePackageItem[] = [
  {
    id: 'sp1',
    title: 'Full-Stack Next.js 15 & Tailwind E-Commerce Web Application',
    freelancerName: 'Daniel Benson',
    freelancerAvatar: 'https://picsum.photos/seed/danielbenson/100/100.jpg',
    freelancerRole: 'Senior Full Stack Developer',
    badge: 'VERIFIED EXECUTIONER',
    doneScore: 98,
    category: 'Web Development',
    coverImage: 'https://picsum.photos/seed/ecommerceapp/600/400.jpg',
    rating: 4.9,
    reviewsCount: 42,
    startingPrice: 450,
    tiers: [
      { name: 'Basic', price: 450, days: 3, features: ['Core 5 Responsive Pages', 'Tailwind CSS Styling', 'Automated Unit Tests Pass'] },
      { name: 'Standard', price: 950, days: 5, features: ['10 Custom Pages', 'Stripe Escrow Integration', 'PostgreSQL / Prisma DB', 'E2E Playwright Tests'] },
      { name: 'Premium', price: 1800, days: 8, features: ['Full SaaS Multi-tenant Architecture', 'CI/CD GitHub Action Setup', '30-Day Automated Warranty', 'Lighthouse 95+ Score Audit'] }
    ]
  },
  {
    id: 'sp2',
    title: 'High-Converting Mobile App UI/UX Design & Figma Design System',
    freelancerName: 'Sarah Kim',
    freelancerAvatar: 'https://picsum.photos/seed/sarah/100/100.jpg',
    freelancerRole: 'Lead UI/UX Architect',
    badge: 'TOP RATED',
    doneScore: 96,
    category: 'UI/UX Design',
    coverImage: 'https://picsum.photos/seed/saasdashboard/600/400.jpg',
    rating: 5.0,
    reviewsCount: 38,
    startingPrice: 350,
    tiers: [
      { name: 'Basic', price: 350, days: 2, features: ['5 Mobile Screen Wireframes', 'Interactive Figma Prototype', 'Export Asset Package'] },
      { name: 'Standard', price: 750, days: 4, features: ['15 Custom App Screens', 'Design System Tokens & Components', 'Dark & Light Mode Toggles'] },
      { name: 'Premium', price: 1400, days: 7, features: ['Complete iOS & Android UI Kit', 'Micro-animations & Lottie Specs', 'Developer Handoff Support'] }
    ]
  },
  {
    id: 'sp3',
    title: 'Cross-Platform React Native Mobile App Development with Firebase',
    freelancerName: 'Marcus Lee',
    freelancerAvatar: 'https://picsum.photos/seed/marcus/100/100.jpg',
    freelancerRole: 'Mobile Solutions Architect',
    badge: 'VERIFIED EXECUTIONER',
    doneScore: 99,
    category: 'Mobile Apps',
    coverImage: 'https://picsum.photos/seed/mobileapp/600/400.jpg',
    rating: 4.8,
    reviewsCount: 29,
    startingPrice: 600,
    tiers: [
      { name: 'Basic', price: 600, days: 4, features: ['MVP App Build', 'Auth & Push Notifications', 'App Store Build Ready'] },
      { name: 'Standard', price: 1200, days: 7, features: ['Full iOS & Android App', 'Realtime Firebase Sync', 'In-App Purchases Integration'] },
      { name: 'Premium', price: 2400, days: 12, features: ['Enterprise Offline Sync Engine', 'App Store & Play Store Publishing', 'Automated Crashlytics Telemetry'] }
    ]
  },
  {
    id: 'sp4',
    title: 'AWS Cloud Infrastructure, Docker Containerization & CI/CD Pipeline',
    freelancerName: 'Tunde A.',
    freelancerAvatar: 'https://picsum.photos/seed/tunde/100/100.jpg',
    freelancerRole: 'DevOps & Security Specialist',
    badge: 'RISING TALENT',
    doneScore: 94,
    category: 'DevOps',
    coverImage: 'https://picsum.photos/seed/devops/600/400.jpg',
    rating: 4.9,
    reviewsCount: 19,
    startingPrice: 300,
    tiers: [
      { name: 'Basic', price: 300, days: 2, features: ['Dockerize Backend & Frontend', 'Local Docker Compose Setup', 'Environment Security Audit'] },
      { name: 'Standard', price: 650, days: 4, features: ['AWS ECS / EC2 Deployment', 'GitHub Actions Automated CI/CD', 'SSL & Custom Domain Config'] },
      { name: 'Premium', price: 1350, days: 6, features: ['Kubernetes Cluster Setup', 'Auto-scaling & Monitoring Dashboard', 'Disaster Recovery Plan'] }
    ]
  }
];

interface ToastState {
  title: string;
  msg: string;
  visible: boolean;
}

export default function ServicesPage() {
  const { user } = useAuthStore();
  const [packages] = useState<ServicePackageItem[]>(initialPackages);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPkg, setSelectedPkg] = useState<ServicePackageItem | null>(null);
  const [selectedTier, setSelectedTier] = useState<'Basic' | 'Standard' | 'Premium'>('Standard');
  const [addRushDelivery, setAddRushDelivery] = useState(false);

  const [toastState, setToastState] = useState<ToastState>({ title: '', msg: '', visible: false });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (title: string, msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastState({ title, msg, visible: true });
    toastTimer.current = setTimeout(() => setToastState(t => ({ ...t, visible: false })), 3200);
  };

  const filteredPackages = packages.filter(p => {
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.freelancerName.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  const activeTierObj = selectedPkg?.tiers.find(t => t.name === selectedTier) || selectedPkg?.tiers[1];
  const finalPrice = (activeTierObj?.price || 0) + (addRushDelivery ? 100 : 0);

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Escrow Funded & Order Placed!', `Your order for "${selectedPkg?.title}" (${selectedTier} Tier) has been initiated with Escrow Protection.`);
    setSelectedPkg(null);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header */}
      <section className="fade-up">
        <div className="flex items-center gap-2 mb-2 text-xs" style={{ color: 'var(--muted)' }}>
          <Link href="/freelancer" className="hover:text-emerald-600 transition-colors">Dashboard</Link>
          <ChevronDown className="w-3 h-3 -rotate-90" />
          <span className="font-semibold" style={{ color: 'var(--text)' }}>Service Packages</span>
        </div>

        <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(16,185,129,0.12)', color: 'var(--primary)' }}>
                VERIFIED PACKAGES
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(20,184,166,0.12)', color: 'var(--secondary)' }}>
                1-CLICK ESCROW BUY
              </span>
            </div>
            <h1 className="font-extrabold text-4xl tracking-tight" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text)' }}>
              Service Packages<span style={{ color: 'var(--primary)' }}>.</span>
            </h1>
            <p className="text-sm mt-1.5" style={{ color: 'var(--muted)' }}>
              Browse pre-packaged, test-backed services from verified top-tier executioners. Order instantly with escrow protection.
            </p>
          </div>

          {user?.role === 'FREELANCER' && (
            <button
              onClick={() => showToast('Create Package', 'Opening service package creator modal')}
              className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create New Package</span>
            </button>
          )}
        </div>
      </section>

      {/* Category Tabs & Search Bar */}
      <section className="space-y-4 fade-up">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: 'var(--bg-alt)' }}>
            {[
              { id: 'all', label: 'All Packages' },
              { id: 'Web Development', label: 'Web Dev' },
              { id: 'UI/UX Design', label: 'UI/UX' },
              { id: 'Mobile Apps', label: 'Mobile' },
              { id: 'DevOps', label: 'DevOps' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === tab.id ? 'bg-[var(--sidebar)] text-white shadow-sm' : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs" style={{ color: 'var(--muted)' }}>
            Showing <span className="font-bold" style={{ color: 'var(--text)' }}>{filteredPackages.length}</span> verified packages
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--soft)' }} />
          <input
            type="text"
            placeholder="Search service packages, technologies, or freelancers..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="search-input w-full pl-11 pr-4 py-2.5 rounded-xl text-sm"
          />
        </div>
      </section>

      {/* Packages Grid (3 Columns) */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 fade-up">
        {filteredPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="gd-card group flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/40"
          >
            {/* Cover Image */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-900">
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

            {/* Body Info */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                {/* Freelancer Header */}
                <div className="flex items-center gap-2.5 mb-3">
                  <img
                    src={pkg.freelancerAvatar}
                    className="w-8 h-8 rounded-full object-cover border border-[var(--border)]"
                    alt={pkg.freelancerName}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold truncate flex items-center gap-1">
                      <span>{pkg.freelancerName}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    </div>
                    <div className="text-[10px] truncate" style={{ color: 'var(--muted)' }}>{pkg.freelancerRole}</div>
                  </div>
                </div>

                <h3 className="font-extrabold text-base line-clamp-2 mb-2 leading-snug" style={{ fontFamily: "'Sora', sans-serif" }}>
                  {pkg.title}
                </h3>

                {/* Rating & Turnaround */}
                <div className="flex items-center justify-between text-xs font-semibold pt-1" style={{ color: 'var(--muted)' }}>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-[var(--text)]">{pkg.rating}</span>
                    <span className="text-[10px]">({pkg.reviewsCount})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[var(--soft)]" />
                    <span>{pkg.tiers[1].days} Days Avg</span>
                  </div>
                </div>
              </div>

              {/* Price & Action Footer */}
              <div className="pt-3 border-t flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
                <div>
                  <div className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--soft)' }}>STARTING AT</div>
                  <div className="text-xl font-extrabold text-emerald-600" style={{ fontFamily: "'Sora', sans-serif" }}>
                    ${pkg.startingPrice}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedPkg(pkg);
                    setSelectedTier('Standard');
                    setAddRushDelivery(false);
                  }}
                  className="btn-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <span>Order Package</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Order Package & Escrow Checkout Modal */}
      {selectedPkg && (
        <div
          className="modal-backdrop active"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedPkg(null);
          }}
        >
          <div className="modal-content p-7 max-w-xl">
            <div className="flex items-start justify-between mb-4 pb-3 border-b" style={{ borderColor: 'var(--border)' }}>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-md flex items-center justify-center bg-emerald-500 text-white text-xs font-bold">
                    <Package className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-emerald-600 uppercase">VERIFIED ORDER</span>
                </div>
                <h2 className="font-extrabold text-xl line-clamp-1" style={{ fontFamily: "'Sora', sans-serif" }}>
                  {selectedPkg.title}
                </h2>
                <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                  By <span className="font-bold text-[var(--text)]">{selectedPkg.freelancerName}</span> ({selectedPkg.badge})
                </div>
              </div>
              <button
                onClick={() => setSelectedPkg(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleOrderSubmit} className="space-y-5">
              {/* Tier Switcher */}
              <div>
                <label className="text-xs font-bold tracking-wider mb-2 block uppercase" style={{ color: 'var(--muted)' }}>SELECT PACKAGE TIER</label>
                <div className="grid grid-cols-3 gap-2">
                  {selectedPkg.tiers.map(tier => (
                    <button
                      key={tier.name}
                      type="button"
                      onClick={() => setSelectedTier(tier.name)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedTier === tier.name
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 font-bold shadow-sm'
                          : 'border-[var(--border)] bg-[var(--bg-alt)] text-[var(--muted)] hover:text-[var(--text)]'
                      }`}
                    >
                      <div className="text-xs uppercase font-extrabold">{tier.name}</div>
                      <div className="text-lg font-extrabold mt-1" style={{ fontFamily: "'Sora', sans-serif" }}>${tier.price}</div>
                      <div className="text-[10px] mt-0.5 opacity-80">{tier.days} Days</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Deliverable Features Checklist */}
              {activeTierObj && (
                <div className="p-4 rounded-xl bg-[var(--bg-alt)] border space-y-2" style={{ borderColor: 'var(--border)' }}>
                  <div className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-2">INCLUDED DELIVERABLES & QA SPECS</div>
                  {activeTierObj.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Add-on Extras */}
              <div>
                <label className="text-xs font-bold tracking-wider mb-2 block uppercase" style={{ color: 'var(--muted)' }}>ADD-ON EXTRAS</label>
                <label className="flex items-center justify-between p-3 rounded-xl border cursor-pointer hover:bg-[var(--bg-alt)] transition-colors" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={addRushDelivery}
                      onChange={e => setAddRushDelivery(e.target.checked)}
                      className="w-4 h-4 accent-emerald-500 rounded"
                    />
                    <div>
                      <div className="text-xs font-bold">24-Hour Express Delivery</div>
                      <div className="text-[10px]" style={{ color: 'var(--muted)' }}>Priority execution slot in freelancer queue</div>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-600">+$100</span>
                </label>
              </div>

              {/* Total & Checkout */}
              <div className="pt-3 border-t flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
                <div>
                  <div className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--soft)' }}>TOTAL ESCROW AMOUNT</div>
                  <div className="text-2xl font-extrabold text-emerald-600" style={{ fontFamily: "'Sora', sans-serif" }}>
                    ${finalPrice}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPkg(null)}
                    className="btn-ghost px-4 py-2.5 rounded-xl text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Fund Escrow & Place Order</span>
                  </button>
                </div>
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
    </div>
  );
}
