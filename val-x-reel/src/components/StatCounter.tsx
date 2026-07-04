import React from 'react';
import {useCurrentFrame, spring, interpolate} from 'remotion';
import {theme} from '../styles/theme';

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
  color?: string;
}

const StatCounter: React.FC<StatCounterProps> = ({
  value,
  suffix = '',
  label,
  delay = 0,
  color = theme.colors.primary,
}) => {
  const frame = useCurrentFrame();

  const appear = spring({
    frame: frame - delay,
    fps: theme.fps,
    config: {damping: 12, stiffness: 100, mass: 0.5},
  });

  const countProgress = interpolate(
    frame - delay,
    [0, 60],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );

  const displayValue = Math.floor(value * countProgress);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transform: `scale(${appear}) translateY(${(1 - appear) * 50}px)`,
        opacity: appear,
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontFamily: theme.fonts.heading,
          color,
          textShadow: `0 0 20px ${color}`,
          lineHeight: 1,
        }}
      >
        {displayValue}{suffix}
      </div>
      <div
        style={{
          fontSize: 20,
          fontFamily: theme.fonts.body,
          color: theme.colors.gray,
          marginTop: 8,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        {label}
      </div>
    </div>
  );
};

export default StatCounter;
