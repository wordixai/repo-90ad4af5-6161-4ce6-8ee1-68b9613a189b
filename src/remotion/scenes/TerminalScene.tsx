import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from 'remotion';
import { TypewriterText } from '../components/TypewriterText';

interface TerminalSceneProps {
  commands: string[];
  brandColor: string;
}

export const TerminalScene: React.FC<TerminalSceneProps> = ({
  commands,
  brandColor,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const containerSpring = spring({
    frame,
    fps,
    config: {
      damping: 200,
      stiffness: 100,
    },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0f23', padding: '2rem' }}>
      <div
        style={{
          transform: `translateY(${interpolate(containerSpring, [0, 1], [50, 0])}px)`,
          opacity: containerSpring,
          maxWidth: '800px',
          margin: '0 auto',
          marginTop: '10%',
        }}
      >
        <div
          style={{
            backgroundColor: '#000000',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            border: `1px solid ${brandColor}30`,
            boxShadow: `0 0 20px ${brandColor}20`,
            fontFamily: '"JetBrains Mono", monospace',
          }}
        >
          {/* Terminal Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1rem',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid #333',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                marginRight: '1rem',
              }}
            >
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#ff5f56',
                }}
              />
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#ffbd2e',
                }}
              />
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#27ca3f',
                }}
              />
            </div>
            <span style={{ color: '#666', fontSize: '0.875rem' }}>
              Terminal
            </span>
          </div>

          {/* Terminal Content */}
          {commands.map((command, index) => (
            <div key={index} style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: brandColor, marginRight: '0.5rem' }}>
                  $
                </span>
                <TypewriterText
                  text={command}
                  startFrame={60 + index * 45}
                  style={{
                    color: '#ffffff',
                    fontSize: '1rem',
                  }}
                />
              </div>
              
              {index < commands.length - 1 && (
                <div
                  style={{
                    color: '#10b981',
                    fontSize: '0.875rem',
                    marginTop: '0.5rem',
                    opacity: interpolate(
                      frame,
                      [60 + index * 45 + 30, 60 + index * 45 + 45],
                      [0, 1],
                      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                    ),
                  }}
                >
                  ✓ Command executed successfully
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};