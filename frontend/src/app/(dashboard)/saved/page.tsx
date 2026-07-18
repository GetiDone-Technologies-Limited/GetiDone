import { Star, Bookmark } from 'lucide-react';

export default function SavedTalentsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Saved Talents</h1>
        <p className="text-slate-500 mt-2 font-medium">Keep track of your favorite freelancers for future projects.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-16 text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-20 h-20 rounded-full bg-yellow-50 flex items-center justify-center mb-6 relative">
          <Bookmark className="w-10 h-10 text-yellow-500" />
          <Star className="w-5 h-5 text-yellow-500 absolute -bottom-1 -right-1 fill-yellow-500" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">No saved talents yet</h3>
        <p className="text-slate-500 max-w-md mb-8">
          When you see a freelancer profile you like, click the star icon to save them to this list for quick access later.
        </p>
        <button className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-sm transition-colors">
          Browse Freelancers
        </button>
      </div>
    </div>
  );
}
