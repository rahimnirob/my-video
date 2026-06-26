import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { frames } from '../../tokens';
import { s } from '../layout';
import { LUMEN } from '../products';
import { BLOOM, mixBloom } from '../world';
import Bloom from '../components/Bloom';
import ProductCard from '../components/ProductCard';
import GraveyardPile from '../components/GraveyardPile';
import KineticHeadline from '../components/KineticHeadline';
import Atmosphere from '../components/Atmosphere';
import { Slate } from './Frame01Launch';

/**
 * Frame 03 — GRAVEYARD (16:9). Lumen glows alive at upper-center, the day cuts
 * out, then it drains + descends into the full-width field of dead cards. The
 * caption sits at the top, tilted so its bottom recedes toward the graveyard.
 */

const HEADLINE = ['THEN', "IT'S", 'BURIED', '—', 'WITH', 'EVERY', 'OTHER', 'LAUNCH.'];
const HEADLINE_ACCENTS = [2, 7]; // BURIED, LAUNCH

const CUT_AT_MS = 1500;
const HEADLINE_AT_MS = 4200;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const Frame03Graveyard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tau = Math.PI * 2;
  const cutAt = frames(CUT_AT_MS, fps);
  const headlineAt = frames(HEADLINE_AT_MS, fps);

  const pj = interpolate(frame, [frames(1700, fps), frames(3900, fps)], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const deathFade = interpolate(frame, [cutAt, cutAt + frames(450, fps)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const cardTop = lerp(30, 66, pj);
  const rot = lerp(0, 4, pj);
  const cardBright = lerp(1, 0.62, pj);

  const pulse = 0.5 + 0.5 * Math.sin((frame / (2.4 * fps)) * tau);
  const glowRadius = s(lerp(44, 70, pulse));
  const glowAlpha = lerp(0.32, 0.55, pulse) * (1 - deathFade);

  const daycut = interpolate(
    frame,
    [cutAt, cutAt + frames(120, fps), cutAt + frames(500, fps)],
    [0, 0.6, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );
  const fog = pj * 0.4;

  const bloom = mixBloom(BLOOM.drained, BLOOM.dead, pj);
  const headlineExit = interpolate(frame, [234, 248], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: '#020305' }}>
      <Bloom rgb={bloom.rgb} intensity={bloom.intensity} posY={56} />

      <Slate label="03 · GRAVEYARD" accent="#737b88" />

      <GraveyardPile />

      {/* Lumen — alive, then dies and descends into the field */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: `${cardTop}%`,
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
        }}
      >
        <div
          style={{
            transform: `rotate(${rot}deg)`,
            filter: `brightness(${cardBright})`,
            borderRadius: s(18),
            boxShadow: `0 0 ${glowRadius}px rgba(122,162,247,${glowAlpha}), 0 ${s(20)}px ${s(50)}px rgba(0,0,0,0.55)`,
          }}
        >
          <ProductCard product={LUMEN} drain={pj} width={208} glow={false} />
        </div>
      </div>

      {/* fog across the width */}
      <AbsoluteFill
        style={{
          background: 'linear-gradient(180deg, transparent 40%, rgba(2,3,5,0.92) 100%)',
          opacity: fog,
          zIndex: 9,
        }}
      />
      {/* hard day-ends cut */}
      <AbsoluteFill style={{ background: '#000', opacity: daycut, zIndex: 18 }} />

      {/* caption — top, tilted so the bottom recedes toward the pile */}
      <div style={{ opacity: headlineExit }}>
        <KineticHeadline
          words={HEADLINE}
          accentIndices={HEADLINE_ACCENTS}
          startFrame={headlineAt}
          fontSize={32}
          top="15%"
          left="8%"
          right="8%"
          translateYPct={0}
          transformOrigin="center center"
          tiltX={-15}
          tiltY={0}
          align="center"
          enterX={0}
          zIndex={32}
          accentGradient="linear-gradient(100deg, #FFFFFF 0%, #C9B8F5 38%, #7AA2F7 62%, #FFFFFF 100%)"
        />
      </div>

      <Atmosphere vignette={0.66} grain={0.05} topFade={false} />
    </AbsoluteFill>
  );
};

export default Frame03Graveyard;
