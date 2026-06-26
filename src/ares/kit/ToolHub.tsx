import React from 'react';
import { AbsoluteFill, Easing, Img, interpolate, staticFile } from 'remotion';
import { ease, L } from '../ares-tokens';
import { Icon, ICON_ORDER } from '../icons';

// Magnetic snap: tools linger on the ring, then accelerate into the hub.
const EASE_IN = Easing.bezier(0.5, 0, 0.84, 0.25);

/**
 * ToolHub — THE signature beat: six ink-tinted tool tiles fade+scale in on a
 * ring, connector lines draw to the centre, then all six travel inward and
 * scale to 0 (merging) as the white Ares hub card scales up and pulses once with
 * a cyan ring — "six tools become one." `startAt` = scene-local converge start
 * (the parent passes the global frame + startAt).
 */
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const TAU = Math.PI * 2;
const RING = 360;
const CX = 960;
const CY = 540;

const ToolHub: React.FC<{ frame: number; startAt: number }> = ({ frame, startAt }) => {
  const t = frame - startAt;
  const N = ICON_ORDER.length;
  const conv = interpolate(t, [40, 96], [0, 1], { easing: EASE_IN, ...clamp }); // ring → centre (magnetic snap)
  const radius = RING * (1 - conv);
  const hubP = interpolate(t, [46, 74], [0, 1], { easing: ease, ...clamp });
  const pulse = interpolate(t, [86, 92, 100], [0, 1, 0], clamp);
  const linesP = interpolate(t, [14, 34], [0, 1], clamp); // connectors draw in during the ring settle

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0, opacity: (1 - conv) * 0.4 * linesP }}>
        {ICON_ORDER.map((_, i) => {
          const a = (i / N) * TAU - Math.PI / 2;
          const x = CX + Math.cos(a) * radius;
          const y = CY + Math.sin(a) * radius * 0.78;
          return <line key={i} x1={x} y1={y} x2={CX} y2={CY} stroke={L.gray} strokeWidth={2} strokeDasharray="4 7" strokeDashoffset={-frame * 1.2} />;
        })}
      </svg>

      {/* central Ares hub */}
      <div style={{ position: 'absolute', opacity: hubP, transform: `scale(${hubP * (1 + 0.06 * pulse)})` }}>
        <div style={{ position: 'absolute', inset: -28, borderRadius: '50%', border: `3px solid ${L.accent}`, opacity: pulse * 0.7, transform: `scale(${1 + pulse * 0.5})` }} />
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: '#fff',
            boxShadow: `0 0 0 2px ${L.line}, 0 24px 60px rgba(37,99,235,0.30)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Img src={staticFile('ares/ares-logo.png')} style={{ height: 96 }} />
        </div>
      </div>

      {/* the six tool tiles, converging + merging */}
      {ICON_ORDER.map((name, i) => {
        const a = (i / N) * TAU - Math.PI / 2;
        const x = Math.cos(a) * radius;
        const y = Math.sin(a) * radius * 0.78;
        const inP = interpolate(t, [i * 3, i * 3 + 12], [0, 1], { easing: ease, ...clamp });
        const sc = inP * (1 - 0.55 * conv); // stay readable while merging (1 → 0.45)
        const op = inP * (conv < 0.86 ? 1 : interpolate(conv, [0.86, 1], [1, 0], clamp));
        if (op <= 0.001) return null;
        return (
          <div
            key={name}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${sc})`,
              opacity: op,
            }}
          >
            <div style={{ width: 88, height: 88, borderRadius: 20, background: '#fff', boxShadow: '0 12px 26px rgba(11,16,32,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={name} size={46} color={L.ink} />
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export default ToolHub;
