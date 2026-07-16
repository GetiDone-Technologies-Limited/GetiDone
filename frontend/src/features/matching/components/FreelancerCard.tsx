import type { FreelancerProfile } from '../types/matching.types';
import { Avatar } from '@/shared/components/ui/Avatar';
import { Badge } from '@/shared/components/ui/Badge';
import { Button } from '@/shared/components/ui/Button';
import Link from 'next/link';

interface FreelancerCardProps {
  freelancer: FreelancerProfile;
  score?: number;
  onHire?: (id: string) => void;
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg className={`h-3.5 w-3.5 ${filled ? 'text-amber-400' : 'text-slate-300'}`} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export function FreelancerCard({ freelancer, score, onHire }: FreelancerCardProps) {
  const { user } = freelancer;
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(freelancer.avgRating));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-violet-200">
      <div className="flex items-start gap-4">
        <Avatar src={user.avatarUrl} name={user.name} size="lg" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <Link href={`/profile?id=${freelancer.userId}`} className="font-semibold text-slate-900 hover:text-violet-700">
                {user.name}
              </Link>
              <div className="flex items-center gap-1 mt-0.5">
                {stars.map((filled, i) => <StarIcon key={i} filled={filled} />)}
                <span className="ml-1 text-xs text-slate-500">({freelancer.reviewCount})</span>
              </div>
            </div>
            {score !== undefined && (
              <Badge variant="violet" className="text-sm">
                {Math.round(score * 100)}% match
              </Badge>
            )}
          </div>

          {freelancer.bio && (
            <p className="mt-2 text-sm text-slate-600 line-clamp-2">{freelancer.bio}</p>
          )}

          <div className="mt-3 flex flex-wrap gap-1.5">
            {freelancer.skills.slice(0, 4).map((s) => (
              <Badge key={s} variant="default">{s}</Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm text-slate-600">
          {freelancer.hourlyRate && (
            <span className="font-semibold text-slate-800">${freelancer.hourlyRate}/hr</span>
          )}
          <span className={`text-xs ${freelancer.availability ? 'text-emerald-600' : 'text-slate-400'}`}>
            {freelancer.availability ? '● Available' : '○ Unavailable'}
          </span>
          <span className="text-xs text-slate-400">DoneScore {user.doneScore}</span>
        </div>
        {onHire && (
          <Button size="sm" onClick={() => onHire(freelancer.userId)}>Invite</Button>
        )}
      </div>
    </div>
  );
}
