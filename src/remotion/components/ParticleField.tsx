import React from 'react';
import { interpolate, useCurrentFrame, random } from 'remotion';

interface ParticleFieldProps {
  count: number;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({ count }) => {
  const frame = useCurrentFrame();
  
  const particles = Array.from({ length: count }, (_, i) => {
    const x = random(`x-${i}`) * 100;
    const y = random(`y-${i}`) * 100;
    const size = random(`size-${i}`) * 4 + 1;
    const speed = random(`speed-${i}`) * 0.5 + 0.1;
    
    const animatedY = y + Math.sin((frame * speed + i) * 0.1) * 10;
    const opacity = interpolate(
      Math.sin((frame * speed + i) * 0.05),
      [-1, 1],
      [0.3, 1]
    );
    
    return {
      x,
      y: animatedY,
      size,
      opacity,
    };
  });
  
  return (
    <>
      {particles.map((particle, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #8B5CF6, #60a5fa)',
            opacity: particle.opacity,
            boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)',
          }}
        />
      ))}
    </>
  );
};