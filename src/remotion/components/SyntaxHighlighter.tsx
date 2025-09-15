import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface SyntaxHighlighterProps {
  code: string;
  language: string;
  startFrame: number;
}

export const SyntaxHighlighter: React.FC<SyntaxHighlighterProps> = ({
  code,
  language,
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const progress = Math.max(0, frame - startFrame);
  
  const lines = code.split('\n');
  const totalLines = lines.length;
  
  const linesToShow = Math.floor(interpolate(
    progress,
    [0, 120],
    [0, totalLines],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  ));

  const highlightKeywords = (text: string) => {
    const keywords = ['import', 'export', 'const', 'let', 'var', 'function', 'interface', 'type', 'useState', 'useEffect', 'return'];
    const types = ['string', 'number', 'boolean', 'User', 'React'];
    
    let highlighted = text;
    
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      highlighted = highlighted.replace(regex, `<span style="color: #c792ea">${keyword}</span>`);
    });
    
    types.forEach(type => {
      const regex = new RegExp(`\\b${type}\\b`, 'g');
      highlighted = highlighted.replace(regex, `<span style="color: #82aaff">${type}</span>`);
    });
    
    // Strings
    highlighted = highlighted.replace(
      /(["'])((?:(?!\1)[^\\]|\\.)*)(\1)/g,
      '<span style="color: #c3e88d">$1$2$3</span>'
    );
    
    // Comments
    highlighted = highlighted.replace(
      /\/\/.*/g,
      '<span style="color: #676e95">$&</span>'
    );
    
    return highlighted;
  };

  return (
    <div
      style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '0.875rem',
        lineHeight: '1.5',
        color: '#ffffff',
      }}
    >
      {lines.slice(0, linesToShow).map((line, index) => (
        <div
          key={index}
          style={{
            opacity: interpolate(
              frame,
              [startFrame + index * 3, startFrame + index * 3 + 10],
              [0, 1],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            ),
            transform: `translateX(${interpolate(
              frame,
              [startFrame + index * 3, startFrame + index * 3 + 10],
              [-20, 0],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            )}px)`,
            marginBottom: '0.25rem',
          }}
        >
          <span style={{ color: '#676e95', marginRight: '1rem', userSelect: 'none' }}>
            {(index + 1).toString().padStart(2, '0')}
          </span>
          <span dangerouslySetInnerHTML={{ __html: highlightKeywords(line || ' ') }} />
        </div>
      ))}
    </div>
  );
};