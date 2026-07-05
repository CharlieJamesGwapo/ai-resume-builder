export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface Experience {
  id: string;
  company: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
}

export interface Skill {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url?: string;
}

export interface Resume {
  id: string;
  name: string;
  template: 'modern' | 'professional' | 'simple';
  contactInfo: ContactInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  createdAt: string;
  updatedAt: string;
}

export interface Settings {
  theme: 'light' | 'dark' | 'system';
  openaiApiKey: string;
}

export type TemplateType = 'modern' | 'professional' | 'simple';
