import React from 'react';
import {useCurrentFrame, spring, interpolate} from 'remotion';
import {theme} from '../styles/theme';
import GlitchText from '../components/GlitchText';
import ParticleSystem from '../components/ParticleSystem';
import SceneWrapper from '../components/SceneWrapper';

const SolutionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const durationInFrames = theme.scenes[2].frames;

  const ideas = [
    {text: 'App Idea', icon: '📱', delay: 30},
    {text: 'Web Platform', icon: '🌐', delay: 60},
    {text: 'AI Solution', icon: '🤖', delay: 90},
  ];

  return (
    <SceneWrapper durationInFrames={durationInFrames}>
      <ParticleSystem count={30} speed={0.5} />

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
        <div
          style={{
            fontSize: 28,
            fontFamily: theme.fonts.mono,
            color: theme.colors.primary,
            marginBottom: 20,
            opacity: interpolate(
              frame,
              [0, 30],
              [0, 1],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
            ),
          }}
        >
          THE SOLUTION
        </div>

        <GlitchText
          text="VAL-X"
          fontSize={72}
          delay={15}
        />

        <div
          style={{
            marginTop: 30,
            fontSize: 24,
            fontFamily: theme.fonts.body,
            color: theme.colors.gray,
            textAlign: 'center',
            opacity: interpolate(
              frame,
              [45, 75],
              [0, 1],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
            ),
          }}
        >
          Transforms ideas into reality
        </div>

        <div
          style={{
            display: 'flex',
            gap: 30,
            marginTop: 60,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {ideas.map((idea, i) => {
            const appear = spring({
              frame: frame - idea.delay,
              fps: theme.fps,
              config: {damping: 10, stiffness: 100},
            });

            const arrowProgress = interpolate(
              frame,
              [idea.delay + 30, idea.delay + 60],
              [0, 1],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
            );

            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 15,
                  transform: `scale(${appear}) translateX(${(1 - appear) * 50}px)`,
                  opacity: appear,
                }}
              >
                <div
                  style={{
                    padding: '20px 30px',
                    background: `${theme.colors.darkGray}`,
                    border: `2px solid ${theme.colors.primary}44`,
                    borderRadius: 16,
                    textAlign: 'center',
                  }}
                >
                  <div style={{fontSize: 40}}>{idea.icon}</div>
                  <div
                    style={{
                      fontSize: 16,
                      fontFamily: theme.fonts.body,
                      color: theme.colors.white,
                      marginTop: 8,
                    }}
                  >
                    {idea.text}
                  </div>
                </div>

                <div
                  style={{
                    fontSize: 30,
                    color: theme.colors.primary,
                    opacity: arrowProgress,
                    transform: `translateX(${(1 - arrowProgress) * -20}px)`,
                  }}
                >
                  →
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 60,
            padding: '16px 40px',
            background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.valxBlue})`,
            borderRadius: 30,
            opacity: interpolate(
              frame,
              [180, 210],
              [0, 1],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
            ),
          }}
        >
          <span
            style={{
              fontSize: 24,
              fontFamily: theme.fonts.heading,
              color: theme.colors.secondary,
            }}
          >
            LET'S GO
          </span>
        </div>
      </div>
    </SceneWrapper>
  );
};

export default SolutionScene;
