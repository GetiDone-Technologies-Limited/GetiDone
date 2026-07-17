import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { CheckCircle2, ShieldCheck, UserCheck, Clock, Shield, Lock } from 'lucide-react';

export const metadata: Metadata = { title: 'Sign in - GetiDone' };

export default function LoginPage() {
  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* Left Column - Dark Theme */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#050505] flex-col justify-between p-12 relative overflow-hidden">
        {/* Background Gradients/Glows */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>

        {/* Header */}
        <div className="relative z-10">
          <Link href="/" className="block mb-16">
            <Image 
              src="/logo.png" 
              alt="GetiDone Logo" 
              width={600} 
              height={160} 
              className="h-32 w-auto object-contain"
              priority
            />
          </Link>

          <h1 className="text-5xl font-bold text-white leading-tight mb-6 tracking-tight">
            Get Work Done.<br />
            <span className="text-primary">The Smart Way.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-md mb-12">
            Connect with verified professionals, collaborate seamlessly, and get your projects delivered with confidence.
          </p>

          <div className="space-y-8 max-w-md">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">AI-Powered Matching</h3>
                <p className="text-slate-400 text-sm">We connect you with the perfect talent.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Secure Payments</h3>
                <p className="text-slate-400 text-sm">Your payments are protected with escrow.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <UserCheck className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Verified Professionals</h3>
                <p className="text-slate-400 text-sm">All talents are vetted for skills and reliability.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">On-Time Delivery</h3>
                <p className="text-slate-400 text-sm">Track progress and get work done on schedule.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer & Testimonial */}
        <div className="relative z-10 mt-12">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 max-w-md mb-8 relative">
            <div className="absolute top-6 left-6 text-primary text-4xl leading-none opacity-50">&ldquo;</div>
            <p className="text-white text-sm relative z-10 pl-8 mb-4">
              GetiDone helped us find the right developer and delivered our project beyond expectations.
            </p>
            <div className="flex items-center gap-3 pl-8">
              <div className="w-10 h-10 rounded-full bg-slate-800 overflow-hidden">
                {/* Mock Avatar */}
                <div className="w-full h-full bg-slate-700 flex items-center justify-center text-white text-xs">JC</div>
              </div>
              <div>
                <p className="text-white text-sm font-semibold">James Carter</p>
                <p className="text-slate-500 text-xs">CTO, TechNova Inc.</p>
              </div>
              <div className="ml-auto flex text-yellow-400 text-sm">★★★★★</div>
            </div>
          </div>

          <p className="text-slate-500 text-xs font-bold mb-6 uppercase tracking-wider">Trusted by forward-thinking companies and individuals</p>
          <div className="flex flex-wrap gap-8 items-center mb-16">
            <div className="flex items-center gap-2">
              <img src="https://cdn.simpleicons.org/paystack/00C3F7" alt="Paystack" className="h-6 w-auto" />
              <span className="text-[#00C3F7] font-bold text-lg tracking-tight">paystack</span>
            </div>
            <div className="flex items-center gap-2">
              <img src="https://cdn.simpleicons.org/flutterwave/F5A623" alt="Flutterwave" className="h-6 w-auto" />
              <span className="text-[#F5A623] font-black text-sm tracking-wide">FLUTTERWAVE</span>
            </div>
            <div className="flex items-center gap-2">
              <img src="https://cdn.simpleicons.org/hubspot/FF7A59" alt="HubSpot" className="h-6 w-auto" />
              <span className="text-[#FF7A59] font-bold text-lg">HubSpot</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-500 font-black text-xl italic tracking-tighter">Moniepoint</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-lg tracking-tighter">Interswitch<span className="text-blue-500">_</span></span>
            </div>
            <div className="flex items-center gap-2">
              <img src="https://cdn.simpleicons.org/amazonaws/FF9900" alt="AWS" className="h-6 w-auto" />
            </div>
            <div className="flex items-center gap-2">
              <img src="https://cdn.simpleicons.org/googlecloud/4285F4" alt="Google Cloud" className="h-6 w-auto" />
              <span className="text-[#4285F4] font-bold text-lg">Google Cloud</span>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10">
            <p className="text-xs text-slate-500 flex flex-col gap-1">
              <span>&copy; {new Date().getFullYear()} GetiDone Technologies. All rights reserved.</span>
              <span>
                A product of{' '}
                <a 
                  href="https://wa.me/2348101811993" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-400 transition-colors font-medium hover:underline"
                >
                  Benniechat TechWealth Solutions
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - White Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50 relative">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl p-10 shadow-xl border border-slate-100 shadow-slate-200/50">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome back 👋</h2>
            <p className="text-slate-500 text-sm mb-8">Log in to your GetiDone account to continue</p>
            
            <LoginForm />
          </div>

          {/* Bottom Trust Badges */}
          <div className="mt-8 flex justify-center gap-8 px-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-700">Secure & Encrypted</span>
                <span className="text-[10px] text-slate-400">Your data is protected</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-700">Escrow Protected</span>
                <span className="text-[10px] text-slate-400">Payments are 100% safe</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-700">Privacy First</span>
                <span className="text-[10px] text-slate-400">We respect your privacy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

