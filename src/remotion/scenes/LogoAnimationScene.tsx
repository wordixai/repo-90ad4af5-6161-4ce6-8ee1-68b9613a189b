import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Img,
} from 'remotion';
import { GeometricShapes } from '../components/GeometricShapes';

interface LogoAnimationSceneProps {
  logoUrl: string;
  brandColor: string;
}

export const LogoAnimationScene: React.FC<LogoAnimationSceneProps> = ({
  logoUrl,
  brandColor,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const logoSpring = spring({
    frame,
    fps,
    config: {
      damping: 200,
      stiffness: 100,
    },
  });

  const rotateSpring = spring({
    frame: frame - 30,
    fps,
    config: {
      damping: 300,
      stiffness: 200,
    },
  });

  const scale = interpolate(logoSpring, [0, 1], [0.5, 1]);
  const rotation = interpolate(rotateSpring, [0, 1], [0, 360]);

  const pulseScale = interpolate(
    Math.sin((frame / fps) * Math.PI * 2),
    [-1, 1],
    [0.95, 1.05]
  );

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0f23' }}>
      <GeometricShapes brandColor={brandColor} />
      
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${scale * pulseScale}) rotate(${rotation}deg)`,
        }}
      >
        <div
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: `linear-gradient(45deg, ${brandColor}, #60a5fa)`,
            padding: '4px',
            boxShadow: `0 0 40px ${brandColor}40`,
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              overflow: 'hidden',
              backgroundColor: '#1e1e2e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Img
              src={logoUrl}
              style={{
                width: '80%',
                height: '80%',
                objectFit: 'contain',
              }}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};