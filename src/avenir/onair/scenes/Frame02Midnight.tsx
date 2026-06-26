import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { frames, EASE_SMOOTH } from '../../tokens';
import { s } from '../layout';
import { BLOOM, mixBloom, lerp } from '../world';
import Bloom from '../components/Bloom';
import TimeDial from '../components/TimeDial';
import KineticHeadline from '../components/KineticHeadline';
import Atmosphere from '../components/Atmosphere';
import { Slate } from './Frame01Launch';

/**
 * Frame 02 — MIDNIGHT (16:9). The glass time-dial goes wide and counts the
 * launch day down to 00:00; at midnight the world drains to grey. Caption below.
 */

const HEADLINE = ['BUT', 'IT', 'ONLY', 'LASTS', 'A', 'DAY.'];
const HEADLINE_ACCENTS = [2, 5]; // ONLY, DAY
const HEADLINE_AT_MS = 3300;

const Frame02Midnight: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ease = Easing.bezier(...EASE_SMOOTH);
  const tau = Math.PI * 2;
  const ramp = (a: number, b: number) =>
    interpolate(frame, [a, b], [0, 1], {
      easing: ease,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  const headlineAt = frames(HEADLINE_AT_MS, fps);
  const fgIn = ramp(frames(180, fps), frames(700, fps));
  const fgExit = 1 - ramp(200, 214);
  const fg = fgIn * fgExit;

  const progress = interpolate(frame, [frames(200, fps), frames(2900, fps)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const worldDrain = interpolate(progress, [0.72, 0.96], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const dialEnter = ramp(0, frames(700, fps));
  const dialScale = interpolate(dialEnter, [0, 1], [0.96, 1]);
  const floatY = s(5) * Math.sin((frame / (6.5 * fps)) * tau);

  const bloom = mixBloom(BLOOM.life, BLOOM.drained, worldDrain);
  const headlineScrim = ramp(headlineAt, headlineAt + frames(450, fps));

  return (
    <AbsoluteFill style={{ background: '#05030a' }}>
      <Bloom rgb={bloom.rgb} intensity={bloom.intensity} posY={48} />

      {/* wide blue rim-glow spanning the bottom (the cold old world) */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '-30%',
          transform: 'translateX(-50%)',
          width: '170%',
          height: '70%',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(106,163,247,0.46), rgba(59,130,246,0.14) 40%, transparent 66%)',
          filter: `blur(${s(10)}px) saturate(${lerp(1, 0.3, worldDrain)}) brightness(${lerp(1, 0.7, worldDrain)})`,
          opacity: lerp(0.9, 0.3, worldDrain),
        }}
      />

      <div style={{ position: 'absolute', inset: 0, opacity: fg }}>
        <Slate label="02 · MIDNIGHT" />

        {/* the dial — wide, centered */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '42%',
            transform: `translate(-50%, calc(-50% + ${floatY}px)) scale(${dialScale})`,
            opacity: dialEnter,
            zIndex: 10,
          }}
        >
          <TimeDial progress={progress} width={470} />
        </div>

        <AbsoluteFill
          style={{
            background:
              'radial-gradient(ellipse 56% 30% at 50% 80%, rgba(2,1,7,0.6) 0%, transparent 72%)',
            opacity: headlineScrim,
            zIndex: 12,
          }}
        />
        <KineticHeadline
          words={HEADLINE}
          accentIndices={HEADLINE_ACCENTS}
          startFrame={headlineAt}
          fontSize={34}
          top="80%"
          left="8%"
          right="8%"
          translateYPct={-50}
          transformOrigin="center center"
          tiltX={4}
          tiltY={0}
          align="center"
          enterX={0}
          zIndex={32}
          accentGradient="linear-gradient(100deg, #FFFFFF 0%, #C9B8F5 38%, #7AA2F7 62%, #FFFFFF 100%)"
        />
      </div>

      <Atmosphere topFade={false} />
    </AbsoluteFill>
  );
};

export default Frame02Midnight;
