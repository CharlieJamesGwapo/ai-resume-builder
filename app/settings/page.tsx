'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { storage } from '@/lib/storage';

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setApiKey(storage.getApiKey());
  }, []);

  const handleSave = () => {
    storage.setApiKey(apiKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Settings</h1>

          <div className="space-y-8">
            {/* API Key */}
            <div className="border border-slate-300 dark:border-slate-600 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">OpenAI API Key</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Your API key is used to generate resume summaries and improve
                bullet points. It is stored locally in your browser and never
                sent to any server.
              </p>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type={showKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => setShowKey(!showKey)}
                    className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition font-medium"
                  >
                    {showKey ? '🙈' : '👁️'}
                  </button>
                </div>

                <div>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
                  >
                    {saved ? '✓ Saved!' : 'Save API Key'}
                  </button>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-500">
                  Get your API key from{' '}
                  <a
                    href="https://platform.openai.com/api-keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    OpenAI Platform
                  </a>
                </p>
              </div>
            </div>

            {/* Info */}
            <div className="border border-slate-300 dark:border-slate-600 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">About</h2>
              <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <p>
                  AI Resume Builder is a free, client-side application for
                  creating professional resumes.
                </p>
                <p>
                  All your data is stored locally in your browser and never
                  sent to any server (except when using the OpenAI API for AI
                  features).
                </p>
                <p>
                  Built by Charlie James with Next.js, React, and Tailwind CSS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
