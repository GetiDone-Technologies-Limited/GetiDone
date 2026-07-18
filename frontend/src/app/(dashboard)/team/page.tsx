import { Users2, UserPlus } from 'lucide-react';

export default function TeamPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Team Members</h1>
          <p className="text-slate-500 mt-2 font-medium">Manage your organization's workspace and access levels.</p>
        </div>
        <button className="px-5 py-2.5 bg-[#00b259] hover:bg-[#009b4d] text-white font-bold rounded-xl shadow-sm transition-colors flex items-center gap-2">
          <UserPlus className="w-4 h-4" /> Invite Member
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="py-4 px-6 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Member</th>
              <th className="py-4 px-6 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Role</th>
              <th className="py-4 px-6 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="py-4 px-6 text-[12px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="py-4 px-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                <div>
                  <p className="text-[14px] font-bold text-slate-900">You (Owner)</p>
                  <p className="text-[12px] font-medium text-slate-500">you@getidone.com</p>
                </div>
              </td>
              <td className="py-4 px-6 text-[14px] text-slate-700 font-medium">Admin</td>
              <td className="py-4 px-6">
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">Active</span>
              </td>
              <td className="py-4 px-6 text-right">
                <button className="text-slate-400 hover:text-slate-600 font-medium text-sm">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-slate-50 rounded-3xl border border-slate-200 border-dashed p-12 text-center flex flex-col items-center justify-center mt-6">
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm border border-slate-100">
          <Users2 className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-1">Invite your team</h3>
        <p className="text-slate-500 text-sm max-w-sm mb-6">
          Collaborate on projects, manage billing, and hire faster together by bringing your team to GetiDone.
        </p>
        <button className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl shadow-sm transition-colors">
          Send Invitations
        </button>
      </div>
    </div>
  );
}
