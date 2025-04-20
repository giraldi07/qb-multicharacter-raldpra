import React from 'react';
import BgImage from '../assets/images/studiobg.png';

interface BackgroundProps {
  children: React.ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${BgImage})`,
          filter: 'brightness(1) contrast(1.2)',
        }}
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90" />
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(234, 179, 8, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(234, 179, 8, 0.3) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Background;