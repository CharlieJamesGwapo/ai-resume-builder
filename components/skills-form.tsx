'use client';

import { Skill } from '@/types';
import { generateId } from '@/lib/utils';

interface SkillsFormProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

export function SkillsForm({ data, onChange }: SkillsFormProps) {
  const handleAdd = () => {
    onChange([
      ...data,
      {
        id: generateId(),
        name: '',
      },
    ]);
  };

  const handleChange = (id: string, name: string) => {
    onChange(data.map((skill) => (skill.id === id ? { ...skill, name } : skill)));
  };

  const handleRemove = (id: string) => {
    onChange(data.filter((skill) => skill.id !== id));
  };

  return (
    <div className="space-y-3">
      {data.map((skill) => (
        <div key={skill.id} className="flex gap-2">
          <input
            type="text"
            value={skill.name}
            onChange={(e) => handleChange(skill.id, e.target.value)}
            placeholder="e.g., Python, React, Project Management"
            className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => handleRemove(skill.id)}
            className="px-3 py-2 text-red-600 hover:text-red-700 font-medium"
          >
            ×
          </button>
        </div>
      ))}

      <button
        onClick={handleAdd}
        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
      >
        + Add Skill
      </button>
    </div>
  );
}
