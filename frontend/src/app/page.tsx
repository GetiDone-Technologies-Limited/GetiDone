import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GetiDone — Hire talent, get it done',
  description: 'Connect with verified freelancers, managed by AI matching and secured by escrow.',
};

function CheckIcon() {
  return (
    <svg className="h-5 w-5 text-violet-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

const features = [
  { emoji: '🤖', title: 'AI-Powered Matching', description: 'Our AI ranks freelancers against your job requirements so you always see the best fits first.' },
  { emoji: '🔒', title: 'Secure Escrow', description: 'Funds are held safely in escrow and only released when you approve the deliverables.' },
  { emoji: '⭐', title: 'DoneScore™', description: 'Every user earns a trust score based on their history — so quality is always transparent.' },
  { emoji: '💬', title: 'Built-in Messaging', description: 'Collaborate directly on the platform. No need for external tools.' },
  { emoji: '✅', title: 'KYC Verification', description: 'Verified identities reduce fraud and build trust on both sides of every deal.' },
  { emoji: '🌍', title: 'Global Talent Pool', description: 'Access skilled professionals from around the world across every discipline.' },
];

const steps = [
  { step: '01', title: 'Post a job', description: 'Describe your project, set your budget, and list required skills.' },
  { step: '02', title: 'Get matched', description: 'Our AI surfaces the best-fit freelancers instantly.' },
  { step: '03', title: 'Hire & Pay securely', description: 'Fund escrow, collaborate, and release payment on approval.' },
];

const perks = [
  'No subscription fees — pay only when you hire',
  'Full project history and audit trail',
  'Dispute resolution support',
  'Direct messaging included',
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2 font-bold text-xl text-violet-700">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white text-sm font-black">G</span>
            GetiDone
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-violet-700 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-violet-700 transition-colors">How it works</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Sign in</Link>
            <Link href="/register" className="inline-flex items-center rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 transition-all">
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-950 via-violet-900 to-indigo-900 py-28 sm:py-36">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <span className="inline-flex items-center rounded-full bg-violet-500/20 px-4 py-1.5 text-sm font-medium text-violet-200 ring-1 ring-violet-400/30 mb-6">
            🚀 Now in Beta — Join free today
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight tracking-tight">
            Hire talent.<br />
            <span className="bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
              Get it done.
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-violet-200 max-w-2xl mx-auto leading-relaxed">
            GetiDone connects clients with verified freelancers through AI-powered matching, 
            built-in messaging, and secure escrow payments.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center rounded-xl bg-white px-8 py-3.5 text-base font-bold text-violet-700 shadow-lg hover:bg-violet-50 transition-all hover:-translate-y-0.5"
            >
              Start for free
            </Link>
            <Link
              href="/jobs"
              className="inline-flex items-center rounded-xl border border-violet-400/50 px-8 py-3.5 text-base font-semibold text-violet-100 hover:bg-violet-800/50 transition-all"
            >
              Browse jobs →
            </Link>
          </div>

          {/* Social proof */}
          <p className="mt-8 text-sm text-violet-300">
            Join <strong className="text-white">1,200+</strong> freelancers and clients already on GetiDone
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Everything you need to succeed</h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto">A complete platform built for serious professionals — with the tools to manage every stage of a project.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="text-3xl mb-3">{f.emoji}</div>
                <h3 className="font-semibold text-slate-900 mb-1">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Up and running in minutes</h2>
            <p className="mt-4 text-slate-500">Three simple steps to your next successful project.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.step} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="absolute top-8 left-1/2 hidden sm:block w-full h-px bg-gradient-to-r from-violet-300 to-transparent" />
                )}
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white font-black text-xl shadow-lg mb-4">
                  {s.step}
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-violet-600 to-indigo-700 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Ready to get started?</h2>
          <p className="mt-4 text-violet-100">Join thousands of professionals. It takes under 2 minutes.</p>
          <div className="mt-4 inline-flex flex-col gap-2 items-start text-left bg-white/10 rounded-xl px-6 py-4 mx-auto">
            {perks.map((p) => (
              <div key={p} className="flex items-center gap-2 text-sm text-violet-100">
                <CheckIcon /> {p}
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/register"
              className="inline-flex items-center rounded-xl bg-white px-8 py-3.5 text-base font-bold text-violet-700 shadow-lg hover:bg-violet-50 transition-all hover:-translate-y-0.5"
            >
              Create free account →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-violet-600 text-white text-xs font-black">G</span>
            GetiDone
          </div>
          <p className="text-xs text-slate-400">© 2026 GetiDone. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-slate-400">
            <a href="#" className="hover:text-slate-600">Privacy</a>
            <a href="#" className="hover:text-slate-600">Terms</a>
            <a href="#" className="hover:text-slate-600">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
