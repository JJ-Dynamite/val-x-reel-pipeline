import React from 'react';
import {useCurrentFrame, spring} from 'remotion';
import {theme} from '../styles/theme';

interface GlowCardProps {
  children: React.ReactNode;
  delay?: number;
  color?: string;
  width?: number | string;
}

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  delay = 0,
  color = theme.colors.primary,
  width = 'auto',
}) => {
  const frame = useCurrentFrame();

  const appear = spring({
    frame: frame - delay,
    fps: theme.fps,
    config: {damping: 10, stiffness: 100, mass: 0.5},
  });

  const glowPulse = Math.sin(frame * 0.1) * 0.3 + 0.7;

  return (
    <div
      style={{
        width,
        padding: 30,
        background: `linear-gradient(135deg, ${theme.colors.darkGray}, ${theme.colors.secondary})`,
        border: `2px solid ${color}44`,
        borderRadius: 20,
        transform: `scale(${appear}) translateY(${(1 - appear) * 30}px)`,
        opacity: appear,
        boxShadow: `
          0 0 ${30 * glowPulse}px ${color}33,
          inset 0 0 ${20 * glowPulse}px ${color}11
        `,
      }}
    >
      {children}
    </div>
  );
};

export default GlowCard;
