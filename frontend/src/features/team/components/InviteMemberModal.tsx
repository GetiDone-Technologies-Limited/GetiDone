'use client';

import { useState } from 'react';
import { Modal } from '@/shared/components/ui/Modal';
import { Input } from '@/shared/components/ui/Input';
import { Button } from '@/shared/components/ui/Button';
import { Mail, Send } from 'lucide-react';

interface InviteMemberModalProps {
  open: boolean;
  onClose: () => void;
  onInvite: (memberData: { name?: string; email: string; role: string }) => void;
}

export function InviteMemberModal({ open, onClose, onInvite }: InviteMemberModalProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Editor');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call to send invitation
    setTimeout(() => {
      onInvite({
        email,
        role,
        name: email.split('@')[0], // Mock name based on email
      });
      
      // Reset state
      setIsSubmitting(false);
      setEmail('');
      setRole('Editor');
      setMessage('');
    }, 1500);
  };

  return (
    <Modal open={open} onClose={onClose} title="Invite Team Member" size="md">
      <form onSubmit={handleSubmit} className="mt-4 space-y-5">
        <p className="text-sm text-slate-500">
          Send an invitation to collaborate. They will receive an email with instructions to join your workspace.
        </p>

        <div className="space-y-4">
          <Input 
            label="Email Address" 
            type="email"
            placeholder="colleague@company.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Role</label>
            <select 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-[#00b259] focus:ring-2 focus:ring-[#00b259]/20 focus:outline-none transition-all bg-white"
            >
              <option value="Admin">Admin - Full access to all settings and billing</option>
              <option value="Editor">Editor - Can create, edit, and manage projects</option>
              <option value="Viewer">Viewer - Can only view projects and contracts</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Personal Message (Optional)</label>
            <textarea
              rows={3}
              placeholder="Hi! I'm inviting you to our GetiDone workspace..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-[#00b259] focus:ring-2 focus:ring-[#00b259]/20 focus:outline-none transition-all"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
          <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
          <Button 
            type="submit" 
            disabled={!email || isSubmitting} 
            loading={isSubmitting}
            leftIcon={!isSubmitting && <Send className="w-4 h-4" />}
          >
            Send Invitation
          </Button>
        </div>
      </form>
    </Modal>
  );
}
