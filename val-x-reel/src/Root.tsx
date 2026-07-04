import React from 'react';
import {Composition} from 'remotion';
import ValXReel from './ValXReel';
import {theme} from './styles/theme';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ValXReel"
        component={ValXReel}
        durationInFrames={theme.totalFrames}
        fps={theme.fps}
        width={theme.width}
        height={theme.height}
      />
    </>
  );
};
