import React from 'react';
import {useCurrentFrame, spring, interpolate} from 'remotion';
import {theme} from '../styles/theme';
import MatrixRain from '../components/MatrixRain';
import ValXLogo from '../components/ValXLogo';
import GlitchText from '../components/GlitchText';
import SceneWrapper from '../components/SceneWrapper';

const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const durationInFrames = theme.scenes[0].frames;

  const textAppear = spring({
    frame: frame - 90,
    fps: theme.fps,
    config: {damping: 10, stiffness: 80},
  });

  return (
    <SceneWrapper durationInFrames={durationInFrames}>
      <MatrixRain columns={40} speed={1.5} />

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        <ValXLogo size={300} delay={30} showText={true} />

        <div
          style={{
            marginTop: 60,
            opacity: textAppear,
            transform: `translateY(${(1 - textAppear) * 30}px)`,
          }}
        >
          <GlitchText
            text="FROM KERALA"
            fontSize={36}
            delay={120}
          />
        </div>

        <div
          style={{
            marginTop: 20,
            opacity: interpolate(
              frame,
              [150, 180],
              [0, 1],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
            ),
          }}
        >
          <GlitchText
            text="TO THE WORLD"
            fontSize={36}
            delay={150}
          />
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 100,
          left: 0,
          width: '100%',
          textAlign: 'center',
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontFamily: theme.fonts.mono,
            color: theme.colors.gray,
            opacity: interpolate(
              frame,
              [180, 210],
              [0, 0.7],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
            ),
          }}
        >
          A TECHNOLOGY PARTNER
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `radial-gradient(ellipse at center, transparent 30%, ${theme.colors.secondary}CC 100%)`,
          pointerEvents: 'none',
        }}
      />
    </SceneWrapper>
  );
};

export default HookScene;
