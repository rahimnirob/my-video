import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { frames, sora, mono, billboard, EASE_SMOOTH } from '../../tokens';
import { s } from '../layout';
import BillboardStageBg from '../components/BillboardStageBg';
import KineticHeadline from '../components/KineticHeadline';
import Atmosphere from '../components/Atmosphere';
import { Slate } from './Frame01Launch';

/**
 * Frame 06 — PROOF. A wide lit shelf of real aired products, each glowing with
 * its own colour — the exact visual rhyme of the graveyard pile, reversed. The
 * Lumen card is brightest. Caption: "17 PRODUCTS AIRED HERE. ALL STILL LIVE."
 */

const HEADLINE = ['17', 'PRODUCTS', 'AIRED', 'HERE.', 'ALL', 'STILL', 'LIVE.'];
const HEADLINE_ACCENTS = [0, 6]; // 17, LIVE
const ORANGE_GRADIENT =
  'linear-gradient(100deg, #FFFFFF 0%, #FFD9C2 30%, #F0A868 55%, #E85D3A 76%, #FFFFFF 100%)';
const HEADLINE_AT_MS = 3000;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Card = { name: string; a: string; b: string; you?: boolean };
const SHELF: Card[] = [
  { name: 'Lumen', a: '139,92,246', b: '96,165,250', you: true },
  { name: 'Cargo', a: '232,93,58', b: '240,168,104' },
  { name: 'Orbit', a: '45,212,191', b: '34,211,238' },
  { name: 'Draft', a: '167,139,250', b: '139,92,246' },
  { name: 'Pulse FM', a: '251,113,133', b: '244,114,182' },
  { name: 'Forge', a: '245,197,78', b: '232,93,58' },
  { name: 'Atlas', a: '59,130,246', b: '96,165,250' },
  { name: 'Halo', a: '52,211,153', b: '45,212,191' },
  { name: 'Nova', a: '236,72,153', b: '167,139,250' },
  { name: 'Probe', a: '34,211,238', b: '59,130,246' },
  { name: 'Quill', a: '201,184,245', b: '139,92,246' },
  { name: 'Relay', a: '255,107,71', b: '245,158,11' },
];

const Frame06Proof: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const headlineAt = frames(HEADLINE_AT_MS, fps);
  const ramp = (a: number, b: number) =>
    interpolate(frame, [a, b], [0, 1], {
      easing: Easing.bezier(...EASE_SMOOTH),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  const headlineScrim = ramp(headlineAt, headlineAt + frames(450, fps));

  return (
    <AbsoluteFill style={{ background: '#020203' }}>
      <BillboardStageBg warmth={1} />

      <Slate label="06 · PROOF" accent={billboard.primary} />

      {/* archive header */}
      <div
        style={{
          position: 'absolute',
          top: '13%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: s(10),
          fontFamily: mono,
          fontSize: s(13),
          letterSpacing: '0.24em',
          color: billboard.primary,
          opacity: ramp(frames(200, fps), frames(800, fps)),
          zIndex: 11,
        }}
      >
        <span style={{ width: s(7), height: s(7), borderRadius: '50%', background: billboard.primary, boxShadow: `0 0 ${s(10)}px ${billboard.primary}` }} />
        SEASON 01 · ARCHIVED
        <span style={{ color: 'rgba(240,242,244,0.4)' }}>· 17 PRODUCTS</span>
      </div>

      {/* the lit shelf — 6 columns, cards fade up in a wave */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '47%',
          transform: 'translate(-50%, -50%)',
          width: '88%',
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: s(18),
          zIndex: 10,
        }}
      >
        {SHELF.map((c, i) => {
          const col = i % 6;
          const inAt = frames(400 + (col * 90 + Math.floor(i / 6) * 140), fps);
          const cin = ramp(inAt, inAt + frames(520, fps));
          return (
            <div
              key={c.name}
              style={{
                position: 'relative',
                aspectRatio: '5 / 4',
                borderRadius: s(14),
                overflow: 'hidden',
                background: 'rgba(13,16,24,0.55)',
                border: c.you ? `1px solid rgba(${c.a},0.6)` : '1px solid rgba(255,255,255,0.10)',
                boxShadow: c.you
                  ? `0 0 ${s(40)}px rgba(${c.a},0.5), 0 ${s(14)}px ${s(30)}px rgba(0,0,0,0.5)`
                  : `0 ${s(12)}px ${s(26)}px rgba(0,0,0,0.45)`,
                opacity: cin,
                transform: `translateY(${(1 - cin) * s(18)}px) scale(${c.you ? lerp(0.96, 1.04, cin) : 1})`,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  filter: `blur(${s(2)}px)`,
                  background: `radial-gradient(120% 90% at 80% 20%, rgba(${c.b},0.6), transparent 55%), radial-gradient(120% 110% at 16% 96%, rgba(${c.a},0.62), transparent 58%)`,
                }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(10,12,18,0.12), rgba(10,12,18,0.5))' }} />
              <div style={{ position: 'relative', padding: s(13) }}>
                <div style={{ fontFamily: sora, fontWeight: 700, fontSize: s(14), color: '#fff' }}>{c.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: s(5), marginTop: s(7) }}>
                  <span style={{ width: s(5), height: s(5), borderRadius: '50%', background: c.you ? billboard.primary : '#34d399', boxShadow: `0 0 ${s(6)}px ${c.you ? billboard.primary : '#34d399'}` }} />
                  <span style={{ fontFamily: mono, fontSize: s(7.5), letterSpacing: '0.14em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>
                    {c.you ? 'YOURS · LIVE' : 'AIRED · LIVE'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse 64% 24% at 50% 86%, rgba(8,2,2,0.6) 0%, transparent 72%)',
          opacity: headlineScrim,
          zIndex: 13,
        }}
      />
      <KineticHeadline
        words={HEADLINE}
        accentIndices={HEADLINE_ACCENTS}
        accentGradient={ORANGE_GRADIENT}
        startFrame={headlineAt}
        fontSize={32}
        top="86%"
        left="7%"
        right="7%"
        translateYPct={-50}
        transformOrigin="center center"
        tiltX={3}
        tiltY={0}
        align="center"
        enterX={0}
        zIndex={32}
      />

      <Atmosphere vignette={0.5} grain={0.05} topFade={false} />
    </AbsoluteFill>
  );
};

export default Frame06Proof;
