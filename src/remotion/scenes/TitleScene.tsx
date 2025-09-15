import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from 'remotion';
import { ParticleField } from '../components/ParticleField';

interface TitleSceneProps {
  title: string;
  subtitle: string;
  brandColor: string;
}

export const TitleScene: React.FC<TitleSceneProps> = ({
  title,
  subtitle,
  brandColor,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: {
      damping: 200,
      stiffness: 100,
      mass: 0.5,
    },
  });

  const subtitleSpring = spring({
    frame: frame - 30,
    fps,
    config: {
      damping: 200,
      stiffness: 100,
      mass: 0.5,
    },
  });

  const glowIntensity = interpolate(
    frame,
    [0, 60, 120],
    [0, 1, 0.8],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  return (
    <AbsoluteFill>
      <ParticleField count={50} />
      
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${titleSpring})`,
          textAlign: 'center',
          color: '#ffffff',
        }}
      >
        <h1
          style={{
            fontSize: '4rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            background: `linear-gradient(45deg, ${brandColor}, #60a5fa)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: `0 0 ${20 * glowIntensity}px ${brandColor}`,
            fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
          }}
        >
          {title}
        </h1>
        
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: '300',
            opacity: subtitleSpring,
            color: '#94a3b8',
            fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
          }}
        >
          {subtitle}
        </h2>
      </div>
    </AbsoluteFill>
  );
};