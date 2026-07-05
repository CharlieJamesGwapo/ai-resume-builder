import { Resume, Settings } from '@/types';

const RESUMES_KEY = 'ai_resume_builder_resumes';
const SETTINGS_KEY = 'ai_resume_builder_settings';

export const storage = {
  // Resumes
  getResumes: (): Resume[] => {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(RESUMES_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveResume: (resume: Resume): void => {
    if (typeof window === 'undefined') return;
    const resumes = storage.getResumes();
    const index = resumes.findIndex((r) => r.id === resume.id);
    if (index >= 0) {
      resumes[index] = resume;
    } else {
      resumes.push(resume);
    }
    localStorage.setItem(RESUMES_KEY, JSON.stringify(resumes));
  },

  deleteResume: (id: string): void => {
    if (typeof window === 'undefined') return;
    const resumes = storage.getResumes();
    const filtered = resumes.filter((r) => r.id !== id);
    localStorage.setItem(RESUMES_KEY, JSON.stringify(filtered));
  },

  getResume: (id: string): Resume | null => {
    const resumes = storage.getResumes();
    return resumes.find((r) => r.id === id) || null;
  },

  // Settings
  getSettings: (): Settings => {
    if (typeof window === 'undefined') {
      return { theme: 'system', openaiApiKey: '' };
    }
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      return data
        ? JSON.parse(data)
        : { theme: 'system', openaiApiKey: '' };
    } catch {
      return { theme: 'system', openaiApiKey: '' };
    }
  },

  saveSettings: (settings: Settings): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  },

  getApiKey: (): string => {
    return storage.getSettings().openaiApiKey;
  },

  setApiKey: (key: string): void => {
    const settings = storage.getSettings();
    storage.saveSettings({ ...settings, openaiApiKey: key });
  },

  setTheme: (theme: 'light' | 'dark' | 'system'): void => {
    const settings = storage.getSettings();
    storage.saveSettings({ ...settings, theme });
  },
};
