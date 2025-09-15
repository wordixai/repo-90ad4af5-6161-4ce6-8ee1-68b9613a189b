import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from 'remotion';
import { AnimatedChart } from '../components/AnimatedChart';

interface DataVisualizationSceneProps {
  dataPoints: Array<{
    label: string;
    value: number;
    color: string;
  }>;
  brandColor: string;
}

export const DataVisualizationScene: React.FC<DataVisualizationSceneProps> = ({
  dataPoints,
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

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0f23', padding: '2rem' }}>
      <div
        style={{
          transform: `translateY(${interpolate(containerSpring, [0, 1], [50, 0])}px)`,
          opacity: containerSpring,
          maxWidth: '1200px',
          margin: '0 auto',
          marginTop: '5%',
        }}
      >
        <div
          style={{
            marginBottom: '3rem',
            opacity: titleOpacity,
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: brandColor,
              marginBottom: '1rem',
              fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            Performance Metrics
          </h3>
          <div
            style={{
              width: '6rem',
              height: '2px',
              background: `linear-gradient(90deg, ${brandColor}, transparent)`,
              margin: '0 auto',
            }}
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
          }}
        >
          {dataPoints.map((dataPoint, index) => (
            <AnimatedChart
              key={dataPoint.label}
              label={dataPoint.label}
              value={dataPoint.value}
              color={dataPoint.color}
              startFrame={60 + index * 20}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};