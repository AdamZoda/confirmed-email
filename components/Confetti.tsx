
import React, { useEffect, useState } from 'react';

const Confetti: React.FC = () => {
  const [pieces, setPieces] = useState<Array<{ id: number, left: number, delay: number, size: number, opacity: number }>>([]);

  useEffect(() => {
    const newPieces = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.3 + 0.1,
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute rounded-full bg-orange-400"
          style={{
            left: `${piece.left}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            opacity: piece.opacity,
            top: '-20px',
            animation: `float-particle 8s linear ${piece.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes float-particle {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          20% {
            opacity: var(--opacity, 0.2);
          }
          80% {
            opacity: var(--opacity, 0.2);
          }
          100% {
            transform: translateY(110vh) translateX(20px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Confetti;
