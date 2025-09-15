import React from 'react';
import { interpolate, useCurrentFrame, random } from 'remotion';

interface GeometricShapesProps {
  brandColor: string;
}

export const GeometricShapes: React.FC<GeometricShapesProps> = ({ brandColor }) => {
  const frame = useCurrentFrame();
  
  const shapes = Array.from({ length: 8 }, (_, i) => {
    const x = random(`shape-x-${i}`) * 100;
    const y = random(`shape-y-${i}`) * 100;
    const size = random(`shape-size-${i}`) * 60 + 20;
    const rotationSpeed = random(`shape-rotation-${i}`) * 2 + 0.5;
    
    const rotation = frame * rotationSpeed;
    const scale = interpolate(
      Math.sin((frame + i * 30) * 0.02),
      [-1, 1],
      [0.8, 1.2]
    );
    
    const opacity = interpolate(
      Math.sin((frame + i * 45) * 0.03),
      [-1, 1],
      [0.1, 0.3]
    );
    
    const shapeType = i % 3;
    
    return {
      x,
      y,
      size,
      rotation,
      scale,
      opacity,
      shapeType,
    };
  });
  
  return (
    <>
      {shapes.map((shape, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            transform: `translate(-50%, -50%) rotate(${shape.rotation}deg) scale(${shape.scale})`,
            opacity: shape.opacity,
            background: shape.shapeType === 0 
              ? `linear-gradient(45deg, ${brandColor}, transparent)`
              : shape.shapeType === 1
              ? `conic-gradient(${brandColor}, transparent, ${brandColor})`
              : `radial-gradient(circle, ${brandColor}, transparent)`,
            borderRadius: shape.shapeType === 0 ? '0' : shape.shapeType === 1 ? '10px' : '50%',
            clipPath: shape.shapeType === 0 
              ? 'polygon(50% 0%, 0% 100%, 100% 100%)'
              : 'none',
          }}
        />
      ))}
    </>
  );
};