import React from 'react';
import {Series} from 'remotion';
import {theme} from './styles/theme';
import HookScene from './scenes/HookScene';
import ProblemScene from './scenes/ProblemScene';
import SolutionScene from './scenes/SolutionScene';
import ServicesScene from './scenes/ServicesScene';
import ImpactScene from './scenes/ImpactScene';
import CTAScene from './scenes/CTAScene';
import OutroScene from './scenes/OutroScene';

const ValXReel: React.FC = () => {
  return (
    <div
      style={{
        width: theme.width,
        height: theme.height,
        background: theme.colors.secondary,
        overflow: 'hidden',
      }}
    >
      <Series>
        <Series.Sequence durationInFrames={theme.scenes[0].frames}>
          <HookScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={theme.scenes[1].frames}>
          <ProblemScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={theme.scenes[2].frames}>
          <SolutionScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={theme.scenes[3].frames}>
          <ServicesScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={theme.scenes[4].frames}>
          <ImpactScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={theme.scenes[5].frames}>
          <CTAScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={theme.scenes[6].frames}>
          <OutroScene />
        </Series.Sequence>
      </Series>
    </div>
  );
};

export default ValXReel;
