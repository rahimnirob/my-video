import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { frames, mono, billboard, EASE_SMOOTH } from '../../tokens';
import { s } from '../layout';
import { LUMEN_ONAIR } from '../products';
import BillboardStageBg from '../components/BillboardStageBg';
import GraveyardPile from '../components/GraveyardPile';
import ProductCard from '../components/ProductCard';
import KineticHeadline from '../components/KineticHeadline';
import Atmosphere from '../components/Atmosphere';
import { Slate } from './Frame01Launch';

/**
 * Frame 04 — THE TURN (16:9). Continues from the graveyard: the same greyed
 * Lumen card sits in the wide field. The pitch black warms into Billboard's
 * ember world, a beam reaches in, and the card LIFTS + its colour floods back.
 * Caption flips to orange.
 *
 * Headline: "AVENIR KEEPS IT ON AIR."
 */

const HEADLINE = ['AVENIR', 'KEEPS', 'IT', 'ON', 'AIR.'];
const HEADLINE_ACCENTS = [0, 4];
const ORANGE_GRADIENT =
  'linear-gradient(100deg, #FFFFFF 0%, #FFD9C2 30%, #F0A868 55%, #E85D3A 76%, #FFFFFF 100%)';
const HEADLINE_AT_MS = 3900;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const Frame04Turn: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tau = Math.PI * 2;
  const headlineAt = frames(HEADLINE_AT_MS, fps);
  const ramp = (a: number, b: number) =>
    interpolate(frame, [a, b], [0, 1], {
      easing: Easing.bezier(...EASE_SMOOTH),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  const warmth = ramp(frames(300, fps), frames(2500, fps));
  const pl = interpolate(frame, [frames(900, fps), frames(2900, fps)], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const cardTop = lerp(66, 42, pl);
  const rot = lerp(4, 0, pl);
  const cardBright = lerp(0.62, 1, pl);
  const igniteGlow = `0 0 ${pl * s(64)}px rgba(232,93,58,${pl * 0.42}), 0 ${s(20)}px ${s(50)}px rgba(0,0,0,0.55)`;

  const beamOpacity = Math.max(
    0,
    ramp(frames(200, fps), frames(1600, fps)) - ramp(frames(3200, fps), frames(4700, fps)) * 0.7,
  );
  const stationIn = ramp(frames(2500, fps), frames(3200, fps));
  const dotPulse = 0.5 + 0.5 * Math.sin((frame / (1 * fps)) * tau);
  const headlineScrim = ramp(headlineAt, headlineAt + frames(450, fps));

  return (
    <AbsoluteFill style={{ background: '#020203' }}>
      <BillboardStageBg warmth={warmth} driftX={s(4) * Math.sin((frame / (10 * fps)) * tau)} />

      {/* warm beam shaft */}
      <div
        style={{
          position: 'absolute',
          top: '-14%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: s(220),
          height: '120%',
          zIndex: 6,
          opacity: beamOpacity,
          background:
            'linear-gradient(180deg, rgba(255,107,71,0) 0%, rgba(255,107,71,0.18) 55%, rgba(232,93,58,0.3) 100%)',
          filter: `blur(${s(9)}px)`,
          clipPath: 'polygon(40% 0, 60% 0, 100% 100%, 0 100%)',
        }}
      />

      <Slate label="04 · THE TURN" accent={billboard.primary} />

      {/* station kicker — top center */}
      <div
        style={{
          position: 'absolute',
          top: '9%',
          left: '50%',
          transform: `translateX(-50%) translateY(${(1 - stationIn) * s(-6)}px)`,
          opacity: stationIn,
          zIndex: 14,
          display: 'inline-flex',
          alignItems: 'center',
          gap: s(9),
          fontFamily: mono,
          fontSize: s(12),
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: billboard.primary,
        }}
      >
        <span
          style={{
            width: s(7),
            height: s(7),
            borderRadius: '50%',
            background: billboard.primary,
            boxShadow: `0 0 ${s(11)}px ${billboard.primary}`,
            opacity: lerp(0.4, 1, dotPulse),
          }}
        />
        BILLBOARD · SEASON 02 · LIVE
      </div>

      <GraveyardPile shiftYpct={pl * 16} opacity={lerp(1, 0.8, pl)} />

      {/* Lumen lifts + ignites */}
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
            boxShadow: igniteGlow,
          }}
        >
          <ProductCard product={LUMEN_ONAIR} drain={1 - pl} width={208} glow={false} />
        </div>
      </div>

      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse 60% 28% at 50% 82%, rgba(8,2,2,0.62) 0%, transparent 72%)',
          opacity: headlineScrim,
          zIndex: 11,
        }}
      />
      <KineticHeadline
        words={HEADLINE}
        accentIndices={HEADLINE_ACCENTS}
        accentGradient={ORANGE_GRADIENT}
        startFrame={headlineAt}
        fontSize={34}
        top="82%"
        left="8%"
        right="8%"
        translateYPct={-50}
        transformOrigin="center center"
        tiltX={4}
        tiltY={0}
        align="center"
        enterX={0}
        zIndex={32}
      />

      <Atmosphere vignette={0.58} grain={0.05} topFade={false} />
    </AbsoluteFill>
  );
};

export default Frame04Turn;
