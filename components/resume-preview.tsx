'use client';

import { Resume } from '@/types';
import { formatDate } from '@/lib/utils';

interface ResumePreviewProps {
  resume: Resume;
}

export function ResumePreview({ resume }: ResumePreviewProps) {
  const template = resume.template;

  if (template === 'modern') {
    return <ModernTemplate resume={resume} />;
  } else if (template === 'professional') {
    return <ProfessionalTemplate resume={resume} />;
  } else {
    return <SimpleTemplate resume={resume} />;
  }
}

function ModernTemplate({ resume }: ResumePreviewProps) {
  return (
    <div className="bg-white p-12 text-slate-900 font-sans text-sm leading-relaxed">
      {/* Header */}
      <div className="border-b-4 border-blue-600 pb-6 mb-6">
        <h1 className="text-4xl font-bold text-slate-900">
          {resume.contactInfo.name}
        </h1>
        <div className="flex gap-4 text-xs mt-2 text-slate-600">
          {resume.contactInfo.email && <span>{resume.contactInfo.email}</span>}
          {resume.contactInfo.phone && <span>{resume.contactInfo.phone}</span>}
          {resume.contactInfo.location && (
            <span>{resume.contactInfo.location}</span>
          )}
        </div>
      </div>

      {/* Experience */}
      {resume.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-3 uppercase">
            Experience
          </h2>
          {resume.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-900">{exp.title}</h3>
                  <p className="text-slate-600">{exp.company}</p>
                </div>
                <span className="text-xs text-slate-600">
                  {exp.startDate}
                  {exp.currentlyWorking ? ' - Present' : ` - ${exp.endDate}`}
                </span>
              </div>
              {exp.description && (
                <p className="text-xs whitespace-pre-wrap mt-1 text-slate-700">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-3 uppercase">
            Education
          </h2>
          {resume.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-900">
                    {edu.degree}
                    {edu.field && ` in ${edu.field}`}
                  </h3>
                  <p className="text-slate-600 text-xs">{edu.school}</p>
                </div>
                <span className="text-xs text-slate-600">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-3 uppercase">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill) => (
              <span
                key={skill.id}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-xs font-medium"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resume.projects.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-blue-600 mb-3 uppercase">
            Projects
          </h2>
          {resume.projects.map((proj) => (
            <div key={proj.id} className="mb-3">
              <h3 className="font-bold text-slate-900">{proj.name}</h3>
              {proj.description && (
                <p className="text-xs text-slate-700 whitespace-pre-wrap">
                  {proj.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProfessionalTemplate({ resume }: ResumePreviewProps) {
  return (
    <div className="bg-white p-12 text-slate-900 font-sans text-sm leading-relaxed">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">
          {resume.contactInfo.name}
        </h1>
        <div className="flex gap-4 text-xs mt-2 text-slate-600">
          {resume.contactInfo.email && <span>{resume.contactInfo.email}</span>}
          {resume.contactInfo.phone && <span>{resume.contactInfo.phone}</span>}
          {resume.contactInfo.location && (
            <span>{resume.contactInfo.location}</span>
          )}
        </div>
      </div>

      {/* Experience */}
      {resume.experience.length > 0 && (
        <div className="mb-6">
          <div className="border-b-2 border-slate-800 pb-1 mb-3">
            <h2 className="text-lg font-bold text-slate-900 uppercase">
              Professional Experience
            </h2>
          </div>
          {resume.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-900">{exp.title}</h3>
                  <p className="text-slate-700 text-xs">{exp.company}</p>
                </div>
                <span className="text-xs text-slate-600 whitespace-nowrap">
                  {exp.startDate}–
                  {exp.currentlyWorking ? 'Present' : exp.endDate}
                </span>
              </div>
              {exp.description && (
                <p className="text-xs whitespace-pre-wrap mt-2 text-slate-700">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <div className="mb-6">
          <div className="border-b-2 border-slate-800 pb-1 mb-3">
            <h2 className="text-lg font-bold text-slate-900 uppercase">
              Education
            </h2>
          </div>
          {resume.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-900">
                    {edu.degree}
                    {edu.field && ` in ${edu.field}`}
                  </h3>
                  <p className="text-slate-700 text-xs">{edu.school}</p>
                </div>
                <span className="text-xs text-slate-600">
                  {edu.startDate}–{edu.endDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && (
        <div className="mb-6">
          <div className="border-b-2 border-slate-800 pb-1 mb-3">
            <h2 className="text-lg font-bold text-slate-900 uppercase">
              Skills
            </h2>
          </div>
          <p className="text-xs text-slate-700">
            {resume.skills.map((s) => s.name).join(' • ')}
          </p>
        </div>
      )}

      {/* Projects */}
      {resume.projects.length > 0 && (
        <div>
          <div className="border-b-2 border-slate-800 pb-1 mb-3">
            <h2 className="text-lg font-bold text-slate-900 uppercase">
              Projects
            </h2>
          </div>
          {resume.projects.map((proj) => (
            <div key={proj.id} className="mb-3">
              <h3 className="font-bold text-slate-900">{proj.name}</h3>
              {proj.description && (
                <p className="text-xs text-slate-700 whitespace-pre-wrap">
                  {proj.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SimpleTemplate({ resume }: ResumePreviewProps) {
  return (
    <div className="bg-white p-12 text-slate-900 font-sans text-sm leading-relaxed">
      {/* Header */}
      <h1 className="text-2xl font-bold text-slate-900">
        {resume.contactInfo.name}
      </h1>
      <div className="text-xs text-slate-600 mt-1">
        {[
          resume.contactInfo.email,
          resume.contactInfo.phone,
          resume.contactInfo.location,
        ]
          .filter(Boolean)
          .join(' | ')}
      </div>

      {/* Experience */}
      {resume.experience.length > 0 && (
        <div className="mt-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase">
            Experience
          </h2>
          {resume.experience.map((exp) => (
            <div key={exp.id} className="mt-2">
              <h3 className="font-bold text-slate-900">{exp.title}</h3>
              <p className="text-xs text-slate-600">
                {exp.company} | {exp.startDate}–
                {exp.currentlyWorking ? 'Present' : exp.endDate}
              </p>
              {exp.description && (
                <p className="text-xs text-slate-700 mt-1 whitespace-pre-wrap">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <div className="mt-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase">
            Education
          </h2>
          {resume.education.map((edu) => (
            <div key={edu.id} className="mt-2">
              <h3 className="font-bold text-slate-900">
                {edu.degree}
                {edu.field && ` in ${edu.field}`}
              </h3>
              <p className="text-xs text-slate-600">
                {edu.school} | {edu.startDate}–{edu.endDate}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && (
        <div className="mt-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase">
            Skills
          </h2>
          <p className="text-xs text-slate-700 mt-1">
            {resume.skills.map((s) => s.name).join(', ')}
          </p>
        </div>
      )}

      {/* Projects */}
      {resume.projects.length > 0 && (
        <div className="mt-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase">
            Projects
          </h2>
          {resume.projects.map((proj) => (
            <div key={proj.id} className="mt-2">
              <h3 className="font-bold text-slate-900">{proj.name}</h3>
              {proj.description && (
                <p className="text-xs text-slate-700 mt-1 whitespace-pre-wrap">
                  {proj.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
