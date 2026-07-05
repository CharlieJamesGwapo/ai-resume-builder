'use client';

import { Project } from '@/types';
import { generateId } from '@/lib/utils';

interface ProjectsFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export function ProjectsForm({ data, onChange }: ProjectsFormProps) {
  const handleAdd = () => {
    onChange([
      ...data,
      {
        id: generateId(),
        name: '',
        description: '',
        url: '',
      },
    ]);
  };

  const handleChange = (id: string, field: keyof Project, value: string) => {
    onChange(
      data.map((project) =>
        project.id === id ? { ...project, [field]: value } : project
      )
    );
  };

  const handleRemove = (id: string) => {
    onChange(data.filter((project) => project.id !== id));
  };

  return (
    <div className="space-y-6">
      {data.map((project) => (
        <div key={project.id} className="border border-slate-300 dark:border-slate-600 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">{project.name || 'Project'}</h4>
            <button
              onClick={() => handleRemove(project.id)}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Remove
            </button>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              value={project.name}
              onChange={(e) => handleChange(project.id, 'name', e.target.value)}
              placeholder="Project Name"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              value={project.description}
              onChange={(e) =>
                handleChange(project.id, 'description', e.target.value)
              }
              placeholder="Project description and your contributions"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />

            <input
              type="url"
              value={project.url}
              onChange={(e) => handleChange(project.id, 'url', e.target.value)}
              placeholder="Project URL (optional)"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      ))}

      <button
        onClick={handleAdd}
        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
      >
        + Add Project
      </button>
    </div>
  );
}
