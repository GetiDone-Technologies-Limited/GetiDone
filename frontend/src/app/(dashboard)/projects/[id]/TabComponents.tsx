import { FileText, CheckCircle2, MessageSquare, Download, Clock, Image as ImageIcon, File, Calendar, MoreHorizontal, ArrowRight, Activity, DollarSign, Send, Paperclip } from 'lucide-react';
import { Badge } from '@/shared/components/ui/Badge';
import { Avatar } from '@/shared/components/ui/Avatar';

export function MilestonesTab() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm mt-2">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">Project Milestones</h3>
          <p className="text-sm font-medium text-slate-500 mt-1">Track deliverables and release payments securely.</p>
        </div>
        <button className="px-5 py-2.5 text-[14px] font-bold text-white bg-[#00b259] hover:bg-[#009b4d] transition-colors rounded-xl flex items-center gap-2 shadow-sm">
          Create Milestone
        </button>
      </div>

      <div className="space-y-4">
        {/* Milestone 1 */}
        <div className="border border-slate-200 rounded-2xl p-6 hover:border-green-300 transition-colors bg-green-50/30">
          <div className="flex flex-col md:flex-row gap-6 justify-between md:items-center">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-[#00b259] text-white flex items-center justify-center font-bold shrink-0 mt-1">1</div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Design & Wireframes</h4>
                <p className="text-[14px] text-slate-500 mt-1 max-w-xl">Create UI/UX design and wireframes for the core pages (Homepage, Product, Checkout). Must be approved before development begins.</p>
                <div className="flex items-center gap-4 mt-3">
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-2.5 py-1">Completed</Badge>
                  <span className="text-[13px] font-semibold text-slate-400 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Approved on May 12</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:items-end gap-3 shrink-0">
              <p className="text-2xl font-black text-slate-900">$500</p>
              <button className="text-[13px] font-bold text-slate-600 bg-white border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50">View Details</button>
            </div>
          </div>
        </div>

        {/* Milestone 2 */}
        <div className="border border-green-200 rounded-2xl p-6 bg-white relative overflow-hidden shadow-sm">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#00b259]"></div>
          <div className="flex flex-col md:flex-row gap-6 justify-between md:items-center pl-2">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold shrink-0 mt-1 border border-green-200">2</div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Frontend Development</h4>
                <p className="text-[14px] text-slate-500 mt-1 max-w-xl">Implement responsive frontend using React/Next.js. Ensure perfect fidelity to the approved Figma designs.</p>
                <div className="flex items-center gap-4 mt-3">
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-2.5 py-1">In Progress</Badge>
                  <span className="text-[13px] font-bold text-orange-500 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Due in 2 days</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:items-end gap-3 shrink-0">
              <p className="text-2xl font-black text-slate-900">$800</p>
              <button className="text-[13px] font-bold text-white bg-[#00b259] px-4 py-2 rounded-lg hover:bg-[#009b4d] shadow-sm">Review Work</button>
            </div>
          </div>
        </div>

        {/* Milestone 3 */}
        <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50 opacity-70">
          <div className="flex flex-col md:flex-row gap-6 justify-between md:items-center">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold shrink-0 mt-1">3</div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Backend Development</h4>
                <p className="text-[14px] text-slate-500 mt-1 max-w-xl">Develop REST APIs and integrate the database. Connect the frontend to live data sources and authentication.</p>
                <div className="flex items-center gap-4 mt-3">
                  <Badge className="bg-slate-200 text-slate-600 hover:bg-slate-200 border-none px-2.5 py-1">Pending</Badge>
                  <span className="text-[13px] font-medium text-slate-400">Due May 22, 2025</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:items-end gap-3 shrink-0">
              <p className="text-2xl font-black text-slate-900">$700</p>
              <button className="text-[13px] font-bold text-slate-600 bg-white border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FilesTab() {
  const files = [
    { name: 'Homepage-Wireframes-v2.pdf', size: '4.2 MB', type: 'pdf', date: 'May 12', uploader: 'Daniel Benson' },
    { name: 'Brand-Guidelines.pdf', size: '1.8 MB', type: 'pdf', date: 'May 10', uploader: 'You' },
    { name: 'Hero-Image-Assets.zip', size: '24.5 MB', type: 'zip', date: 'May 11', uploader: 'Daniel Benson' },
    { name: 'Contract-Agreement.docx', size: '245 KB', type: 'doc', date: 'May 10', uploader: 'System' },
    { name: 'Product-Mockups.fig', size: '12.4 MB', type: 'fig', date: 'May 13', uploader: 'Daniel Benson' },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm mt-2">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-extrabold text-slate-900">Project Files</h3>
        <button className="px-5 py-2.5 text-[14px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors rounded-xl flex items-center gap-2">
          <Plus className="w-4 h-4" /> Upload File
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {files.map((file, i) => (
          <div key={i} className="border border-slate-200 rounded-2xl p-5 hover:border-[#00b259] hover:shadow-md transition-all group flex flex-col cursor-pointer bg-slate-50/50">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                {file.type === 'pdf' ? <FileText className="w-6 h-6 text-red-500" /> : 
                 file.type === 'zip' ? <File className="w-6 h-6 text-yellow-500" /> : 
                 file.type === 'fig' ? <ImageIcon className="w-6 h-6 text-purple-500" /> : 
                 <FileText className="w-6 h-6 text-blue-500" />}
              </div>
              <button className="text-slate-400 hover:text-[#00b259] p-2 bg-white rounded-lg shadow-sm border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">
                <Download className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[14px] font-bold text-slate-900 truncate mb-1" title={file.name}>{file.name}</p>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
              <span className="text-[12px] font-semibold text-slate-400">{file.size}</span>
              <span className="text-[12px] font-medium text-slate-500 flex items-center gap-1">
                <Avatar src="" name={file.uploader} size="sm" className="w-4 h-4" /> {file.uploader}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MessagesTab() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm mt-2 flex flex-col h-[600px] overflow-hidden">
      {/* Chat Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50">
        <div className="flex items-center gap-4">
          <Avatar src="https://i.pravatar.cc/150?u=daniel" name="Daniel Benson" size="lg" className="w-12 h-12 border-2 border-white shadow-sm" />
          <div>
            <h3 className="text-[16px] font-bold text-slate-900">Daniel Benson</h3>
            <p className="text-[13px] font-medium text-[#00b259] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#00b259]"></span> Online
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded-xl transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white custom-scrollbar">
        <div className="text-center">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">May 10, 2025</span>
        </div>
        
        <div className="flex gap-4">
          <Avatar src="https://i.pravatar.cc/150?u=daniel" name="Daniel Benson" size="sm" className="w-8 h-8 shrink-0 mt-1" />
          <div className="flex flex-col items-start max-w-[70%]">
            <div className="bg-slate-100 text-slate-800 px-5 py-3.5 rounded-2xl rounded-tl-sm text-[14px] leading-relaxed">
              Hi there! I've accepted the contract and am ready to get started. I'll begin by working on the wireframes for the homepage as discussed.
            </div>
            <span className="text-[11px] font-semibold text-slate-400 mt-1.5 ml-1">10:45 AM</span>
          </div>
        </div>

        <div className="flex gap-4 flex-row-reverse">
          <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0 mt-1 flex items-center justify-center font-bold text-xs text-slate-600">You</div>
          <div className="flex flex-col items-end max-w-[70%]">
            <div className="bg-[#00b259] text-white px-5 py-3.5 rounded-2xl rounded-tr-sm text-[14px] leading-relaxed shadow-sm">
              Sounds great, Daniel! Let me know if you need any additional brand assets from us.
            </div>
            <span className="text-[11px] font-semibold text-slate-400 mt-1.5 mr-1">11:02 AM</span>
          </div>
        </div>

        <div className="text-center mt-8">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">Today</span>
        </div>

        <div className="flex gap-4">
          <Avatar src="https://i.pravatar.cc/150?u=daniel" name="Daniel Benson" size="sm" className="w-8 h-8 shrink-0 mt-1" />
          <div className="flex flex-col items-start max-w-[70%]">
            <div className="bg-slate-100 text-slate-800 px-5 py-3.5 rounded-2xl rounded-tl-sm text-[14px] leading-relaxed">
              I've just uploaded the initial wireframes for your review. Check out the Files tab! Let me know your thoughts before I proceed to the high-fidelity designs.
            </div>
            <span className="text-[11px] font-semibold text-slate-400 mt-1.5 ml-1">9:15 AM</span>
          </div>
        </div>
      </div>

      {/* Chat Input */}
      <div className="p-5 border-t border-slate-100 bg-white shrink-0">
        <div className="flex items-center gap-3">
          <button className="p-3 text-slate-400 hover:text-primary hover:bg-green-50 rounded-xl transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          <input 
            type="text" 
            placeholder="Type your message here..." 
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 text-[14px] focus:outline-none focus:border-[#00b259] focus:ring-1 focus:ring-[#00b259] transition-all"
          />
          <button className="p-3.5 bg-[#00b259] hover:bg-[#009b4d] text-white rounded-xl transition-colors shadow-sm">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function PaymentsTab() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm mt-2">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">Payment History</h3>
          <p className="text-sm font-medium text-slate-500 mt-1">Review escrow deposits, released milestones, and invoices.</p>
        </div>
        <div className="flex gap-6 items-center">
          <div className="text-right">
            <p className="text-[12px] font-bold text-slate-400 uppercase">Total Paid</p>
            <p className="text-2xl font-black text-[#00b259]">$500.00</p>
          </div>
          <div className="text-right">
            <p className="text-[12px] font-bold text-slate-400 uppercase">In Escrow</p>
            <p className="text-2xl font-black text-slate-900">$2,000.00</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="py-4 px-6 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Invoice ID</th>
              <th className="py-4 px-6 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Date</th>
              <th className="py-4 px-6 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Description</th>
              <th className="py-4 px-6 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Amount</th>
              <th className="py-4 px-6 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="py-4 px-6 text-[12px] font-bold text-slate-500 uppercase tracking-wider text-right">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="py-4 px-6 text-[14px] font-bold text-slate-900">#INV-2025-084</td>
              <td className="py-4 px-6 text-[14px] text-slate-500 font-medium">May 12, 2025</td>
              <td className="py-4 px-6 text-[14px] text-slate-700 font-medium">Milestone 1 Release (Design)</td>
              <td className="py-4 px-6 text-[15px] font-black text-slate-900">$500.00</td>
              <td className="py-4 px-6">
                <Badge className="bg-green-100 text-green-700 border-none px-2.5 py-1">Paid</Badge>
              </td>
              <td className="py-4 px-6 text-right">
                <button className="text-[#00b259] hover:bg-green-100 p-2 rounded-lg transition-colors"><Download className="w-4 h-4" /></button>
              </td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="py-4 px-6 text-[14px] font-bold text-slate-900">#INV-2025-082</td>
              <td className="py-4 px-6 text-[14px] text-slate-500 font-medium">May 10, 2025</td>
              <td className="py-4 px-6 text-[14px] text-slate-700 font-medium">Escrow Deposit (Full Project)</td>
              <td className="py-4 px-6 text-[15px] font-black text-slate-900">$2,500.00</td>
              <td className="py-4 px-6">
                <Badge className="bg-blue-100 text-blue-700 border-none px-2.5 py-1">Funded</Badge>
              </td>
              <td className="py-4 px-6 text-right">
                <button className="text-[#00b259] hover:bg-green-100 p-2 rounded-lg transition-colors"><Download className="w-4 h-4" /></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ActivityTab() {
  const events = [
    { icon: <MessageSquare className="w-4 h-4 text-purple-500" />, bg: 'bg-purple-100', text: 'You sent a message to Daniel Benson', date: 'Today, 11:02 AM' },
    { icon: <FileText className="w-4 h-4 text-blue-500" />, bg: 'bg-blue-100', text: 'Daniel Benson uploaded Homepage-Wireframes-v2.pdf', date: 'Today, 9:15 AM' },
    { icon: <CheckCircle2 className="w-4 h-4 text-green-500" />, bg: 'bg-green-100', text: 'You approved Milestone 1 (Design & Wireframes)', date: 'May 12, 2:30 PM' },
    { icon: <DollarSign className="w-4 h-4 text-slate-600" />, bg: 'bg-slate-200', text: 'Payment of $500 released from escrow', date: 'May 12, 2:31 PM' },
    { icon: <CheckCircle2 className="w-4 h-4 text-green-500" />, bg: 'bg-green-100', text: 'Daniel Benson accepted the contract', date: 'May 10, 10:45 AM' },
    { icon: <DollarSign className="w-4 h-4 text-slate-600" />, bg: 'bg-slate-200', text: 'You funded escrow with $2,500', date: 'May 10, 9:00 AM' },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm mt-2">
      <h3 className="text-xl font-extrabold text-slate-900 mb-8">Project Activity Log</h3>
      
      <div className="relative pl-4">
        {/* Vertical Line */}
        <div className="absolute left-[31px] top-4 bottom-4 w-0.5 bg-slate-100"></div>
        
        <div className="space-y-8 relative">
          {events.map((event, i) => (
            <div key={i} className="flex gap-6 items-start">
              <div className={`w-10 h-10 rounded-full ${event.bg} flex items-center justify-center shrink-0 z-10 border-4 border-white shadow-sm`}>
                {event.icon}
              </div>
              <div className="pt-2">
                <p className="text-[15px] font-bold text-slate-800">{event.text}</p>
                <p className="text-[13px] font-medium text-slate-400 mt-1">{event.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TimelineTab() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm mt-2">
      <h3 className="text-xl font-extrabold text-slate-900 mb-2">Project Schedule</h3>
      <p className="text-sm font-medium text-slate-500 mb-8">Visual overview of project phases and deadlines.</p>

      <div className="flex flex-col gap-6">
        {/* Phase 1 */}
        <div className="flex items-center gap-6">
          <div className="w-32 text-right shrink-0">
            <p className="text-[14px] font-bold text-slate-900">Phase 1</p>
            <p className="text-[12px] font-semibold text-slate-400">May 10 - 12</p>
          </div>
          <div className="flex-1 h-12 bg-slate-100 rounded-xl relative overflow-hidden flex items-center px-4">
            <div className="absolute left-0 top-0 bottom-0 w-[100%] bg-green-100 border border-green-200 rounded-xl"></div>
            <span className="relative z-10 text-[13px] font-bold text-green-800 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Discovery & Design</span>
          </div>
        </div>

        {/* Phase 2 */}
        <div className="flex items-center gap-6">
          <div className="w-32 text-right shrink-0">
            <p className="text-[14px] font-bold text-slate-900">Phase 2</p>
            <p className="text-[12px] font-semibold text-slate-400">May 13 - 18</p>
          </div>
          <div className="flex-1 h-12 bg-slate-100 rounded-xl relative overflow-hidden flex items-center px-4">
            <div className="absolute left-[15%] top-0 bottom-0 w-[40%] bg-blue-100 border border-blue-200 rounded-xl shadow-sm"></div>
            <span className="absolute left-[18%] z-10 text-[13px] font-bold text-blue-800 flex items-center gap-2">Frontend Development</span>
          </div>
        </div>

        {/* Phase 3 */}
        <div className="flex items-center gap-6">
          <div className="w-32 text-right shrink-0">
            <p className="text-[14px] font-bold text-slate-900">Phase 3</p>
            <p className="text-[12px] font-semibold text-slate-400">May 18 - 22</p>
          </div>
          <div className="flex-1 h-12 bg-slate-100 rounded-xl relative flex items-center px-4">
            <div className="absolute left-[50%] top-0 bottom-0 w-[30%] bg-slate-200 border border-slate-300 rounded-xl opacity-60"></div>
            <span className="absolute left-[53%] z-10 text-[13px] font-semibold text-slate-600 flex items-center gap-2">Backend & APIs</span>
          </div>
        </div>

        {/* Phase 4 */}
        <div className="flex items-center gap-6">
          <div className="w-32 text-right shrink-0">
            <p className="text-[14px] font-bold text-slate-900">Phase 4</p>
            <p className="text-[12px] font-semibold text-slate-400">May 22 - 24</p>
          </div>
          <div className="flex-1 h-12 bg-slate-100 rounded-xl relative flex items-center px-4">
            <div className="absolute left-[80%] top-0 bottom-0 w-[20%] bg-orange-100 border border-orange-200 rounded-xl opacity-60"></div>
            <span className="absolute left-[82%] z-10 text-[13px] font-semibold text-orange-800 flex items-center gap-2">Testing & Launch</span>
          </div>
        </div>
      </div>
    </div>
  );
}
