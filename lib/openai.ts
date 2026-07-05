import { storage } from './storage';

export async function generateResumeSummary(
  jobTitle: string
): Promise<string> {
  const apiKey = storage.getApiKey();

  if (!apiKey) {
    throw new Error('API key not set. Please configure it in settings.');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Write a professional 2-3 sentence resume summary for someone with the job title: ${jobTitle}.
          Make it specific and impactful, highlighting key responsibilities and skills.
          Do not include the job title in the summary.`,
        },
      ],
      max_tokens: 150,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.error?.message || 'Failed to generate summary'
    );
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

export async function improveExperienceBullets(
  bullets: string[],
  jobTitle: string,
  company: string
): Promise<string[]> {
  const apiKey = storage.getApiKey();

  if (!apiKey) {
    throw new Error('API key not set. Please configure it in settings.');
  }

  const bulletsText = bullets.map((b, i) => `${i + 1}. ${b}`).join('\n');

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Improve these resume bullet points for a ${jobTitle} role at ${company}.
          Make them more impactful with action verbs and quantifiable results where possible.
          Keep the same number of bullets. Return only the improved bullets, numbered:

          ${bulletsText}`,
        },
      ],
      max_tokens: 300,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.error?.message || 'Failed to improve bullets'
    );
  }

  const data = await response.json();
  const improvedText = data.choices[0].message.content.trim();

  // Parse numbered list from response
  const lines = improvedText.split('\n').filter((line: string) => line.trim());
  const parsed = lines
    .map((line: string) => line.replace(/^\d+\.\s*/, '').trim())
    .filter((line: string) => line.length > 0);

  return parsed;
}
