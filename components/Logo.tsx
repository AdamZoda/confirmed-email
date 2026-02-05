
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 120 }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      {/* Premium Professional Logo Design */}
      <svg 
        viewBox="0 0 200 200" 
        className="w-full h-full drop-shadow-2xl animate-float"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F3F4F6" />
          </linearGradient>
          <linearGradient id="vGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF8A00" />
            <stop offset="100%" stopColor="#E65100" />
          </linearGradient>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
            <feOffset dx="0" dy="4" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.1" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* The Squircle (Professional Shape) */}
        <path 
          d="M100 20C20 20 20 20 20 100C20 180 20 180 100 180C180 180 180 180 180 100C180 20 180 20 100 20Z" 
          fill="url(#bgGradient)"
          stroke="#E5E7EB"
          strokeWidth="1"
        />
        
        {/* Modern Sharp 'V' */}
        <path 
          d="M65 75L92 135H108L135 75H122L100 122L78 75H65Z" 
          fill="url(#vGradient)"
          filter="url(#softShadow)"
        />
      </svg>
    </div>
  );
};

export default Logo;
