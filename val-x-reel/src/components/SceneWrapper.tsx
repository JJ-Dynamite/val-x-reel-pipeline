import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {theme} from '../styles/theme';

interface SceneWrapperProps {
  children: React.ReactNode;
  fadeOut?: boolean;
  fadeIn?: boolean;
  durationInFrames: number;
}

const SceneWrapper: React.FC<SceneWrapperProps> = ({
  children,
  fadeOut = true,
  fadeIn = true,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();

  const fadeInOpacity = fadeIn
    ? interpolate(frame, [0, 15], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 1;

  const fadeOutOpacity = fadeOut
    ? interpolate(
        frame,
        [durationInFrames - 30, durationInFrames],
        [1, 0],
        {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
      )
    : 1;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `radial-gradient(ellipse at center, ${theme.colors.darkGray}, ${theme.colors.secondary})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadeInOpacity * fadeOutOpacity,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
};

export default SceneWrapper;
