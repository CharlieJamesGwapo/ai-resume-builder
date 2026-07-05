import jsPDF from 'jspdf';
import { Resume } from '@/types';

export function exportResumeToPDF(resume: Resume): void {
  const doc = new jsPDF();
  let yPosition = 15;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const maxWidth = pageWidth - 2 * margin;

  const setFont = (size: number, weight: 'bold' | 'normal' = 'normal') => {
    doc.setFont('Helvetica', weight);
    doc.setFontSize(size);
  };

  const addText = (
    text: string,
    options: {
      size?: number;
      weight?: 'bold' | 'normal';
      color?: [number, number, number];
      y?: number;
    } = {}
  ) => {
    const { size = 11, weight = 'normal', color = [0, 0, 0], y } = options;
    setFont(size, weight);
    if (color) {
      doc.setTextColor(color[0], color[1], color[2]);
    }
    if (y) {
      yPosition = y;
    }
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, margin, yPosition);
    yPosition += lines.length * 5;
  };

  const addSection = (title: string) => {
    yPosition += 3;
    setFont(12, 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(title, margin, yPosition);
    yPosition += 6;
    doc.setDrawColor(100, 100, 100);
    doc.line(margin, yPosition - 2, pageWidth - margin, yPosition - 2);
    yPosition += 2;
  };

  const checkPageBreak = (space: number = 15) => {
    if (yPosition + space > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
    }
  };

  // Header
  setFont(18, 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text(resume.contactInfo.name, margin, yPosition);
  yPosition += 8;

  // Contact info
  setFont(10);
  const contactInfo = [
    resume.contactInfo.email,
    resume.contactInfo.phone,
    resume.contactInfo.location,
  ]
    .filter((x) => x)
    .join(' | ');
  doc.text(contactInfo, margin, yPosition);
  yPosition += 8;

  // Experience
  if (resume.experience.length > 0) {
    checkPageBreak(20);
    addSection('EXPERIENCE');

    resume.experience.forEach((exp) => {
      checkPageBreak(15);
      setFont(11, 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(`${exp.title} – ${exp.company}`, margin, yPosition);
      yPosition += 5;

      setFont(10);
      doc.setTextColor(100, 100, 100);
      const dateStr = exp.currentlyWorking
        ? `${exp.startDate} – Present`
        : `${exp.startDate} – ${exp.endDate}`;
      doc.text(dateStr, margin, yPosition);
      yPosition += 5;

      setFont(10);
      doc.setTextColor(0, 0, 0);
      const descLines = doc.splitTextToSize(exp.description, maxWidth - 5);
      doc.text(descLines, margin + 5, yPosition);
      yPosition += descLines.length * 4 + 3;
    });
  }

  // Education
  if (resume.education.length > 0) {
    checkPageBreak(20);
    addSection('EDUCATION');

    resume.education.forEach((edu) => {
      checkPageBreak(12);
      setFont(11, 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(`${edu.degree}${edu.field ? ' in ' + edu.field : ''}`, margin, yPosition);
      yPosition += 5;

      setFont(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`${edu.school} | ${edu.startDate} – ${edu.endDate}`, margin, yPosition);
      yPosition += 6;
    });
  }

  // Skills
  if (resume.skills.length > 0) {
    checkPageBreak(12);
    addSection('SKILLS');

    const skillNames = resume.skills.map((s) => s.name).join(' • ');
    setFont(10);
    doc.setTextColor(0, 0, 0);
    const skillLines = doc.splitTextToSize(skillNames, maxWidth);
    doc.text(skillLines, margin, yPosition);
    yPosition += skillLines.length * 4 + 2;
  }

  // Projects
  if (resume.projects.length > 0) {
    checkPageBreak(15);
    addSection('PROJECTS');

    resume.projects.forEach((proj) => {
      checkPageBreak(12);
      setFont(11, 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(proj.name, margin, yPosition);
      yPosition += 5;

      setFont(10);
      doc.setTextColor(0, 0, 0);
      const projLines = doc.splitTextToSize(proj.description, maxWidth - 5);
      doc.text(projLines, margin + 5, yPosition);
      yPosition += projLines.length * 4 + 3;
    });
  }

  // Save
  doc.save(`${resume.name || 'resume'}.pdf`);
}
