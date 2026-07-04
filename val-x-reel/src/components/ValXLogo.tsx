import React from 'react';
import {useCurrentFrame, spring, interpolate} from 'remotion';
import {theme} from '../styles/theme';

interface ValXLogoProps {
  size?: number;
  delay?: number;
  showText?: boolean;
}

const ValXLogo: React.FC<ValXLogoProps> = ({
  size = 200,
  delay = 0,
  showText = true,
}) => {
  const frame = useCurrentFrame();

  const appear = spring({
    frame: frame - delay,
    fps: theme.fps,
    config: {damping: 8, stiffness: 80, mass: 0.6},
  });

  const glowPulse = Math.sin(frame * 0.08) * 0.4 + 0.6;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transform: `scale(${appear})`,
        opacity: appear,
      }}
    >
      <svg
        width={size}
        height={size * 0.6}
        viewBox="0 0 200 120"
        style={{
          filter: `drop-shadow(0 0 ${30 * glowPulse}px ${theme.colors.primary})`,
        }}
      >
        <defs>
          <linearGradient id="valxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={theme.colors.primary} />
            <stop offset="50%" stopColor={theme.colors.valxBlue} />
            <stop offset="100%" stopColor={theme.colors.primary} />
          </linearGradient>
        </defs>

        <text
          x="100"
          y="80"
          textAnchor="middle"
          fontFamily={theme.fonts.heading}
          fontSize="72"
          fill="url(#valxGrad)"
          style={{
            textShadow: `0 0 20px ${theme.colors.primary}`,
          }}
        >
          VAL-X
        </text>
      </svg>

      {showText && (
        <div
          style={{
            marginTop: 20,
            fontSize: 24,
            fontFamily: theme.fonts.body,
            color: theme.colors.gray,
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            opacity: interpolate(
              frame - delay,
              [30, 60],
              [0, 1],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
            ),
          }}
        >
          International Technologies
        </div>
      )}
    </div>
  );
};

export default ValXLogo;
