import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface TypewriterTextProps {
  text: string;
  startFrame: number;
  speed?: number;
  style?: React.CSSProperties;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  startFrame,
  speed = 2,
  style = {},
}) => {
  const frame = useCurrentFrame();
  
  const progress = Math.max(0, frame - startFrame);
  const charactersToShow = Math.floor(progress / speed);
  const displayText = text.slice(0, charactersToShow);
  
  const showCursor = charactersToShow < text.length;
  
  return (
    <span style={{ fontFamily: '"JetBrains Mono", monospace', ...style }}>
      {displayText}
      {showCursor && (
        <span
          style={{
            opacity: interpolate(
              frame % 30,
              [0, 15, 30],
              [1, 1, 0]
            ),
          }}
        >
          |
        </span>
      )}
    </span>
  );
};