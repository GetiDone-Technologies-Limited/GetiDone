'use client';

import { Users, Mail, MoreHorizontal, UserPlus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { InviteMemberModal } from '@/features/team/components/InviteMemberModal';

export default function TeamPage() {
  const [members, setMembers] = useState([
    { id: '1', name: 'John Maxwell', email: 'john@getidone.com', role: 'Owner', status: 'Active' },
    { id: '2', name: 'Sarah Jenkins', email: 'sarah@getidone.com', role: 'Admin', status: 'Active' },
    { id: '3', name: 'Michael Chen', email: 'michael@getidone.com', role: 'Editor', status: 'Pending' },
  ]);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const handleInvite = (memberData: any) => {
    const newMember = {
      id: `usr_${Math.floor(Math.random() * 1000)}`,
      name: memberData.name || 'Invited User',
      email: memberData.email,
      role: memberData.role,
      status: 'Pending',
    };
    setMembers([newMember, ...members]);
    setIsInviteModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Team Members</h1>
          <p className="text-slate-500 mt-2 font-medium">Manage your organization's members and their permissions.</p>
        </div>
        <button 
          onClick={() => setIsInviteModalOpen(true)}
          className="px-5 py-2.5 bg-[#00b259] hover:bg-[#009b4d] text-white font-bold rounded-xl shadow-sm transition-colors flex items-center gap-2"
        >
          <UserPlus className="w-5 h-5" /> Invite Member
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="py-4 px-6 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Name</th>
              <th className="py-4 px-6 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Email</th>
              <th className="py-4 px-6 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Role</th>
              <th className="py-4 px-6 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="py-4 px-6 text-[12px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {members.map(member => (
              <tr key={member.id} className="hover:bg-slate-50 transition-colors group">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#00b259]/10 text-[#00b259] flex items-center justify-center font-bold">
                      {member.name.charAt(0)}
                    </div>
                    <span className="text-sm font-bold text-slate-900">{member.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm font-medium text-slate-600">{member.email}</td>
                <td className="py-4 px-6 text-sm font-bold text-slate-700">{member.role}</td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                    ${member.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    {member.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <InviteMemberModal 
        open={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={handleInvite}
      />
    </div>
  );
}
