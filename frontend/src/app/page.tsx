import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

// Import all sections
import { HeroSection } from '@/features/landing/components/HeroSection';
import { TrustedBySection } from '@/features/landing/components/TrustedBySection';
import { HowItWorksSection } from '@/features/landing/components/HowItWorksSection';
import { SmartMatchDemo } from '@/features/landing/components/SmartMatchDemo';
import { ExpertsSection } from '@/features/landing/components/ExpertsSection';
import { WhyChooseSection } from '@/features/landing/components/WhyChooseSection';
import { SuccessStoriesSection } from '@/features/landing/components/SuccessStoriesSection';
import { StatisticsSection } from '@/features/landing/components/StatisticsSection';
import { CTASection } from '@/features/landing/components/CTASection';
import { LandingAuthButtons } from '@/features/landing/components/LandingAuthButtons';

export const metadata: Metadata = {
  title: 'GetiDone — Enterprise AI Work Execution',
  description: 'AI-powered work execution platform connecting businesses with verified professionals.',
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface font-sans selection:bg-primary/20 selection:text-primary text-on-surface">
      
      {/* Sticky Navbar (Forced Dark) */}
      <div className="dark">
        <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-white/5 transition-all text-on-surface">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="GetiDone" width={240} height={64} className="h-16 w-auto" />
            </Link>
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
              <Link href="#find-talent" className="hover:text-white transition-colors">Find Talent</Link>
              <Link href="#find-work" className="hover:text-white transition-colors">Find Work</Link>
              <Link href="#how-it-works" className="hover:text-white transition-colors">Execution Pods™</Link>
              <Link href="#enterprise" className="hover:text-white transition-colors">Enterprise</Link>
              <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="#resources" className="hover:text-white transition-colors">Resources</Link>
            </nav>
            <div className="flex items-center gap-6">
              <LandingAuthButtons />
            </div>
          </div>
        </header>
      </div>

      {/* Assembly of Sections */}
      <main>
        <div className="dark">
          <HeroSection />
        </div>
        <div className="light">
          <TrustedBySection />
          <HowItWorksSection />
          <SmartMatchDemo />
          <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading experts...</div>}>
            <ExpertsSection />
          </Suspense>
        </div>
        <div className="dark">
          <WhyChooseSection />
          <SuccessStoriesSection />
          <StatisticsSection />
          <CTASection />
        </div>
      </main>

      {/* Footer */}
      <div className="dark">
        <footer className="border-t border-white/5 bg-surface pt-20 pb-10 text-on-surface">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
              <div className="col-span-2">
                <Image src="/logo.png" alt="GetiDone" width={140} height={36} className="h-9 w-auto mb-6" />
                <p className="text-sm text-on-surface-variant max-w-xs">
                  Get Work Done. The Smart Way. An AI-powered ecosystem for world-class teams.
                </p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Platform</h4>
                <ul className="space-y-3 text-sm text-on-surface-variant">
                  <li><Link href="#" className="hover:text-primary transition-colors">Find Talent</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Find Work</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Execution Pods</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Enterprise</h4>
                <ul className="space-y-3 text-sm text-on-surface-variant">
                  <li><Link href="#" className="hover:text-primary transition-colors">Solutions</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Case Studies</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Resources</h4>
                <ul className="space-y-3 text-sm text-on-surface-variant">
                  <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Community</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Legal</h4>
                <ul className="space-y-3 text-sm text-on-surface-variant">
                  <li><Link href="#" className="hover:text-primary transition-colors">Privacy</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Terms</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Security</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-on-surface-variant">© 2026 GetiDone Inc. All rights reserved.</p>
              <div className="flex gap-4">
                 {/* Social Icons Placeholder */}
                 <div className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer" />
                 <div className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer" />
                 <div className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer" />
              </div>
            </div>
          </div>
        </footer>
      </div>

    </div>
  );
}
