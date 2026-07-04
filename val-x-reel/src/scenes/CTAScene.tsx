import React from 'react';
import {useCurrentFrame, spring, interpolate} from 'remotion';
import {theme} from '../styles/theme';
import ValXLogo from '../components/ValXLogo';
import GlitchText from '../components/GlitchText';
import ParticleSystem from '../components/ParticleSystem';
import SceneWrapper from '../components/SceneWrapper';

const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const durationInFrames = theme.scenes[5].frames;

  const services = [
    'App Development',
    'Web Platforms',
    'AI Solutions',
    'Cloud Infrastructure',
  ];

  return (
    <SceneWrapper durationInFrames={durationInFrames}>
      <ParticleSystem count={20} speed={0.3} color={theme.colors.primary} />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          padding: 40,
          zIndex: 10,
        }}
      >
        <ValXLogo size={250} delay={0} showText={false} />

        <div
          style={{
            marginTop: 40,
            opacity: interpolate(
              frame,
              [30, 60],
              [0, 1],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
            ),
          }}
        >
          <GlitchText
            text="GOT A DREAM"
            fontSize={48}
            delay={30}
          />
        </div>

        <div
          style={{
            marginTop: 10,
            opacity: interpolate(
              frame,
              [60, 90],
              [0, 1],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
            ),
          }}
        >
          <GlitchText
            text="PROJECT?"
            fontSize={48}
            delay={60}
          />
        </div>

        <div
          style={{
            display: 'flex',
            gap: 16,
            marginTop: 40,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {services.map((service, i) => {
            const appear = spring({
              frame: frame - 90 - i * 15,
              fps: theme.fps,
              config: {damping: 10, stiffness: 100},
            });

            return (
              <div
                key={i}
                style={{
                  padding: '12px 24px',
                  background: `${theme.colors.primary}22`,
                  border: `1px solid ${theme.colors.primary}66`,
                  borderRadius: 20,
                  fontSize: 16,
                  fontFamily: theme.fonts.body,
                  color: theme.colors.primary,
                  transform: `scale(${appear})`,
                  opacity: appear,
                }}
              >
                {service}
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 60,
            padding: '20px 60px',
            background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.valxBlue})`,
            borderRadius: 40,
            opacity: interpolate(
              frame,
              [180, 210],
              [0, 1],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
            ),
            transform: `scale(${spring({
              frame: frame - 180,
              fps: theme.fps,
              config: {damping: 8, stiffness: 80},
            })})`,
          }}
        >
          <span
            style={{
              fontSize: 32,
              fontFamily: theme.fonts.heading,
              color: theme.colors.secondary,
              letterSpacing: '0.05em',
            }}
          >
            LET'S BUILD TOGETHER
          </span>
        </div>

        <div
          style={{
            marginTop: 40,
            fontSize: 24,
            fontFamily: theme.fonts.mono,
            color: theme.colors.gray,
            opacity: interpolate(
              frame,
              [240, 270],
              [0, 0.8],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
            ),
          }}
        >
          www.val-x.com
        </div>
      </div>
    </SceneWrapper>
  );
};

export default CTAScene;
