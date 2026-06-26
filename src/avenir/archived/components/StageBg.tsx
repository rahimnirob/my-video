import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

/**
 * StageBg — the animated "crimson glass slats" stage (matches the founder's
 * reference: white-red-crimson glow behind vertical glass bars on black).
 *
 * It is ALIVE, not a still image:
 *   • a white-hot crimson glow LOW-of-centre that breathes + drifts slowly, so
 *     different slats catch the light over time;
 *   • soft orbs drifting behind the slats at the sides (premium "light behind
 *     glass" motion, slight transparency);
 *   • vertical glass bars of varying widths with dark seams + a faint edge
 *     highlight; an iridescent sheen; vignette; fine grain.
 * A centre text-bed keeps the typography legible over it.
 */

const TAU = Math.PI * 2;

const BAR_FILL =
  'linear-gradient(180deg, rgba(2,0,1,0.99) 0%, rgba(2,0,1,0.93) 42%, rgba(9,0,2,0.58) 76%, rgba(18,1,5,0.28) 100%)';
const BAR_SHADOW =
  'inset 1px 0 3px rgba(0,0,0,0.55), inset -1px 0 3px rgba(0,0,0,0.55), inset 1px 0 0 rgba(255,255,255,0.045)';
const IRID =
  'linear-gradient(115deg, rgba(120,90,210,0.05) 0%, transparent 28%, transparent 72%, rgba(70,130,210,0.04) 100%)';
const TEXT_BED =
  'radial-gradient(ellipse 74% 50% at 50% 45%, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.18) 56%, transparent 80%)';
const VIGNETTE =
  'radial-gradient(ellipse 92% 96% at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 82%, rgba(0,0,0,0.92) 100%)';
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

// Vertical slats with varying widths (deterministic — no Math.random).
const N_BARS = 26;
const BARS = (() => {
  const w: number[] = [];
  let acc = 0;
  for (let i = 0; i < N_BARS; i++) {
    const ww = 0.78 + 0.55 * Math.abs(Math.sin(i * 1.7 + 0.5));
    w.push(ww);
    acc += ww;
  }
  let left = 0;
  return w.map((ww) => {
    const lw = (ww / acc) * 100;
    const bar = { left, width: lw };
    left += lw;
    return bar;
  });
})();

// Big orbs that roam the whole screen behind the slats (px/py = period in s).
const ORBS = [
  { x: 30, y: 54, r: 880, col: 'rgba(232,46,40,0.62)', ax: 28, ay: 24, px: 4.0, py: 3.0, ph: 0 },
  { x: 70, y: 46, r: 760, col: 'rgba(255,150,138,0.46)', ax: 30, ay: 26, px: 4.6, py: 3.4, ph: 2.2 },
  { x: 56, y: 72, r: 1000, col: 'rgba(168,12,20,0.56)', ax: 32, ay: 20, px: 5.2, py: 3.7, ph: 4.1 },
  { x: 44, y: 40, r: 700, col: 'rgba(255,96,72,0.42)', ax: 24, ay: 28, px: 3.4, py: 4.2, ph: 1.0 },
];

const StageBg: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  // Bigger, faster, roaming hero glow — a moving spotlight, not a fixed hotspot.
  const breath = 0.8 + 0.2 * Math.sin((t / 1.4) * TAU);
  const gx = 50 + 24 * Math.sin((t / 3.2) * TAU);
  const gy = 70 + 18 * Math.sin((t / 2.6) * TAU + 1);
  const glow =
    `radial-gradient(ellipse 52% 72% at ${gx}% ${gy}%,` +
    ` rgba(255,250,248,${0.94 * breath}) 0%,` +
    ` rgba(255,122,102,${0.74 * breath}) 14%,` +
    ` rgba(212,32,36,${0.48 * breath}) 32%,` +
    ` rgba(120,8,14,0.2) 54%,` +
    ' transparent 74%)';

  // A faster secondary light sweeping across the slats.
  const sweepX = interpolate(frame % (6 * fps), [0, 6 * fps], [-30, 130]);
  const sweep = `radial-gradient(ellipse 30% 62% at ${sweepX}% 84%, rgba(255,180,150,0.12) 0%, transparent 60%)`;

  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <AbsoluteFill style={{ background: glow }} />
      {ORBS.map((o, i) => {
        const ox = o.x + o.ax * Math.sin((t / o.px) * TAU + o.ph);
        const oy = o.y + o.ay * Math.cos((t / o.py) * TAU + o.ph);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${ox}%`,
              top: `${oy}%`,
              width: o.r,
              height: o.r,
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${o.col} 0%, transparent 68%)`,
              filter: 'blur(64px)',
              mixBlendMode: 'screen',
            }}
          />
        );
      })}
      <AbsoluteFill style={{ background: sweep, mixBlendMode: 'screen' }} />
      {/* glass slats */}
      <AbsoluteFill>
        {BARS.map((b, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${b.left}%`,
              width: `${b.width}%`,
              background: BAR_FILL,
              boxShadow: BAR_SHADOW,
            }}
          />
        ))}
      </AbsoluteFill>
      <AbsoluteFill style={{ background: IRID, mixBlendMode: 'screen' }} />
      <AbsoluteFill style={{ background: TEXT_BED }} />
      <AbsoluteFill style={{ background: VIGNETTE }} />
      <AbsoluteFill
        style={{ backgroundImage: GRAIN, backgroundRepeat: 'repeat', opacity: 0.05, mixBlendMode: 'overlay' }}
      />
    </AbsoluteFill>
  );
};

export default StageBg;
