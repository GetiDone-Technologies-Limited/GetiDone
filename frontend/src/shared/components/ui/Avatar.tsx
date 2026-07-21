'use client';

import * as React from 'react';
import { getInitials } from '@/shared/lib/utils';

interface AvatarProps {
  src?: string;
  name?: string;
  gender?: 'male' | 'female';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  alt?: string;
}

const sizeClasses = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
};

const bgColors = [
  'bg-primary-500',
  'bg-blue-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-cyan-500',
];

function getColorClass(name = ''): string {
  const sum = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return bgColors[sum % bgColors.length];
}

export function Avatar({ src, name = '', gender, size = 'md', className = '', alt }: AvatarProps) {
  const [imgError, setImgError] = React.useState(false);

  // If no src is provided, but we have a gender, use the avatar service.
  // Otherwise, fallback to the colored initials.
  const resolvedSrc = src || (gender ? `https://avatar.iran.liara.run/public/${gender === 'male' ? 'boy' : 'girl'}?username=${encodeURIComponent(name)}` : undefined);
  const showFallback = !resolvedSrc || imgError;

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full overflow-hidden flex-shrink-0 ${sizeClasses[size]} ${className}`}
    >
      {!showFallback ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={resolvedSrc}
          alt={alt ?? name}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span
          className={`flex h-full w-full items-center justify-center font-semibold text-white ${getColorClass(name)}`}
        >
          {getInitials(name) || '?'}
        </span>
      )}
    </span>
  );
}

