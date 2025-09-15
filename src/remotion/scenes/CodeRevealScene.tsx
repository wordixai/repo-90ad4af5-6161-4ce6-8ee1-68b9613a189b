import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from 'remotion';
import { TypewriterText } from '../components/TypewriterText';
import { SyntaxHighlighter } from '../components/SyntaxHighlighter';

interface CodeRevealSceneProps {
  codeSnippets: Array<{
    language: string;
    code: string;
    title: string;
  }>;
  brandColor: string;
}

export const CodeRevealScene: React.FC<CodeRevealSceneProps> = ({
  codeSnippets,
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

  const titleOpacity = interpolate(
    frame,
    [0, 30],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const codeSnippet = codeSnippets[0]; // Use first snippet for demo

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0f0f23',
        padding: '2rem',
      }}
    >
      <div
        style={{
          transform: `translateY(${interpolate(containerSpring, [0, 1], [50, 0])}px)`,
          opacity: containerSpring,
        }}
      >
        <div
          style={{
            marginBottom: '2rem',
            opacity: titleOpacity,
          }}
        >
          <h3
            style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: brandColor,
              marginBottom: '0.5rem',
              fontFamily: '"JetBrains Mono", monospace',
            }}
          >
            {codeSnippet.title}
          </h3>
          <div
            style={{
              width: '4rem',
              height: '2px',
              background: `linear-gradient(90deg, ${brandColor}, transparent)`,
            }}
          />
        </div>

        <div
          style={{
            backgroundColor: '#1e1e2e',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            border: `1px solid ${brandColor}30`,
            boxShadow: `0 0 20px ${brandColor}20`,
          }}
        >
          <SyntaxHighlighter
            code={codeSnippet.code}
            language={codeSnippet.language}
            startFrame={60}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};