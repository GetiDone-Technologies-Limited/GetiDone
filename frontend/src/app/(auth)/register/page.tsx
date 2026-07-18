import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { RegisterForm } from '@/features/auth/components/RegisterForm';
import { Briefcase, Star, Sparkles, TrendingUp, Zap } from 'lucide-react';

export const metadata: Metadata = { title: 'Create account - GetiDone' };

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex bg-white font-sans">
      
      {/* Left Column - White Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50 relative">
        {/* Mobile Logo */}
        <Link href="/" className="lg:hidden absolute top-8 left-8">
          <Image src="/logo.png" alt="GetiDone" width={140} height={40} className="h-8 w-auto" />
        </Link>

        <div className="w-full max-w-md mt-12 lg:mt-0">
          <div className="bg-white rounded-3xl p-10 shadow-xl border border-slate-100 shadow-slate-200/50">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Join GetiDone 🚀</h2>
            <p className="text-slate-500 text-sm mb-8">Create your account and start your journey today</p>
            
            <RegisterForm />

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center">
              <p className="text-sm text-slate-500">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold text-[#00b259] hover:text-[#009b4d]">
                  Log in instead →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Dark Theme */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#050505] flex-col justify-between p-12 relative overflow-hidden">
        {/* Background Gradients/Glows */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#00b259]/10 blur-[100px] rounded-full pointer-events-none -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Header */}
        <div className="relative z-10 flex justify-end">
          <Link href="/" className="block">
            <Image 
              src="/logo.png" 
              alt="GetiDone Logo" 
              width={600} 
              height={160} 
              className="h-28 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        <div className="relative z-10 max-w-lg mt-12">
          <h1 className="text-5xl font-bold text-white leading-tight mb-6 tracking-tight">
            The Future of<br />
            <span className="text-[#00b259]">Freelance Work.</span>
          </h1>
          <p className="text-slate-400 text-lg mb-12">
            Join thousands of professionals and businesses building the next generation of digital products on GetiDone.
          </p>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-[#00b259]" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Premium Jobs</h3>
              <p className="text-slate-400 text-sm">Access high-quality projects from verified global businesses.</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-[#00b259]" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Fast Payments</h3>
              <p className="text-slate-400 text-sm">Get paid instantly upon milestone completion via secure escrow.</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-[#00b259]" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Build Your Brand</h3>
              <p className="text-slate-400 text-sm">Grow your DoneScore™ and stand out to top-tier clients.</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-[#00b259]" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Smart Matching</h3>
              <p className="text-slate-400 text-sm">Our AI finds the perfect projects for your specific skill set.</p>
            </div>
          </div>
        </div>

        {/* Footer & Testimonial */}
        <div className="relative z-10 mt-auto pt-16">
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 max-w-md relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 overflow-hidden relative">
                <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" alt="Sarah" fill className="object-cover" />
              </div>
              <div>
                <p className="text-white font-bold">Sarah Jenkins</p>
                <p className="text-[#00b259] text-sm font-semibold">Top Rated Freelancer</p>
              </div>
              <div className="ml-auto flex gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-[#00b259] text-[#00b259]" />)}
              </div>
            </div>
            <p className="text-slate-300 text-sm italic leading-relaxed">
              &quot;Switching to GetiDone was the best career move I&apos;ve made. The quality of clients is unmatched, and the escrow system gives me complete peace of mind.&quot;
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
