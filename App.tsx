
import React, { useState, useEffect } from 'react';
import ConfirmationPage from './components/ConfirmationPage';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Simulate a slight delay to mimic the "verifying" phase if needed, 
  // but for this request, we show the confirmation immediately.
  useEffect(() => {
    const timer = setTimeout(() => setIsConfirmed(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col">
      {isConfirmed ? (
        <ConfirmationPage />
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium animate-pulse">Finalizing your confirmation...</p>
        </div>
      )}
    </div>
  );
};

export default App;
