import { Resume, ContactInfo } from '@/types';

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const createEmptyResume = (name: string = 'New Resume'): Resume => {
  const now = new Date().toISOString();
  return {
    id: generateId(),
    name,
    template: 'modern',
    contactInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
    },
    education: [],
    experience: [],
    skills: [],
    projects: [],
    createdAt: now,
    updatedAt: now,
  };
};

export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  } catch {
    return dateString;
  }
};

export const cn = (...classes: (string | undefined | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};
