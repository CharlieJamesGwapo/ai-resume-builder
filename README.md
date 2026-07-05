# AI Resume Builder

A modern, AI-powered resume builder web application that helps you create professional resumes with multiple templates and AI-assisted content improvement.

## Features

- **Multiple Templates**: Choose from Modern, Professional, or Simple ATS-friendly designs
- **AI-Powered Content**:
  - Generate professional resume summaries from your job title
  - Improve experience bullet points with AI suggestions using OpenAI
- **Complete Resume Sections**:
  - Contact Information (name, email, phone, location)
  - Experience (with AI improvement feature)
  - Education (school, degree, field, dates)
  - Skills (unlimited skill tags)
  - Projects (with descriptions and URLs)
- **Live Preview**: See your resume update in real-time as you edit
- **Multiple Resumes**: Create and save unlimited resumes locally
- **PDF Export**: Download your resume as a PDF file
- **Dark Mode**: Full dark mode support with system preference detection
- **Client-Side Only**: All data stored locally in browser using localStorage, no backend required
- **ATS-Friendly**: Clean, simple formatting optimized for Applicant Tracking Systems

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type-safe development
- **React 18** - UI library
- **Tailwind CSS** - Styling
- **jsPDF** - PDF generation
- **OpenAI API** - AI features

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key (get one at https://platform.openai.com/api-keys)

### Installation

```bash
# Clone the repository
git clone https://github.com/CharlieJamesGwapo/ai-resume-builder.git
cd ai-resume-builder

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Setting Up AI Features

1. Go to `/settings` page
2. Get your OpenAI API key from https://platform.openai.com/api-keys
3. Paste your API key in the settings
4. Save - your key is stored locally and never sent to any server except OpenAI

## How to Use

1. **Create a Resume**: Start on the home page with a default resume
2. **Fill in Information**: Complete each section with your details
3. **Use AI Assistance**:
   - Add a job title, then use the AI button to generate a professional summary
   - Write experience bullet points and click the AI button to improve them
4. **Preview**: See your resume update live on the right side
5. **Choose Template**: Visit `/templates` to switch between different resume designs
6. **Save**: Click the Save button to persist your resume locally
7. **Manage Resumes**: Visit `/my-resumes` to view, edit, duplicate, or delete saved resumes
8. **Export**: Click "Export PDF" to download your resume as a PDF file

## Pages

- `/` - Main resume builder and editor with live preview
- `/templates` - Template gallery and selector
- `/my-resumes` - View and manage all saved resumes
- `/settings` - Configure OpenAI API key and preferences

## Data Storage

All data is stored locally in your browser using localStorage:

```javascript
// Resume structure
{
  id: string,
  name: string,
  template: 'modern' | 'professional' | 'simple',
  contactInfo: { name, email, phone, location },
  experience: [{ id, company, title, description, startDate, endDate, currentlyWorking }],
  education: [{ id, school, degree, field, startDate, endDate }],
  skills: [{ id, name }],
  projects: [{ id, name, description, url }],
  createdAt: ISO string,
  updatedAt: ISO string
}
```

## AI Features

### Resume Summary Generation

Generates a professional 2-3 sentence summary based on your job title. This appears in your resume's header and helps capture recruiter attention.

### Bullet Point Improvement

Takes your experience descriptions and improves them with:
- Action verbs
- Quantifiable results
- Professional language
- ATS optimization

## Privacy

- **100% Client-Side**: No backend server needed
- **Local Storage**: All resumes and settings stored in your browser
- **API Key Security**: Your OpenAI API key is stored locally and only sent directly to OpenAI's API, never to any other server
- **No Data Tracking**: No analytics, no third-party services

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Building for Production

```bash
npm run build
npm run start
```

## Deployment

This application can be easily deployed to:
- Vercel (recommended) - `vercel deploy`
- Netlify
- Any static hosting service

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT

## Support

Built by Charlie James. For questions or feedback, open an issue on GitHub.
