import { Star, MessageSquareQuote } from 'lucide-react';
import Link from 'next/link';

const mockReviews = [
  { id: 'r1', client: 'TechNova Inc.', project: 'SaaS Dashboard Development', rating: 5, date: 'Oct 24, 2023', comment: 'Absolutely phenomenal work. The attention to detail and communication throughout the project were top-notch. Will definitely hire again.' },
  { id: 'r2', client: 'HealthPlus', project: 'Mobile App Development', rating: 5, date: 'Oct 10, 2023', comment: 'Delivered ahead of schedule and the code quality is excellent. Very responsive to our feedback.' },
  { id: 'r3', client: 'Bright Solutions', project: 'Website Maintenance', rating: 4, date: 'Sep 28, 2023', comment: 'Good work overall. There were a few minor bugs initially but they were fixed very quickly.' },
];

export default function ReviewsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Reviews & Ratings</h1>
        <p className="text-slate-500 font-medium mt-2">See what clients are saying about your work.</p>
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 flex items-center justify-between shadow-md relative overflow-hidden">
        <div className="relative z-10 text-white">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Overall Rating</p>
          <div className="flex items-end gap-3">
            <p className="text-6xl font-black tracking-tight">4.9</p>
            <div className="pb-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-400 font-semibold mt-1">Based on 24 reviews</p>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 p-8 opacity-10">
          <Star className="w-48 h-48" />
        </div>
      </div>

      <div className="space-y-6">
        {mockReviews.map((review) => (
          <div key={review.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                  {review.client.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{review.client}</h3>
                  <Link href="#" className="text-sm font-semibold text-[#00b259] hover:underline">
                    {review.project}
                  </Link>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-slate-300 fill-slate-200'}`} />
                  ))}
                  <span className="ml-1 text-sm font-bold text-amber-600">{review.rating}.0</span>
                </div>
                <p className="text-xs font-bold text-slate-400 mt-2">{review.date}</p>
              </div>
            </div>
            
            <div className="relative">
              <MessageSquareQuote className="absolute -left-2 -top-2 w-8 h-8 text-slate-100 rotate-180" />
              <p className="text-slate-700 leading-relaxed font-medium pl-6 relative z-10 italic">
                "{review.comment}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
