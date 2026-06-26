import React from 'react';
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from 'remotion';
import { OLD_VOID } from './palette';
import { BEATS } from './beats';
import Frame00Hook from './scenes/Frame00Hook';
import Frame01Launch from './scenes/Frame01Launch';
import Frame02Midnight from './scenes/Frame02Midnight';
import Frame03Graveyard from './scenes/Frame03Graveyard';
import Frame04Turn from './scenes/Frame04Turn';
import Frame05OnAir from './scenes/Frame05OnAir';
import Frame06Proof from './scenes/Frame06Proof';
import Frame07Offer from './scenes/Frame07Offer';
import SfxTrack from './SfxTrack';

/** Violet light-splash — a warm swell over a beat boundary (01 → 02). */
const SPLASH_VIOLET =
  'radial-gradient(ellipse 105% 82% at 50% 60%, rgba(186,156,255,0.95) 0%, rgba(139,92,246,0.5) 38%, rgba(58,30,118,0.16) 68%, transparent 82%)';
/** Dark burial dip — the world goes under, then the graveyard surfaces (02 → 03). */
const SPLASH_DARK =
  'radial-gradient(ellipse 135% 105% at 50% 55%, rgba(2,2,4,0.98) 0%, rgba(2,2,4,0.88) 52%, rgba(2,2,4,0.6) 100%)';
/** Warm ember swell — the light returns at the turn (03 → 04). */
const SPLASH_WARM =
  'radial-gradient(ellipse 120% 86% at 50% 42%, rgba(255,150,98,0.9) 0%, rgba(232,93,58,0.5) 40%, rgba(120,32,20,0.16) 70%, transparent 84%)';

/**
 * A swell over a beat boundary that hides the foreground swap. The bg is
 * continuous and the foregrounds are staggered (one clears before the next
 * fades in), so this reads as one continuous world breathing — not a cut.
 */
const SplashTransition: React.FC<{
  at: number;
  background: string;
  peak?: number;
  rise?: number;
  fall?: number;
}> = ({ at, background, peak = 0.72, rise = 12, fall = 16 }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [at - rise, at + 2, at + fall], [0, peak, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill style={{ opacity, pointerEvents: 'none', zIndex: 100, background }} />
  );
};

/**
 * OnAirExplainer — the ~38s, 1080×1350 mute-first Billboard explainer.
 * Built one beat at a time (§9). Beats hand off via splashes over a continuous
 * world: a warm violet swell into MIDNIGHT, a dark "burial" dip into GRAVEYARD.
 */
const OnAirExplainer: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: OLD_VOID }}>
      <Sequence name="00 · HOOK" {...BEATS.hook}>
        <Frame00Hook />
      </Sequence>
      <Sequence name="01 · LAUNCH" {...BEATS.launch}>
        <Frame01Launch />
      </Sequence>
      <Sequence name="02 · MIDNIGHT" {...BEATS.midnight}>
        <Frame02Midnight />
      </Sequence>
      <Sequence name="03 · GRAVEYARD" {...BEATS.graveyard}>
        <Frame03Graveyard />
      </Sequence>
      <Sequence name="04 · THE TURN" {...BEATS.turn}>
        <Frame04Turn />
      </Sequence>
      <Sequence name="05 · ON AIR" {...BEATS.onair}>
        <Frame05OnAir />
      </Sequence>
      <Sequence name="06 · PROOF" {...BEATS.proof}>
        <Frame06Proof />
      </Sequence>
      <Sequence name="07 · OFFER" {...BEATS.offer}>
        <Frame07Offer />
      </Sequence>

      <SplashTransition at={BEATS.launch.from} background={SPLASH_VIOLET} />
      <SplashTransition at={BEATS.midnight.from} background={SPLASH_VIOLET} />
      <SplashTransition
        at={BEATS.graveyard.from}
        background={SPLASH_DARK}
        peak={0.94}
        rise={14}
        fall={18}
      />
      <SplashTransition
        at={BEATS.turn.from}
        background={SPLASH_WARM}
        peak={0.58}
        rise={14}
        fall={20}
      />
      <SplashTransition at={BEATS.onair.from} background={SPLASH_WARM} peak={0.6} />
      <SplashTransition at={BEATS.proof.from} background={SPLASH_WARM} peak={0.5} />
      <SplashTransition at={BEATS.offer.from} background={SPLASH_WARM} peak={0.5} />

      <SfxTrack />
    </AbsoluteFill>
  );
};

export default OnAirExplainer;
