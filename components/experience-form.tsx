'use client';

import { Experience } from '@/types';
import { generateId } from '@/lib/utils';
import { useState } from 'react';
import { improveExperienceBullets } from '@/lib/openai';

interface ExperienceFormProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

export function ExperienceForm({ data, onChange }: ExperienceFormProps) {
  const [improving, setImproving] = useState<string | null>(null);

  const handleAdd = () => {
    onChange([
      ...data,
      {
        id: generateId(),
        company: '',
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        currentlyWorking: false,
      },
    ]);
  };

  const handleChange = (
    id: string,
    field: keyof Experience,
    value: string | boolean
  ) => {
    onChange(
      data.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const handleRemove = (id: string) => {
    onChange(data.filter((exp) => exp.id !== id));
  };

  const handleImprove = async (id: string) => {
    const exp = data.find((e) => e.id === id);
    if (!exp) return;

    setImproving(id);
    try {
      const bullets = exp.description
        .split('\n')
        .filter((b) => b.trim().length > 0);
      const improved = await improveExperienceBullets(
        bullets,
        exp.title,
        exp.company
      );
      handleChange(id, 'description', improved.join('\n'));
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : 'Failed to improve bullets'
      );
    } finally {
      setImproving(null);
    }
  };

  return (
    <div className="space-y-6">
      {data.map((exp) => (
        <div key={exp.id} className="border border-slate-300 dark:border-slate-600 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">{exp.company || 'Company'}</h4>
            <button
              onClick={() => handleRemove(exp.id)}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Remove
            </button>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              value={exp.company}
              onChange={(e) => handleChange(exp.id, 'company', e.target.value)}
              placeholder="Company"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              value={exp.title}
              onChange={(e) => handleChange(exp.id, 'title', e.target.value)}
              placeholder="Job Title"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex gap-2">
              <textarea
                value={exp.description}
                onChange={(e) =>
                  handleChange(exp.id, 'description', e.target.value)
                }
                placeholder="Description (one achievement per line)"
                className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
              <button
                onClick={() => handleImprove(exp.id)}
                disabled={
                  improving === exp.id ||
                  !exp.description ||
                  !exp.title ||
                  !exp.company
                }
                className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white rounded-lg transition font-medium text-sm h-fit"
              >
                {improving === exp.id ? '✨ ...' : '✨ AI'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="month"
                value={exp.startDate}
                onChange={(e) =>
                  handleChange(exp.id, 'startDate', e.target.value)
                }
                className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {!exp.currentlyWorking && (
                <input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) =>
                    handleChange(exp.id, 'endDate', e.target.value)
                  }
                  className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={exp.currentlyWorking}
                onChange={(e) =>
                  handleChange(exp.id, 'currentlyWorking', e.target.checked)
                }
                className="w-4 h-4"
              />
              <span className="text-sm">Currently working here</span>
            </label>
          </div>
        </div>
      ))}

      <button
        onClick={handleAdd}
        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
      >
        + Add Experience
      </button>
    </div>
  );
}
