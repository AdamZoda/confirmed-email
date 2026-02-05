
import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import Confetti from './Confetti';
import { GoogleGenAI } from "@google/genai";

const STAGES = [
  "Initializing secure connection...",
  "Validating authentication token...",
  "Synchronizing account data...",
  "Finalizing security protocols..."
];

const ConfirmationPage: React.FC = () => {
  const [showContent, setShowContent] = useState(false);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isFullyConfirmed, setIsFullyConfirmed] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState<string>("");
  const [isLoadingAi, setIsLoadingAi] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100);
    fetchAiMessage();

    // Stage progression logic
    const stageInterval = setInterval(() => {
      setCurrentStageIndex(prev => {
        if (prev < STAGES.length - 1) return prev + 1;
        clearInterval(stageInterval);
        return prev;
      });
    }, 800);

    // Progress bar and final reveal logic
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setIsFullyConfirmed(true), 200);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    return () => {
      clearTimeout(timer);
      clearInterval(stageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const fetchAiMessage = async () => {
    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Generate a premium, extremely professional, 1-sentence welcome message for a high-end platform user who just verified their email. Mention 'V' as the brand.",
        config: {
            temperature: 0.7,
            maxOutputTokens: 60,
        }
      });
      if (response.text) {
        setWelcomeMessage(response.text.trim());
      }
    } catch (error) {
      setWelcomeMessage("Account successfully verified. Welcome to the V ecosystem.");
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white overflow-hidden relative">
      {/* Celebration particles only appear after final confirmation */}
      {isFullyConfirmed && <Confetti />}
      
      <div className={`transition-all duration-1000 ease-out transform ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} flex flex-col items-center max-w-2xl w-full text-center z-10`}>
        
        {/* Premium Logo with Dynamic Glow */}
        <div className="mb-16 relative">
          <div className={`absolute inset-0 bg-orange-400 rounded-full blur-[80px] transition-opacity duration-1000 ${isFullyConfirmed ? 'opacity-20 scale-150' : 'opacity-5 scale-100'}`}></div>
          <Logo size={160} />
        </div>

        {/* Minimalist Loading / Success Container */}
        <div className="min-h-[250px] flex flex-col items-center justify-start w-full">
          <div className={`h-px w-12 bg-orange-200 mb-8 transition-all duration-700 ${isFullyConfirmed ? 'w-24 bg-orange-500' : 'w-12'}`}></div>
          
          <div className="relative h-20 flex items-center justify-center w-full mb-6">
            {!isFullyConfirmed ? (
              <div className="flex flex-col items-center animate-pulse">
                <span className="text-[10px] uppercase tracking-[0.5em] text-gray-400 font-bold mb-2">
                  System Processing
                </span>
                <p className="text-sm text-gray-500 font-light italic">
                  {STAGES[currentStageIndex]}
                </p>
              </div>
            ) : (
              <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter animate-reveal-text">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400">
                  CONFIRMED
                </span>
              </h2>
            )}
          </div>
          
          <div className={`transition-all duration-1000 delay-300 transform ${isFullyConfirmed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="max-w-md mx-auto">
              {isLoadingAi ? (
                <div className="h-4 w-64 bg-gray-50 animate-pulse rounded-full mx-auto"></div>
              ) : (
                <p className="text-lg text-gray-400 font-light leading-relaxed">
                  {welcomeMessage}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Redirection Info */}
        <div className="mt-20 w-full max-w-xs space-y-4">
          <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-400 font-semibold px-1">
            <span>{isFullyConfirmed ? 'Verified' : 'Validating'}</span>
            <span>{progress}%</span>
          </div>
          <div className="h-[2px] w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-100 ease-linear ${isFullyConfirmed ? 'bg-green-500' : 'bg-orange-500'}`} 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-gray-300 font-medium">
            {isFullyConfirmed 
              ? "Redirection to your workspace in progress..." 
              : "Please do not close this window while we verify your credentials."}
          </p>
        </div>
      </div>

      {/* Background Brand Elements */}
      <div className="absolute top-12 left-12 opacity-5 pointer-events-none transition-transform duration-[10s] linear animate-slow-spin">
        <span className="text-[15rem] font-black text-gray-200 select-none">V</span>
      </div>
      
      <style>{`
        @keyframes reveal-text {
          0% { transform: scale(0.9); opacity: 0; filter: blur(10px); }
          100% { transform: scale(1); opacity: 1; filter: blur(0); }
        }
        .animate-reveal-text {
          animation: reveal-text 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes slow-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-slow-spin {
          animation: slow-spin 60s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ConfirmationPage;
