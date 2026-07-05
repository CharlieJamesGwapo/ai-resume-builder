'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Resume } from '@/types';
import { storage } from '@/lib/storage';
import { useRouter } from 'next/navigation';

export default function MyResumesPage() {
  const router = useRouter();
  const [resumes, setResumes] = useState<Resume[]>([]);

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = () => {
    setResumes(storage.getResumes());
  };

  const handleSelectResume = (id: string) => {
    // Navigate to editor with selected resume (in real app, would pass via state)
    // For now, we'll just sort the list so the selected resume is first
    const resumes = storage.getResumes();
    const selected = resumes.find((r) => r.id === id);
    if (selected) {
      const others = resumes.filter((r) => r.id !== id);
      const reordered = [selected, ...others];
      storage.saveResume(selected); // This ensures it's loaded first
    }
    router.push('/');
  };

  const handleDeleteResume = (id: string) => {
    if (confirm('Are you sure you want to delete this resume?')) {
      storage.deleteResume(id);
      loadResumes();
    }
  };

  const handleDuplicateResume = (resume: Resume) => {
    const duplicate: Resume = {
      ...resume,
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      name: `${resume.name} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    storage.saveResume(duplicate);
    loadResumes();
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">My Resumes</h1>

          {resumes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                No resumes yet. Create your first one!
              </p>
              <button
                onClick={() => router.push('/')}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
              >
                Create Resume
              </button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {resumes.map((resume) => (
                <div
                  key={resume.id}
                  className="border border-slate-300 dark:border-slate-600 rounded-lg p-6 hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-bold mb-2">{resume.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    Template: {resume.template}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mb-4">
                    Updated:{' '}
                    {new Date(resume.updatedAt).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSelectResume(resume.id)}
                      className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDuplicateResume(resume)}
                      className="px-3 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded transition text-sm font-medium"
                    >
                      📋
                    </button>
                    <button
                      onClick={() => handleDeleteResume(resume.id)}
                      className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition text-sm font-medium"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
