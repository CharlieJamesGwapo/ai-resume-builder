'use client';

import { ContactInfo } from '@/types';

interface ContactInfoFormProps {
  data: ContactInfo;
  onChange: (data: ContactInfo) => void;
}

export function ContactInfoForm({ data, onChange }: ContactInfoFormProps) {
  const handleChange = (field: keyof ContactInfo, value: string) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input
          type="tel"
          value={data.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="+1 (555) 000-0000"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Location</label>
        <input
          type="text"
          value={data.location}
          onChange={(e) => handleChange('location', e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="San Francisco, CA"
        />
      </div>
    </div>
  );
}
