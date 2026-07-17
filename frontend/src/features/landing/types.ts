export interface Professional {
  id: string;
  name: string;
  role: string;
  location: string;
  hourlyRate: string;
  rating: number;
  projects: number;
  experience: string;
  trustScore: number;
  availability: 'Available Now' | 'Available Next Week' | 'Busy';
  skills: string[];
  languages: string[];
  aiMatch: string;
  bio: string;
  category: string;
  avatarSeed: string; // Used for DiceBear avatar generation
}
