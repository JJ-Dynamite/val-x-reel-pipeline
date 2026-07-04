import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {theme} from '../styles/theme';

interface ParticleSystemProps {
  count?: number;
  color?: string;
  speed?: number;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({
  count = 50,
  color = theme.colors.primary,
  speed = 1,
}) => {
  const frame = useCurrentFrame();

  const particles = Array.from({length: count}).map((_, i) => {
    const seed = i * 137.508;
    const x = (seed * 7.3) % 100;
    const y = (seed * 13.7) % 100;
    const size = 2 + (i % 4);
    const phase = seed % (Math.PI * 2);

    const currentY = (y + frame * speed * 0.5 * (0.5 + (i % 3) * 0.3)) % 120 - 10;
    const currentX = x + Math.sin(frame * 0.02 + phase) * 5;

    const opacity = interpolate(
      currentY,
      [-10, 10, 90, 110],
      [0, 0.6, 0.6, 0],
      {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
    );

    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: `${currentX}%`,
          top: `${currentY}%`,
          width: size,
          height: size,
          borderRadius: '50%',
          background: color,
          opacity,
          boxShadow: `0 0 ${size * 2}px ${color}`,
        }}
      />
    );
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {particles}
    </div>
  );
};

export default ParticleSystem;
