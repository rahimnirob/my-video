import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { frames } from '../../tokens';
import KineticHeadline from '../components/KineticHeadline';
import Atmosphere from '../components/Atmosphere';
import { Slate } from './Frame01Launch';

/**
 * Frame 00 — HOOK · the text-first cold-open. Big kinetic typography over a dark
 * LED-screen texture (hook.jpg), darkened + softened + a violet wash so it ties
 * to the Lumen world and the type reads clean. Straight to the founder:
 * "DID YOU LAUNCH ON PRODUCT HUNT?" — PRODUCT HUNT in PH's own white-anchored
 * orange→red (the sweep shimmers). Slow cinematic push-in. Then it lifts away.
 */

/** Product Hunt's own gradient — white-anchored so the animated sweep shines. */
const PH_GRADIENT =
  'linear-gradient(100deg, #FFFFFF 0%, #FF8A7E 30%, #FF5141 55%, #DA552F 78%, #FFFFFF 100%)';

const Frame00Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const tau = Math.PI * 2;
  const exitAt = durationInFrames - frames(660, fps);
  const bgScale = interpolate(frame, [0, durationInFrames], [1.12, 1.2]);
  const driftX = 16 * Math.sin((frame / (11 * fps)) * tau);

  return (
    <AbsoluteFill style={{ background: '#04030a' }}>
      {/* dark LED-screen texture — softened + dimmed so the type owns the frame */}
      <AbsoluteFill>
        <Img
          src={staticFile('hook.jpg')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'brightness(0.4) saturate(0.92) contrast(1.06) blur(1.4px)',
            transform: `scale(${bgScale}) translateX(${driftX}px)`,
          }}
        />
      </AbsoluteFill>
      {/* violet wash — ties the screen to the Lumen world */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse 86% 76% at 50% 44%, rgba(98,62,180,0.22) 0%, transparent 68%)',
          mixBlendMode: 'screen',
        }}
      />
      {/* centre scrim behind the type + vignette */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse 74% 44% at 50% 48%, rgba(2,1,8,0.62) 0%, transparent 74%)',
        }}
      />
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse 104% 88% at 50% 50%, transparent 40%, rgba(2,1,6,0.84) 100%)',
        }}
      />

      <Slate label="00 · HOOK" />

      <KineticHeadline
        words={['DID', 'YOU', 'LAUNCH', 'ON', 'PRODUCT', 'HUNT?']}
        accentIndices={[4, 5]}
        accentGradient={PH_GRADIENT}
        startFrame={frames(240, fps)}
        fontSize={50}
        top="48%"
        left="6%"
        right="6%"
        translateYPct={-50}
        transformOrigin="center center"
        tiltX={3}
        tiltY={0}
        align="center"
        enterX={0}
        wordStaggerMs={130}
        exitAt={exitAt}
        cinematic
        zIndex={20}
      />

      <Atmosphere topFade={false} />
    </AbsoluteFill>
  );
};

export default Frame00Hook;
