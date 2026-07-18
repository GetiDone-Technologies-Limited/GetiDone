import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/shared/lib/api-client';
import type { FreelancerProfile } from '../types/matching.types';

// Fallback mock data in case API fails
const mockFreelancers: FreelancerProfile[] = [
  {
    id: 'f1',
    userId: 'u1',
    bio: 'Award-winning designer focusing on fintech and enterprise apps.',
    skills: ['UI/UX Design', 'Figma', 'React', 'Tailwind'],
    hourlyRate: 45,
    availability: true,
    reviewCount: 24,
    avgRating: 4.9,
    user: {
      id: 'u1',
      name: 'Daniel Benson',
      email: 'daniel@example.com',
      avatarUrl: 'https://i.pravatar.cc/150?u=daniel',
      doneScore: 98,
      role: 'FREELANCER',
      kycStatus: 'VERIFIED'
    }
  },
  {
    id: 'f2',
    userId: 'u2',
    bio: 'Specialized in scalable microservices and database optimization.',
    skills: ['Node.js', 'NestJS', 'PostgreSQL', 'AWS'],
    hourlyRate: 65,
    availability: false,
    reviewCount: 41,
    avgRating: 4.7,
    user: {
      id: 'u2',
      name: 'Sarah Jenkins',
      email: 'sarah@example.com',
      avatarUrl: 'https://i.pravatar.cc/150?u=sarah',
      doneScore: 94,
      role: 'FREELANCER',
      kycStatus: 'VERIFIED'
    }
  },
  {
    id: 'f3',
    userId: 'u3',
    bio: 'Building secure decentralized protocols and DeFi applications.',
    skills: ['Solidity', 'Web3', 'Smart Contracts', 'Rust'],
    hourlyRate: 85,
    availability: true,
    reviewCount: 15,
    avgRating: 5.0,
    user: {
      id: 'u3',
      name: 'Alex Chen',
      email: 'alex@example.com',
      avatarUrl: 'https://i.pravatar.cc/150?u=alex',
      doneScore: 100,
      role: 'FREELANCER',
      kycStatus: 'VERIFIED'
    }
  },
];

export function useFreelancers() {
  return useQuery({
    queryKey: ['freelancers'],
    queryFn: async () => {
      try {
        const response = await apiClient.get<FreelancerProfile[]>('/user/freelancers');
        if (response && response.length > 0) {
          return response;
        }
        return mockFreelancers;
      } catch (error) {
        console.warn('Failed to fetch freelancers from API, falling back to mock data.', error);
        return mockFreelancers;
      }
    },
  });
}
