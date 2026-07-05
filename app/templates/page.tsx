'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { TemplateSelector } from '@/components/template-selector';
import { Resume, TemplateType } from '@/types';
import { storage } from '@/lib/storage';
import { createEmptyResume } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function TemplatesPage() {
  const router = useRouter();
  const [resume, setResume] = useState<Resume | null>(null);

  useEffect(() => {
    const resumes = storage.getResumes();
    if (resumes.length > 0) {
      setResume(resumes[0]);
    } else {
      const newResume = createEmptyResume('My Resume');
      storage.saveResume(newResume);
      setResume(newResume);
    }
  }, []);

  if (!resume) {
    return (
      <>
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </>
    );
  }

  const handleSelectTemplate = (template: TemplateType) => {
    const updated = { ...resume, template, updatedAt: new Date().toISOString() };
    storage.saveResume(updated);
    setResume(updated);
    alert(`Template changed to ${template}`);
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Choose a Template</h1>
          <TemplateSelector
            currentTemplate={resume.template}
            onSelect={handleSelectTemplate}
            sampleResume={resume}
          />
          <div className="mt-8">
            <button
              onClick={() => router.push('/')}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
            >
              Back to Editor
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
