import Link from 'next/link';
import { ArrowRight, MessageSquare } from 'lucide-react';

const mockProjects = [
  {
    id: 'pr1',
    title: 'E-commerce Website Redesign',
    client: 'TechNova Inc.',
    progress: 60,
    iconColor: 'bg-[#00b259]/10 text-[#00b259]',
  },
  {
    id: 'pr2',
    title: 'Mobile App Development',
    client: 'HealthPlus',
    progress: 75,
    iconColor: 'bg-orange-100 text-orange-500',
  },
  {
    id: 'pr3',
    title: 'API Integration & Backend',
    client: 'DataSync Solutions',
    progress: 30,
    iconColor: 'bg-blue-100 text-blue-500',
  },
  {
    id: 'pr4',
    title: 'Dashboard Development',
    client: 'Analytics Pro',
    progress: 90,
    iconColor: 'bg-purple-100 text-purple-500',
  }
];

export function ActiveProjectsWidget() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900">Active Projects</h2>
        <Link href="/freelancer/projects" className="text-sm font-bold text-[#00b259] hover:underline flex items-center gap-1">
          View All Projects <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-6 flex-1">
        {mockProjects.map((project) => (
          <div key={project.id} className="flex items-center justify-between group">
            <div className="flex items-center gap-4 flex-1">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${project.iconColor}`}>
                <span className="font-bold text-lg">{project.title.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0 pr-4">
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#00b259] transition-colors cursor-pointer truncate">
                  {project.title}
                </h4>
                <p className="text-[11px] font-semibold text-slate-500 mt-0.5">{project.client}</p>
                
                {/* Progress bar (Mobile view inline) - shown here for compact layout if needed, but the design has it to the right. Let's put it next to text for larger screens, or below. Actually, the design shows: Icon | Title & Client | Progress Bar | % | Chat */}
              </div>
            </div>
            
            <div className="flex items-center gap-4 w-48 shrink-0 justify-end">
               <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden hidden sm:block">
                 <div className="bg-[#00b259] h-full rounded-full" style={{ width: `${project.progress}%` }}></div>
               </div>
               <span className="text-[11px] font-bold text-slate-600 w-8 text-right">{project.progress}%</span>
               <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#00b259] hover:border-[#00b259] hover:bg-[#00b259]/5 transition-colors">
                 <MessageSquare className="w-3.5 h-3.5" />
               </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-100">
        <Link href="/freelancer/projects" className="text-sm font-bold text-[#00b259] hover:underline flex items-center gap-1">
          View All Active Projects <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
