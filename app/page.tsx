'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { ContactInfoForm } from '@/components/contact-info-form';
import { EducationForm } from '@/components/education-form';
import { ExperienceForm } from '@/components/experience-form';
import { SkillsForm } from '@/components/skills-form';
import { ProjectsForm } from '@/components/projects-form';
import { ResumePreview } from '@/components/resume-preview';
import { ExportPDFButton } from '@/components/export-pdf-button';
import { Resume } from '@/types';
import { storage } from '@/lib/storage';
import { createEmptyResume } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [resume, setResume] = useState<Resume | null>(null);
  const [resumeName, setResumeName] = useState('');

  useEffect(() => {
    const resumes = storage.getResumes();
    if (resumes.length > 0) {
      setResume(resumes[0]);
      setResumeName(resumes[0].name);
    } else {
      const newResume = createEmptyResume('My Resume');
      storage.saveResume(newResume);
      setResume(newResume);
      setResumeName(newResume.name);
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

  const handleSave = () => {
    const updatedResume = { ...resume, name: resumeName, updatedAt: new Date().toISOString() };
    storage.saveResume(updatedResume);
    setResume(updatedResume);
    alert('Resume saved!');
  };

  const handleNewResume = () => {
    const newResume = createEmptyResume('New Resume');
    storage.saveResume(newResume);
    setResume(newResume);
    setResumeName(newResume.name);
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <input
                type="text"
                value={resumeName}
                onChange={(e) => setResumeName(e.target.value)}
                className="text-2xl font-bold px-2 py-1 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleNewResume}
                className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition font-medium"
              >
                ➕ New Resume
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
              >
                💾 Save
              </button>
              <ExportPDFButton resume={resume} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form */}
            <div className="space-y-8 overflow-y-auto max-h-[calc(100vh-200px)]">
              <section>
                <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                <ContactInfoForm
                  data={resume.contactInfo}
                  onChange={(contactInfo) =>
                    setResume({ ...resume, contactInfo })
                  }
                />
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">Experience</h2>
                <ExperienceForm
                  data={resume.experience}
                  onChange={(experience) =>
                    setResume({ ...resume, experience })
                  }
                />
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">Education</h2>
                <EducationForm
                  data={resume.education}
                  onChange={(education) =>
                    setResume({ ...resume, education })
                  }
                />
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">Skills</h2>
                <SkillsForm
                  data={resume.skills}
                  onChange={(skills) => setResume({ ...resume, skills })}
                />
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">Projects</h2>
                <ProjectsForm
                  data={resume.projects}
                  onChange={(projects) =>
                    setResume({ ...resume, projects })
                  }
                />
              </section>
            </div>

            {/* Preview */}
            <div className="sticky top-0 max-h-[calc(100vh-80px)] overflow-y-auto border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900">
              <ResumePreview resume={resume} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
