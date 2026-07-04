import React from 'react';
import {useCurrentFrame, interpolate, Easing} from 'remotion';
import {theme} from '../styles/theme';

interface MatrixRainProps {
  columns?: number;
  speed?: number;
  color?: string;
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`';

const MatrixRain: React.FC<MatrixRainProps> = ({
  columns = 30,
  speed = 1,
  color = theme.colors.primary,
}) => {
  const frame = useCurrentFrame();

  const getChar = (col: number, row: number, f: number) => {
    const seed = col * 1000 + row * 100 + Math.floor(f * speed);
    return chars[seed % chars.length];
  };

  const getOpacity = (col: number, f: number) => {
    const base = Math.sin(f * 0.05 + col * 0.5) * 0.3 + 0.7;
    return Math.max(0.2, Math.min(1, base));
  };

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
      {Array.from({length: columns}).map((_, col) => {
        const x = (col / columns) * 100;
        const opacity = getOpacity(col, frame);

        return (
          <div
            key={col}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: 0,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              opacity,
            }}
          >
            {Array.from({length: 40}).map((_, row) => {
              const yOffset = (frame * speed * 2 + row * 30 + col * 20) % 2000 - 100;
              const charOpacity = interpolate(
                yOffset,
                [0, 200, 1800, 2000],
                [0, 1, 1, 0],
                {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
              );

              return (
                <span
                  key={row}
                  style={{
                    position: 'absolute',
                    top: yOffset,
                    color,
                    fontSize: 14,
                    fontFamily: theme.fonts.mono,
                    opacity: charOpacity,
                    textShadow: `0 0 10px ${color}`,
                  }}
                >
                  {getChar(col, row, frame)}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default MatrixRain;
