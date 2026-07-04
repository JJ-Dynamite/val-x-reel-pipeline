import React from 'react';
import {useCurrentFrame, spring, interpolate} from 'remotion';
import {theme} from '../styles/theme';
import StatCounter from '../components/StatCounter';
import GlowCard from '../components/GlowCard';
import SceneWrapper from '../components/SceneWrapper';

const ImpactScene: React.FC = () => {
  const frame = useCurrentFrame();
  const durationInFrames = theme.scenes[4].frames;

  const milestones = [
    {year: '12', event: 'Started Coding', icon: '💻'},
    {year: '15+', event: 'Years Experience', icon: '⏳'},
    {year: '257+', event: 'Projects Shipped', icon: '🚀'},
    {year: '2020', event: 'Founded Val-X', icon: '🏢'},
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
          IMPACT & STORY
        </div>

        <div
          style={{
            fontSize: 48,
            fontFamily: theme.fonts.heading,
            color: theme.colors.white,
            textAlign: 'center',
            marginBottom: 40,
            opacity: interpolate(
              frame,
              [15, 45],
              [0, 1],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
            ),
          }}
        >
          From Kozhikode to the World
        </div>

        <div
          style={{
            display: 'flex',
            gap: 30,
            marginBottom: 50,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <StatCounter value={50} suffix="+" label="Projects" delay={30} />
          <StatCounter value={20} suffix="+" label="Clients" delay={50} />
          <StatCounter value={15} suffix="+" label="Years" delay={70} />
        </div>

        <div
          style={{
            fontSize: 32,
            fontFamily: theme.fonts.heading,
            color: theme.colors.primary,
            marginBottom: 30,
            opacity: interpolate(
              frame,
              [120, 150],
              [0, 1],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
            ),
          }}
        >
          JOEL J MATHEW
        </div>

        <div
          style={{
            display: 'flex',
            gap: 20,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {milestones.map((milestone, i) => {
            const appear = spring({
              frame: frame - 150 - i * 20,
              fps: theme.fps,
              config: {damping: 10, stiffness: 100},
            });

            return (
              <GlowCard
                key={i}
                delay={150 + i * 20}
                color={theme.colors.primary}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minWidth: 120,
                  }}
                >
                  <div style={{fontSize: 30}}>{milestone.icon}</div>
                  <div
                    style={{
                      fontSize: 28,
                      fontFamily: theme.fonts.heading,
                      color: theme.colors.primary,
                      marginTop: 8,
                    }}
                  >
                    {milestone.year}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      fontFamily: theme.fonts.body,
                      color: theme.colors.gray,
                      marginTop: 4,
                    }}
                  >
                    {milestone.event}
                  </div>
                </div>
              </GlowCard>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 40,
            fontSize: 20,
            fontFamily: theme.fonts.body,
            color: theme.colors.gray,
            textAlign: 'center',
            maxWidth: 600,
            lineHeight: 1.6,
            opacity: interpolate(
              frame,
              [270, 300],
              [0, 1],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
            ),
          }}
        >
          Self-taught at 12. Building since day one.
          <br />
          Now helping founders build their dreams.
        </div>
      </div>
    </SceneWrapper>
  );
};

export default ImpactScene;
