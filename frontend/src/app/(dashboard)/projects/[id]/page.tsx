'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, ShoppingCart, Calendar, Clock, Briefcase, FileText, 
  MessageSquare, DollarSign, Activity, MoreHorizontal, CheckCircle2, 
  Download, Paperclip, Check, Plus
} from 'lucide-react';
import { Avatar } from '@/shared/components/ui/Avatar';
import { Badge } from '@/shared/components/ui/Badge';
import { MilestonesTab, FilesTab, MessagesTab, PaymentsTab, ActivityTab, TimelineTab } from './TabComponents';

export default function ProjectWorkspacePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [activeTab, setActiveTab] = useState('Overview');
  
  return (
    <div className="flex flex-col xl:flex-row gap-8 w-full">
      {/* LEFT COLUMN - MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col gap-6 min-w-0">
        
        {/* Breadcrumb */}
        <div className="flex items-center text-sm font-semibold text-slate-500 mb-2">
          <Link href="/projects" className="hover:text-primary transition-colors flex items-center">
            <ChevronLeft className="w-4 h-4 mr-1" />
            My Projects
          </Link>
          <span className="mx-2 text-slate-300">&gt;</span>
          <span className="text-slate-900 font-bold">E-commerce Website Redesign</span>
        </div>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
            <div className="flex gap-6 items-start">
              <div className="w-24 h-24 rounded-[1.25rem] bg-[#0A0D0C] flex items-center justify-center shrink-0 shadow-lg shadow-black/5">
                <ShoppingCart className="w-10 h-10 text-[#00b259]" />
              </div>
              <div className="pt-1">
                <div className="flex items-center gap-3 mb-3">
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none font-bold shadow-none text-xs px-2.5 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
                    In Progress
                  </Badge>
                </div>
                <h1 className="text-[28px] font-extrabold text-slate-900 mb-2 leading-tight flex items-center gap-3">
                  E-commerce Website Redesign
                  <span className="text-orange-400 text-xl">★</span>
                </h1>
                <p className="text-sm text-slate-500 mb-4 max-w-xl leading-relaxed">
                  Redesign and develop a modern, high-converting e-commerce website with improved UX/UI and performance.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-[13px] font-semibold text-slate-400">
                  <span className="flex items-center gap-1">Project ID: <span className="text-slate-700">#GTD-2505-0012</span></span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span>Posted on May 10, 2025</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span>Due on May 24, 2025 <span className="text-orange-500 font-bold ml-1">(8 days left)</span></span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-6 shrink-0 pt-2">
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Overall Progress</span>
                <div className="relative w-[84px] h-[84px] rounded-full flex items-center justify-center bg-slate-50 shadow-inner">
                  <svg className="absolute inset-0 w-full h-full rotate-[-90deg]" viewBox="0 0 36 36">
                    <path
                      className="text-slate-200"
                      strokeWidth="3.5"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[#00b259]"
                      strokeWidth="3.5"
                      strokeDasharray="60, 100"
                      strokeLinecap="round"
                      fill="none"
                      stroke="currentColor"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="text-xl font-black text-slate-900">60%</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="px-5 py-2.5 text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl flex items-center gap-2 transition-colors shadow-sm">
                  <MoreHorizontal className="w-4 h-4" /> More Actions
                </button>
                <button className="px-5 py-2.5 text-sm font-bold text-white bg-[#00b259] hover:bg-[#009b4d] rounded-xl flex items-center gap-2 transition-colors shadow-lg shadow-[#00b259]/20">
                  <FileText className="w-4 h-4" /> View Contract
                </button>
              </div>
            </div>
          </div>

          {/* 4 Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50 flex items-center gap-4">
              <div className="w-12 h-12 rounded-[14px] bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-sm shrink-0">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1 tracking-wide">Budget</p>
                <p className="text-xl font-black text-slate-900">$2,500</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Fixed Price</p>
              </div>
            </div>
            
            <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50 flex items-center gap-4">
              <div className="w-12 h-12 rounded-[14px] bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                <Activity className="w-6 h-6" />
              </div>
              <div className="w-full">
                <p className="text-xs font-semibold text-slate-500 mb-1 tracking-wide">Progress</p>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-black text-slate-900">60%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-[#00b259] w-[60%] rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50 flex items-center gap-4">
              <div className="w-12 h-12 rounded-[14px] bg-green-50 border border-green-100 flex items-center justify-center text-[#00b259] shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1 tracking-wide">Milestones</p>
                <p className="text-xl font-black text-slate-900">3 of 5</p>
                <p className="text-xs text-[#00b259] font-bold mt-0.5">Completed</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50 flex items-center gap-4">
              <div className="w-12 h-12 rounded-[14px] bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1 tracking-wide">Project Type</p>
                <p className="text-[15px] font-black text-slate-900 leading-snug">Website<br/>Development</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-10 border-b border-slate-200 px-6 mt-4">
          {['Overview', 'Milestones', 'Files', 'Messages', 'Payments', 'Activity', 'Timeline'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-[15px] transition-colors flex items-center gap-2 ${
                activeTab === tab 
                  ? 'font-bold text-[#00b259] border-b-[3px] border-[#00b259]' 
                  : 'font-semibold text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab} {tab === 'Messages' && <span className="w-5 h-5 rounded-full bg-[#00b259] text-[11px] text-white flex items-center justify-center font-bold">4</span>}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'Overview' && (
          <>
            {/* Main Content Grid inside Overview */}
            <div className="grid lg:grid-cols-3 gap-6 mt-2">
              {/* Assigned Freelancer */}
              <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-sm flex flex-col">
                <h3 className="text-base font-bold text-slate-900 mb-6">Assigned Freelancer</h3>
            <div className="flex gap-4 items-center mb-6">
              <Avatar src="https://i.pravatar.cc/150?u=daniel" name="Daniel Benson" size="lg" className="w-16 h-16 border-2 border-white shadow-md" />
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="font-bold text-slate-900 text-lg">Daniel Benson</span>
                  <CheckCircle2 className="w-4 h-4 text-[#00b259]" />
                </div>
                <p className="text-[13px] font-semibold text-slate-500 mb-1.5">Senior Full Stack Developer</p>
                <div className="flex items-center gap-1.5 text-[13px] font-bold">
                  <span className="text-orange-500 text-base">★</span>
                  <span className="text-slate-900">4.9</span>
                  <span className="text-slate-400 font-medium ml-1">(128 reviews)</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-8 text-center">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <p className="text-lg font-black text-slate-900">97%</p>
                <p className="text-[11px] font-semibold text-slate-500 mt-0.5 tracking-wide">Job Success</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <p className="text-lg font-black text-slate-900">143</p>
                <p className="text-[11px] font-semibold text-slate-500 mt-0.5 tracking-wide">Projects</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <p className="text-lg font-black text-slate-900">7+</p>
                <p className="text-[11px] font-semibold text-slate-500 mt-0.5 tracking-wide">Years Exp.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-auto">
              <button className="py-3 text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm">
                <MessageSquare className="w-4 h-4" /> Message
              </button>
              <button className="py-3 text-sm font-bold text-white bg-[#00b259] hover:bg-[#009b4d] rounded-xl flex items-center justify-center transition-colors shadow-lg shadow-[#00b259]/20">
                View Profile
              </button>
            </div>
          </div>

          {/* About This Project */}
          <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-sm flex flex-col">
            <h3 className="text-base font-bold text-slate-900 mb-5">About This Project</h3>
            <p className="text-[14px] text-slate-500 leading-relaxed mb-6">
              We need a complete redesign of our e-commerce website. The new design should be modern, user-friendly, mobile responsive, and optimized for conversions. Integration with payment gateways and inventory system is required.
            </p>
            <h4 className="text-[13px] font-bold text-slate-900 mb-4 uppercase tracking-wide">Key Requirements</h4>
            <ul className="space-y-3.5 mb-6">
              {['Modern & responsive UI/UX design', 'Payment gateway integration', 'Product catalog & filtering', 'User authentication & checkout', 'Order tracking & notifications'].map((req, i) => (
                <li key={i} className="flex items-start gap-3 text-[14px] text-slate-600 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#00b259] shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
            <button className="text-[13px] font-bold text-[#00b259] mt-auto self-start hover:underline">Show more ⌄</button>
          </div>

          {/* Project Timeline */}
          <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-sm flex flex-col">
            <h3 className="text-base font-bold text-slate-900 mb-8">Project Timeline</h3>
            <div className="relative flex-1 px-2">
              {/* Vertical line */}
              <div className="absolute left-[11px] top-3 bottom-6 w-0.5 bg-slate-200"></div>
              
              <div className="space-y-8 relative">
                <div className="flex gap-5">
                  <div className="w-6 h-6 rounded-full bg-[#00b259] flex items-center justify-center shrink-0 z-10 ring-4 ring-white shadow-sm">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="-mt-0.5">
                    <p className="text-[15px] font-bold text-slate-900">Project Posted</p>
                    <p className="text-[13px] font-semibold text-slate-400 mt-0.5">May 10, 2025</p>
                  </div>
                </div>
                
                <div className="flex gap-5">
                  <div className="w-6 h-6 rounded-full bg-[#00b259] flex items-center justify-center shrink-0 z-10 ring-4 ring-white shadow-sm">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="-mt-0.5">
                    <p className="text-[15px] font-bold text-slate-900">Freelancer Assigned</p>
                    <p className="text-[13px] font-semibold text-slate-400 mt-0.5">May 10, 2025</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-6 h-6 rounded-full bg-[#00b259] flex items-center justify-center shrink-0 z-10 ring-4 ring-white shadow-sm ring-offset-2 ring-offset-green-50">
                    <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                  </div>
                  <div className="-mt-0.5">
                    <p className="text-[15px] font-bold text-[#00b259]">Work in Progress</p>
                    <p className="text-[13px] font-semibold text-slate-400 mt-0.5">May 12, 2025</p>
                  </div>
                </div>

                <div className="flex gap-5 opacity-40">
                  <div className="w-6 h-6 rounded-full bg-white border-2 border-slate-300 shrink-0 z-10 ring-4 ring-white"></div>
                  <div className="-mt-0.5">
                    <p className="text-[15px] font-bold text-slate-900">Review & Feedback</p>
                    <p className="text-[13px] font-semibold text-slate-400 mt-0.5">Pending</p>
                  </div>
                </div>

                <div className="flex gap-5 opacity-40">
                  <div className="w-6 h-6 rounded-full bg-white border-2 border-slate-300 shrink-0 z-10 ring-4 ring-white"></div>
                  <div className="-mt-0.5">
                    <p className="text-[15px] font-bold text-slate-900">Project Completion</p>
                    <p className="text-[13px] font-semibold text-slate-400 mt-0.5">Pending</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Milestones Table Section */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-slate-900">Milestones</h3>
            <button className="text-[13px] font-bold text-[#00b259] hover:underline">View All Milestones</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <th className="pb-4 text-[13px] font-bold text-slate-400 uppercase tracking-wider w-[40%] pl-2">Milestone</th>
                  <th className="pb-4 text-[13px] font-bold text-slate-400 uppercase tracking-wider">Due Date</th>
                  <th className="pb-4 text-[13px] font-bold text-slate-400 uppercase tracking-wider">Progress</th>
                  <th className="pb-4 text-[13px] font-bold text-slate-400 uppercase tracking-wider">Amount</th>
                  <th className="pb-4 text-[13px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="pb-4 text-[13px] font-bold text-slate-400 uppercase tracking-wider text-right pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="group bg-white hover:bg-slate-50 transition-colors">
                  <td className="py-4 pl-2 rounded-l-xl">
                    <div className="flex items-start gap-4">
                      <div className="w-7 h-7 rounded-full bg-[#00b259] text-white flex items-center justify-center text-[13px] font-bold shrink-0 mt-0.5 shadow-sm">1</div>
                      <div>
                        <p className="text-[15px] font-bold text-slate-900">Design & Wireframes</p>
                        <p className="text-[13px] font-medium text-slate-500 mt-0.5">Create UI/UX design and wireframes</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <p className="text-[14px] font-bold text-slate-900">May 12, 2025</p>
                    <p className="text-[12px] font-semibold text-slate-400 mt-0.5">Completed on May 12</p>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden"><div className="w-full h-full bg-[#00b259]"></div></div>
                      <span className="text-[13px] font-bold text-slate-900">100%</span>
                    </div>
                  </td>
                  <td className="py-4 text-[15px] font-bold text-slate-900">$500</td>
                  <td className="py-4">
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none font-bold px-3 py-1 text-xs">Completed</Badge>
                  </td>
                  <td className="py-4 text-right pr-4 rounded-r-xl">
                    <button className="text-[#00b259] hover:bg-green-100 p-2 rounded-lg transition-colors border border-transparent hover:border-green-200">
                      <CheckCircle2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>

                <tr className="group bg-white hover:bg-slate-50 transition-colors">
                  <td className="py-4 pl-2 rounded-l-xl">
                    <div className="flex items-start gap-4">
                      <div className="w-7 h-7 rounded-full bg-[#00b259] text-white flex items-center justify-center text-[13px] font-bold shrink-0 mt-0.5 shadow-sm">2</div>
                      <div>
                        <p className="text-[15px] font-bold text-slate-900">Frontend Development</p>
                        <p className="text-[13px] font-medium text-slate-500 mt-0.5">Implement responsive frontend</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <p className="text-[14px] font-bold text-slate-900">May 18, 2025</p>
                    <p className="text-[12px] font-bold text-orange-500 mt-0.5">Due in 2 days</p>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden"><div className="w-[75%] h-full bg-[#00b259]"></div></div>
                      <span className="text-[13px] font-bold text-slate-900">75%</span>
                    </div>
                  </td>
                  <td className="py-4 text-[15px] font-bold text-slate-900">$800</td>
                  <td className="py-4">
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none font-bold px-3 py-1 text-xs">In Progress</Badge>
                  </td>
                  <td className="py-4 text-right pr-4 rounded-r-xl">
                    <button className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-2 rounded-lg transition-colors border border-transparent hover:border-slate-200">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>

                <tr className="group opacity-60 bg-white">
                  <td className="py-4 pl-2">
                    <div className="flex items-start gap-4">
                      <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[13px] font-bold shrink-0 mt-0.5">3</div>
                      <div>
                        <p className="text-[15px] font-bold text-slate-900">Backend Development</p>
                        <p className="text-[13px] font-medium text-slate-500 mt-0.5">Develop backend & APIs</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <p className="text-[14px] font-bold text-slate-900">May 22, 2025</p>
                    <p className="text-[12px] font-semibold text-slate-400 mt-0.5">Due in 6 days</p>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden"></div>
                      <span className="text-[13px] font-bold text-slate-400">0%</span>
                    </div>
                  </td>
                  <td className="py-4 text-[15px] font-bold text-slate-900">$700</td>
                  <td className="py-4">
                    <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100 border-none font-bold px-3 py-1 text-xs">Pending</Badge>
                  </td>
                  <td className="py-4 text-right pr-4">
                    <button className="text-slate-400 hover:text-slate-700 p-2 rounded-lg transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-100">
            <button className="flex items-center gap-2 text-[14px] font-bold text-[#00b259] hover:text-[#009b4d] transition-colors">
              <Plus className="w-4 h-4" /> Add Milestone
            </button>
          </div>
        </div>
        </>
        )}
        
        {activeTab === 'Milestones' && <MilestonesTab />}
        {activeTab === 'Files' && <FilesTab />}
        {activeTab === 'Messages' && <MessagesTab />}
        {activeTab === 'Payments' && <PaymentsTab />}
        {activeTab === 'Activity' && <ActivityTab />}
        {activeTab === 'Timeline' && <TimelineTab />}

      </div>
    </div>
  );
}
