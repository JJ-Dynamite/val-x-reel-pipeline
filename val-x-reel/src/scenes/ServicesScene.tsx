import React from 'react';
import {useCurrentFrame, spring, interpolate} from 'remotion';
import {theme} from '../styles/theme';
import TechBadge from '../components/TechBadge';
import SceneWrapper from '../components/SceneWrapper';

const ServicesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const durationInFrames = theme.scenes[3].frames;

  const categories = [
    {
      name: 'FRONTEND',
      techs: [
        {name: 'React', color: '#61DAFB'},
        {name: 'Vue.js', color: '#4FC08D'},
        {name: 'Flutter', color: '#02569B'},
        {name: 'React Native', color: '#61DAFB'},
      ],
      delay: 30,
    },
    {
      name: 'BACKEND',
      techs: [
        {name: 'Node.js', color: '#339933'},
        {name: 'Python', color: '#3776AB'},
        {name: 'Go', color: '#00ADD8'},
        {name: 'Rust', color: '#000000'},
      ],
      delay: 90,
    },
    {
      name: 'AI & ML',
      techs: [
        {name: 'TensorFlow', color: '#FF6F00'},
        {name: 'PyTorch', color: '#EE4C2C'},
        {name: 'OpenAI', color: '#412991'},
      ],
      delay: 150,
    },
    {
      name: 'CLOUD',
      techs: [
        {name: 'AWS', color: '#232F3E'},
        {name: 'Docker', color: '#2496ED'},
        {name: 'Kubernetes', color: '#326CE5'},
      ],
      delay: 210,
    },
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
            marginBottom: 10,
            opacity: interpolate(
              frame,
              [0, 30],
              [0, 1],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
            ),
          }}
        >
          TECHNOLOGY STACK
        </div>

        <div
          style={{
            fontSize: 60,
            fontFamily: theme.fonts.heading,
            color: theme.colors.white,
            marginBottom: 50,
            opacity: interpolate(
              frame,
              [15, 45],
              [0, 1],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
            ),
          }}
        >
          200+ TECH
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 30,
            width: '100%',
            maxWidth: 900,
          }}
        >
          {categories.map((cat, catIndex) => {
            const catAppear = spring({
              frame: frame - cat.delay,
              fps: theme.fps,
              config: {damping: 12, stiffness: 100},
            });

            return (
              <div
                key={catIndex}
                style={{
                  opacity: catAppear,
                  transform: `translateX(${(1 - catAppear) * 100}px)`,
                }}
              >
                <div
                  style={{
                    fontSize: 18,
                    fontFamily: theme.fonts.mono,
                    color: theme.colors.primary,
                    marginBottom: 12,
                    letterSpacing: '0.1em',
                  }}
                >
                  {cat.name}
                </div>
                <div
                  style={{
                    display: 'flex',
                    gap: 12,
                    flexWrap: 'wrap',
                  }}
                >
                  {cat.techs.map((tech, techIndex) => (
                    <TechBadge
                      key={techIndex}
                      name={tech.name}
                      color={tech.color}
                      delay={cat.delay + techIndex * 10}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 80,
            fontSize: 20,
            fontFamily: theme.fonts.body,
            color: theme.colors.gray,
            opacity: interpolate(
              frame,
              [300, 330],
              [0, 0.7],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
            ),
          }}
        >
          One team. Your team.
        </div>
      </div>
    </SceneWrapper>
  );
};

export default ServicesScene;
