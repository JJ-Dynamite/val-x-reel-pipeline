import React from 'react';
import {useCurrentFrame, spring, interpolate} from 'remotion';
import {theme} from '../styles/theme';

interface GlitchTextProps {
  text: string;
  fontSize?: number;
  color?: string;
  delay?: number;
}

const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  fontSize = 80,
  color = theme.colors.primary,
  delay = 0,
}) => {
  const frame = useCurrentFrame();

  const appear = spring({
    frame: frame - delay,
    fps: theme.fps,
    config: {damping: 10, stiffness: 100, mass: 0.5},
  });

  const glitchActive = frame > delay + 30 && Math.random() > 0.95;
  const glitchX = glitchActive ? (Math.random() - 0.5) * 20 : 0;
  const glitchY = glitchActive ? (Math.random() - 0.5) * 10 : 0;

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-block',
        transform: `scale(${appear}) translate(${glitchX}px, ${glitchY}px)`,
      }}
    >
      <span
        style={{
          fontSize,
          fontFamily: theme.fonts.heading,
          color,
          textShadow: `
            0 0 10px ${color},
            0 0 20px ${color},
            0 0 40px ${color},
            2px 0 0 #FF0000,
            -2px 0 0 #00FF00
          `,
          letterSpacing: '0.05em',
        }}
      >
        {text}
      </span>

      {glitchActive && (
        <>
          <span
            style={{
              position: 'absolute',
              top: 0,
              left: 3,
              fontSize,
              fontFamily: theme.fonts.heading,
              color: '#FF0000',
              opacity: 0.7,
              clipPath: 'inset(0 0 50% 0)',
            }}
          >
            {text}
          </span>
          <span
            style={{
              position: 'absolute',
              top: 0,
              left: -3,
              fontSize,
              fontFamily: theme.fonts.heading,
              color: '#00FF00',
              opacity: 0.7,
              clipPath: 'inset(50% 0 0 0)',
            }}
          >
            {text}
          </span>
        </>
      )}
    </div>
  );
};

export default GlitchText;
