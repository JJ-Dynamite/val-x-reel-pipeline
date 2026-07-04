import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {theme} from '../styles/theme';

interface TypingEffectProps {
  text: string;
  fontSize?: number;
  color?: string;
  delay?: number;
  speed?: number;
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  text,
  fontSize = 48,
  color = theme.colors.primary,
  delay = 0,
  speed = 2,
}) => {
  const frame = useCurrentFrame();

  const adjustedFrame = Math.max(0, frame - delay);
  const charsToShow = Math.min(
    text.length,
    Math.floor(adjustedFrame / speed)
  );

  const displayText = text.slice(0, charsToShow);
  const showCursor = adjustedFrame > 0 && charsToShow < text.length;
  const cursorOpacity = Math.sin(frame * 0.2) > 0 ? 1 : 0;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
      }}
    >
      <span
        style={{
          fontSize,
          fontFamily: theme.fonts.mono,
          color,
          textShadow: `0 0 10px ${color}`,
          letterSpacing: '0.02em',
        }}
      >
        {displayText}
      </span>
      {showCursor && (
        <span
          style={{
            fontSize,
            fontFamily: theme.fonts.mono,
            color,
            opacity: cursorOpacity,
            marginLeft: 2,
          }}
        >
          _
        </span>
      )}
    </div>
  );
};

export default TypingEffect;
