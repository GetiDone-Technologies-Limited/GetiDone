'use client';

import * as React from 'react';
import { Modal } from '@/shared/components/ui/Modal';
import { useProfile } from '../hooks/useProfile';
import { SharedProfileView } from './SharedProfileView';

interface PublicProfileModalProps {
  userId: string;
  open: boolean;
  onClose: () => void;
}

export function PublicProfileModal({ userId, open, onClose }: PublicProfileModalProps) {
  const { data: profile } = useProfile(userId);

  if (!open) return null;

  return (
    <Modal 
      open={open} 
      onClose={onClose} 
      title={profile?.name ? `${profile.name}'s Profile` : 'Loading Profile...'} 
      size="xl"
    >
      <div className="-mx-6 sm:-mx-8 -mt-6">
        <SharedProfileView userId={userId} />
      </div>
    </Modal>
  );
}
