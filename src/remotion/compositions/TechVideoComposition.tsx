import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { CodeRevealScene } from '../scenes/CodeRevealScene';
import { LogoAnimationScene } from '../scenes/LogoAnimationScene';
import { TerminalScene } from '../scenes/TerminalScene';
import { DataVisualizationScene } from '../scenes/DataVisualizationScene';
import { TitleScene } from '../scenes/TitleScene';

export interface TechVideoProps {
  title: string;
  subtitle: string;
  logoUrl: string;
  brandColor: string;
  codeSnippets: Array<{
    language: string;
    code: string;
    title: string;
  }>;
  terminalCommands: string[];
  dataPoints: Array<{
    label: string;
    value: number;
    color: string;
  }>;
}

export const TechVideoComposition: React.FC<TechVideoProps> = ({
  title,
  subtitle,
  logoUrl,
  brandColor,
  codeSnippets,
  terminalCommands,
  dataPoints,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0f23' }}>
      {/* Title Scene */}
      <Sequence from={0} durationInFrames={180}>
        <TitleScene
          title={title}
          subtitle={subtitle}
          brandColor={brandColor}
        />
      </Sequence>

      {/* Logo Animation */}
      <Sequence from={120} durationInFrames={180}>
        <LogoAnimationScene
          logoUrl={logoUrl}
          brandColor={brandColor}
        />
      </Sequence>

      {/* Code Reveal */}
      <Sequence from={240} durationInFrames={300}>
        <CodeRevealScene
          codeSnippets={codeSnippets}
          brandColor={brandColor}
        />
      </Sequence>

      {/* Terminal Scene */}
      <Sequence from={480} durationInFrames={240}>
        <TerminalScene
          commands={terminalCommands}
          brandColor={brandColor}
        />
      </Sequence>

      {/* Data Visualization */}
      <Sequence from={660} durationInFrames={240}>
        <DataVisualizationScene
          dataPoints={dataPoints}
          brandColor={brandColor}
        />
      </Sequence>
    </AbsoluteFill>
  );
};