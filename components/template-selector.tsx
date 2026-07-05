'use client';

import { TemplateType, Resume } from '@/types';
import { ResumePreview } from './resume-preview';

interface TemplateSelectorProps {
  currentTemplate: TemplateType;
  onSelect: (template: TemplateType) => void;
  sampleResume: Resume;
}

const TEMPLATES: { id: TemplateType; name: string; description: string }[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary with accent colors',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Classic corporate style with clear sections',
  },
  {
    id: 'simple',
    name: 'Simple',
    description: 'Minimal and ATS-optimized',
  },
];

export function TemplateSelector({
  currentTemplate,
  onSelect,
  sampleResume,
}: TemplateSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template.id)}
            className={`p-4 rounded-lg border-2 transition text-left ${
              currentTemplate === template.id
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-950'
                : 'border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-400'
            }`}
          >
            <h3 className="font-bold text-lg">{template.name}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {template.description}
            </p>
          </button>
        ))}
      </div>

      {/* Preview */}
      <div className="border border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-900">
        <div className="max-h-96 overflow-y-auto">
          <ResumePreview
            resume={{ ...sampleResume, template: currentTemplate }}
          />
        </div>
      </div>
    </div>
  );
}
