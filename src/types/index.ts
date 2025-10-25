export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  role: 'creator' | 'supporter' | 'both';
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  creatorId: string;
  creator: User;
  goalAmount: number;
  currentAmount: number;
  currency: string;
  image: string;
  status: 'active' | 'funded' | 'closed';
  daysLeft: number;
  supportersCount: number;
  createdAt: string;
  featured?: boolean;
}

export interface Donation {
  id: string;
  projectId: string;
  userId: string;
  user: User;
  amount: number;
  currency: string;
  message?: string;
  createdAt: string;
}

export interface ProjectUpdate {
  id: string;
  projectId: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}
