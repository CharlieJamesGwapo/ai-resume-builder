'use client';

import { Education } from '@/types';
import { generateId } from '@/lib/utils';

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export function EducationForm({ data, onChange }: EducationFormProps) {
  const handleAdd = () => {
    onChange([
      ...data,
      {
        id: generateId(),
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
      },
    ]);
  };

  const handleChange = (id: string, field: keyof Education, value: string) => {
    onChange(
      data.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  const handleRemove = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id));
  };

  return (
    <div className="space-y-6">
      {data.map((edu) => (
        <div key={edu.id} className="border border-slate-300 dark:border-slate-600 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">{edu.school || 'School'}</h4>
            <button
              onClick={() => handleRemove(edu.id)}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Remove
            </button>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              value={edu.school}
              onChange={(e) => handleChange(edu.id, 'school', e.target.value)}
              placeholder="School/University"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              value={edu.degree}
              onChange={(e) => handleChange(edu.id, 'degree', e.target.value)}
              placeholder="Degree (e.g., Bachelor of Science)"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              value={edu.field}
              onChange={(e) => handleChange(edu.id, 'field', e.target.value)}
              placeholder="Field of Study (optional)"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                type="month"
                value={edu.startDate}
                onChange={(e) =>
                  handleChange(edu.id, 'startDate', e.target.value)
                }
                className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="month"
                value={edu.endDate}
                onChange={(e) => handleChange(edu.id, 'endDate', e.target.value)}
                className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={handleAdd}
        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
      >
        + Add Education
      </button>
    </div>
  );
}
