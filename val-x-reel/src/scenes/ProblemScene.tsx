import React from 'react';
import {useCurrentFrame, spring, interpolate} from 'remotion';
import {theme} from '../styles/theme';
import StatCounter from '../components/StatCounter';
import SceneWrapper from '../components/SceneWrapper';

const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const durationInFrames = theme.scenes[1].frames;

  const logos = [
    {name: 'Startup A', delay: 30},
    {name: 'Startup B', delay: 50},
    {name: 'Startup C', delay: 70},
    {name: 'Startup D', delay: 90},
  ];

  return (
    <SceneWrapper durationInFrames={durationInFrames}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          padding: 40,
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontFamily: theme.fonts.mono,
            color: theme.colors.gray,
            marginBottom: 40,
            opacity: interpolate(
              frame,
              [0, 30],
              [0, 1],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
            ),
          }}
        >
          THE PROBLEM
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 20,
            justifyContent: 'center',
            marginBottom: 60,
          }}
        >
          {logos.map((logo, i) => {
            const fadeOut = interpolate(
              frame,
              [logo.delay + 60, logo.delay + 90],
              [1, 0.2],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
            );

            const strikeThrough = interpolate(
              frame,
              [logo.delay + 60, logo.delay + 75],
              [0, 100],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
            );

            return (
              <div
                key={i}
                style={{
                  position: 'relative',
                  padding: '16px 32px',
                  background: `${theme.colors.darkGray}`,
                  border: `1px solid ${theme.colors.gray}33`,
                  borderRadius: 12,
                  opacity: fadeOut,
                }}
              >
                <span
                  style={{
                    fontSize: 18,
                    fontFamily: theme.fonts.body,
                    color: theme.colors.gray,
                  }}
                >
                  {logo.name}
                </span>
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    width: `${strikeThrough}%`,
                    height: 2,
                    background: theme.colors.red,
                  }}
                />
              </div>
            );
          })}
        </div>

        <StatCounter
          value={90}
          suffix="%"
          label="Startups Fail"
          delay={60}
          color={theme.colors.red}
        />

        <div
          style={{
            marginTop: 40,
            fontSize: 24,
            fontFamily: theme.fonts.body,
            color: theme.colors.gray,
            textAlign: 'center',
            maxWidth: 600,
            opacity: interpolate(
              frame,
              [120, 150],
              [0, 1],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
            ),
          }}
        >
          Without the right technology partner
        </div>
      </div>
    </SceneWrapper>
  );
};

export default ProblemScene;
