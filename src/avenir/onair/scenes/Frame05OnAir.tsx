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
import { LUMEN } from '../products';
import BillboardStageBg from '../components/BillboardStageBg';
import BroadcastPlayer from '../components/BroadcastPlayer';
import KineticHeadline from '../components/KineticHeadline';
import Atmosphere from '../components/Atmosphere';
import { Slate } from './Frame01Launch';

/**
 * Frame 05 — ON AIR (the reveal). The Lumen card has become the broadcast
 * player — it grows into place, the halo ignites, counters live. Call-sign,
 * telemetry strip, and value chips frame it. Caption below.
 *
 * Headline: "YOUR PRODUCT BROADCASTS FOR 30 DAYS — NOT 24 HOURS."
 */

const HEADLINE = ['YOUR', 'PRODUCT', 'BROADCASTS', 'FOR', '30', 'DAYS', '—', 'NOT', '24', 'HOURS.'];
const HEADLINE_ACCENTS = [2, 4, 5]; // BROADCASTS, 30, DAYS
const ORANGE_GRADIENT =
  'linear-gradient(100deg, #FFFFFF 0%, #FFD9C2 30%, #F0A868 55%, #E85D3A 76%, #FFFFFF 100%)';
const HEADLINE_AT_MS = 4400;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const CHIPS = ['WE FILM IT', 'CURATED, NOT VOTED', '30 DAYS LIVE'];

const Frame05OnAir: React.FC = () => {
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

  // The card grows into the player.
  const grow = ramp(0, frames(900, fps));
  const playerScale = lerp(0.46, 1, grow);
  const floatY = s(5) * Math.sin((frame / (6 * fps)) * tau);

  const views = Math.round(lerp(1240, 5180, ramp(frames(300, fps), frames(6500, fps))));
  const progress = lerp(0.16, 0.52, ramp(0, frames(6800, fps)));

  const chromeIn = ramp(frames(700, fps), frames(1400, fps));
  const headlineScrim = ramp(headlineAt, headlineAt + frames(450, fps));

  return (
    <AbsoluteFill style={{ background: '#020203' }}>
      <BillboardStageBg warmth={1} driftX={s(4) * Math.sin((frame / (12 * fps)) * tau)} />

      <Slate label="05 · ON AIR" accent={billboard.primary} />

      {/* call-sign top-left */}
      <div
        style={{
          position: 'absolute',
          top: s(36),
          left: s(18),
          display: 'inline-flex',
          alignItems: 'center',
          gap: s(8),
          opacity: chromeIn,
          fontFamily: mono,
          zIndex: 20,
        }}
      >
        <span style={{ width: s(6), height: s(6), borderRadius: '50%', background: '#ef4444', boxShadow: `0 0 ${s(9)}px #ef4444` }} />
        <span style={{ fontSize: s(9), letterSpacing: '0.22em', color: billboard.primary, fontWeight: 700 }}>ON AIR</span>
        <span style={{ width: 1, height: s(12), background: 'rgba(240,242,244,0.18)' }} />
        <span style={{ fontFamily: 'inherit', fontSize: s(11), letterSpacing: '0.22em', color: 'rgba(240,242,244,0.9)', fontWeight: 700 }}>AVENIR</span>
        <span style={{ fontSize: s(9), letterSpacing: '0.16em', color: 'rgba(240,242,244,0.5)' }}>· S02 · LIVE</span>
      </div>

      {/* telemetry strip top-center */}
      <div
        style={{
          position: 'absolute',
          top: '5.5%',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: chromeIn,
          display: 'inline-flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          gap: s(8),
          padding: `${s(6)}px ${s(11)}px`,
          background: 'rgba(13,16,20,0.86)',
          border: `1px solid ${billboard.primary}38`,
          borderRadius: s(4),
          backdropFilter: `blur(${s(10)}px)`,
          zIndex: 20,
        }}
      >
        <Cell label="SEASON" value="02" />
        <Diamond />
        <Cell label="SLOTS" value="50/50" />
        <Diamond />
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: s(5) }}>
          <span style={{ width: s(5), height: s(5), borderRadius: '50%', background: '#ef4444' }} />
          <span style={{ fontFamily: mono, fontSize: s(9), color: billboard.primary, fontWeight: 600 }}>LIVE</span>
        </span>
        <Diamond />
        <Cell label="ARC" value="30·DAY" />
      </div>

      {/* the player — hero, grown from the card */}
      <div style={{ position: 'absolute', left: '50%', top: '44%', transform: `translate(-50%, calc(-50% + ${floatY}px))`, zIndex: 10 }}>
        <BroadcastPlayer product={LUMEN} width={1240} progress={progress} views={views} tier="PRI" scale={playerScale} />
      </div>

      {/* value chips */}
      <div style={{ position: 'absolute', left: '50%', top: '75%', transform: 'translateX(-50%)', display: 'flex', gap: s(9), zIndex: 12 }}>
        {CHIPS.map((c, i) => {
          const cin = ramp(frames(1600 + i * 220, fps), frames(2100 + i * 220, fps));
          return (
            <span
              key={c}
              style={{
                fontFamily: mono,
                fontSize: s(8.5),
                letterSpacing: '0.12em',
                whiteSpace: 'nowrap',
                color: billboard.secondary,
                padding: `${s(5)}px ${s(10)}px`,
                borderRadius: s(16),
                background: 'rgba(232,93,58,0.06)',
                border: `1px solid ${billboard.primary}44`,
                opacity: cin,
                transform: `translateY(${(1 - cin) * s(8)}px)`,
              }}
            >
              {c}
            </span>
          );
        })}
      </div>

      {/* caption — centred, with the focus-blur on the player (the aesthetic) */}
      <AbsoluteFill
        style={{
          backdropFilter: `blur(${headlineScrim * s(5)}px)`,
          WebkitBackdropFilter: `blur(${headlineScrim * s(5)}px)`,
          background: `rgba(6,2,2,${headlineScrim * 0.34})`,
          zIndex: 30,
        }}
      />
      <KineticHeadline
        words={HEADLINE}
        accentIndices={HEADLINE_ACCENTS}
        accentGradient={ORANGE_GRADIENT}
        startFrame={headlineAt}
        fontSize={30}
        top="50%"
        left="9%"
        right="9%"
        translateYPct={-50}
        transformOrigin="center center"
        tiltX={3}
        tiltY={0}
        align="center"
        enterX={0}
        wordStaggerMs={100}
        zIndex={32}
      />

      <Atmosphere vignette={0.5} grain={0.05} topFade={false} />
    </AbsoluteFill>
  );
};

const Cell: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: s(5), whiteSpace: 'nowrap' }}>
    <span style={{ fontFamily: mono, fontSize: s(7), letterSpacing: '0.16em', color: '#3E4650', fontWeight: 600 }}>{label}</span>
    <span style={{ fontFamily: mono, fontSize: s(9), color: '#F0F2F4', fontWeight: 600 }}>{value}</span>
  </span>
);
const Diamond: React.FC = () => <span style={{ color: 'rgba(232,93,58,0.3)', fontSize: s(7) }}>◆</span>;

export default Frame05OnAir;
