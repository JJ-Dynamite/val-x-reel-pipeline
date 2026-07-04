import React from 'react';
import {useCurrentFrame, spring} from 'remotion';
import {theme} from '../styles/theme';

interface TechBadgeProps {
  name: string;
  color?: string;
  delay?: number;
  icon?: string;
}

const TechBadge: React.FC<TechBadgeProps> = ({
  name,
  color = theme.colors.primary,
  delay = 0,
  icon,
}) => {
  const frame = useCurrentFrame();

  const appear = spring({
    frame: frame - delay,
    fps: theme.fps,
    config: {damping: 10, stiffness: 120, mass: 0.4},
  });

  const glowPulse = Math.sin(frame * 0.1) * 0.3 + 0.7;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '12px 24px',
        background: `linear-gradient(135deg, ${color}22, ${color}11)`,
        border: `2px solid ${color}`,
        borderRadius: 12,
        transform: `scale(${appear})`,
        opacity: appear,
        boxShadow: `0 0 ${20 * glowPulse}px ${color}66`,
      }}
    >
      {icon && (
        <span style={{fontSize: 24}}>{icon}</span>
      )}
      <span
        style={{
          fontSize: 20,
          fontFamily: theme.fonts.heading,
          color: theme.colors.white,
          letterSpacing: '0.05em',
        }}
      >
        {name}
      </span>
    </div>
  );
};

export default TechBadge;
