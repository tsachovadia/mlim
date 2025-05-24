import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-primary-blue mb-4">
          ברוך הבא לפלטפורמת התאמת התוכניות האקדמיות
        </h1>
        <h2 className="text-xl text-neutral-600 mb-6">
          Welcome to Academic Program Matching Platform
        </h2>
        <div className="space-y-4">
          <div className="bg-success-green-50 border border-success-green text-success-green px-4 py-2 rounded">
            ✅ React + TypeScript Setup Complete
          </div>
          <div className="bg-info-blue-50 border border-info-blue text-info-blue px-4 py-2 rounded">
            🎨 Tailwind CSS Configured
          </div>
          <div className="bg-warning-amber-50 border border-warning-amber text-warning-amber px-4 py-2 rounded">
            🚀 Ready for Implementation
          </div>
        </div>
        <p className="text-sm text-neutral-500 mt-6">
          Academic Program Matching Platform for Israeli Universities
        </p>
      </div>
    </div>
  );
}

export default App;
