import React from 'react';
import { interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';

interface AnimatedChartProps {
  label: string;
  value: number;
  color: string;
  startFrame: number;
}

export const AnimatedChart: React.FC<AnimatedChartProps> = ({
  label,
  value,
  color,
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: {
      damping: 200,
      stiffness: 100,
    },
  });
  
  const animatedValue = interpolate(progress, [0, 1], [0, value]);
  const barHeight = (animatedValue / 100) * 200;
  
  const containerOpacity = interpolate(
    frame,
    [startFrame - 10, startFrame + 10],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  
  return (
    <div
      style={{
        opacity: containerOpacity,
        transform: `translateY(${interpolate(progress, [0, 1], [30, 0])}px)`,
        padding: '1.5rem',
        backgroundColor: '#1e1e2e',
        borderRadius: '0.75rem',
        border: `1px solid ${color}30`,
        boxShadow: `0 0 20px ${color}20`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'center',
          height: '200px',
          marginBottom: '1rem',
        }}
      >
        <div
          style={{
            width: '60px',
            height: `${barHeight}px`,
            background: `linear-gradient(to top, ${color}, ${color}80)`,
            borderRadius: '4px 4px 0 0',
            boxShadow: `0 0 20px ${color}40`,
            transition: 'height 0.3s ease',
          }}
        />
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: color,
            marginBottom: '0.5rem',
            fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
          }}
        >
          {Math.round(animatedValue)}%
        </div>
        
        <div
          style={{
            fontSize: '1rem',
            color: '#94a3b8',
            fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
};