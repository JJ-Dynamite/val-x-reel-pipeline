import React from 'react';
import {useCurrentFrame, spring, interpolate} from 'remotion';
import {theme} from '../styles/theme';
import ValXLogo from '../components/ValXLogo';
import SceneWrapper from '../components/SceneWrapper';

const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const durationInFrames = theme.scenes[6].frames;

  const socials = [
    {name: 'Instagram', icon: '📸', handle: '@val_x_international_'},
    {name: 'YouTube', icon: '▶️', handle: 'Val-X'},
    {name: 'TikTok', icon: '🎵', handle: '@val_x'},
    {name: 'X', icon: '𝕏', handle: '@val_x_intl'},
  ];

  return (
    <SceneWrapper durationInFrames={durationInFrames} fadeOut={false}>
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
        <ValXLogo size={200} delay={0} showText={false} />

        <div
          style={{
            marginTop: 40,
            fontSize: 28,
            fontFamily: theme.fonts.heading,
            color: theme.colors.white,
            opacity: interpolate(
              frame,
              [10, 30],
              [0, 1],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
            ),
          }}
        >
          FOLLOW US
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            marginTop: 40,
          }}
        >
          {socials.map((social, i) => {
            const appear = spring({
              frame: frame - 20 - i * 8,
              fps: theme.fps,
              config: {damping: 10, stiffness: 100},
            });

            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '16px 32px',
                  background: `${theme.colors.darkGray}`,
                  border: `1px solid ${theme.colors.primary}44`,
                  borderRadius: 12,
                  transform: `scale(${appear}) translateX(${(1 - appear) * 100}px)`,
                  opacity: appear,
                }}
              >
                <span style={{fontSize: 24}}>{social.icon}</span>
                <div>
                  <div
                    style={{
                      fontSize: 18,
                      fontFamily: theme.fonts.heading,
                      color: theme.colors.white,
                    }}
                  >
                    {social.name}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      fontFamily: theme.fonts.mono,
                      color: theme.colors.primary,
                    }}
                  >
                    {social.handle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 50,
            fontSize: 16,
            fontFamily: theme.fonts.body,
            color: theme.colors.gray,
            opacity: interpolate(
              frame,
              [60, 80],
              [0, 0.7],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
            ),
          }}
        >
          More updates coming soon
        </div>
      </div>
    </SceneWrapper>
  );
};

export default OutroScene;
