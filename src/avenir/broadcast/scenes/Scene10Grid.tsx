import React from 'react';
import { AbsoluteFill, interpolate } from 'remotion';
import { ease, BB } from '../palette';
import { sora, mono } from '../../tokens';

/**
 * S12 — SEASON GRID (f906–975):
 * Showcase of the permanent Season 01 archive grid (17 live launches).
 */
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const ORANGE = '#E85D3A';

type Card = { name: string; tag: string; active?: boolean };
const ARCHIVE_GRID: Card[] = [
  { name: 'Lumen', tag: 'Aired · Live', active: true },
  { name: 'Cargo', tag: 'Aired · Live' },
  { name: 'Orbit', tag: 'Aired · Live' },
  { name: 'Draft', tag: 'Aired · Live' },
  { name: 'Pulse FM', tag: 'Aired · Live' },
  { name: 'Forge', tag: 'Aired · Live' },
];

const Scene10Grid: React.FC<{ frame: number }> = ({ frame: f }) => {
  if (f < 900 || f > 980) return null;

  const enterP = interpolate(f, [906, 924], [0, 1], { easing: ease, ...clamp });
  const exitP = interpolate(f, [966, 975], [0, 1], { easing: ease, ...clamp });
  const op = enterP * (1 - exitP);

  const zoom = interpolate(f, [906, 950], [0.92, 1], { easing: ease, ...clamp });

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: op }}>
      {/* Header */}
      <div
        style={{
          position: 'absolute',
          top: '12%',
          fontFamily: mono,
          fontSize: 12,
          letterSpacing: '0.24em',
          color: BB.white,
          opacity: enterP,
          fontWeight: 700,
          textTransform: 'uppercase' as const,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: ORANGE, boxShadow: `0 0 8px ${ORANGE}` }} />
        Season 01 Archive
        <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>· 17 launches</span>
      </div>

      {/* Grid container */}
      <div
        style={{
          width: 900,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
          transform: `scale(${zoom})`,
          filter: `blur(${(1 - enterP) * 8}px)`,
        }}
      >
        {ARCHIVE_GRID.map((c, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          const cardEnter = 910 + (col * 4) + (row * 6);
          const cardP = interpolate(f, [cardEnter, cardEnter + 14], [0, 1], { easing: ease, ...clamp });

          return (
            <div
              key={c.name}
              style={{
                background: 'rgba(5, 6, 8, 0.82)',
                border: c.active ? `1px solid ${ORANGE}` : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 14,
                padding: '24px 28px',
                boxShadow: c.active
                  ? `0 20px 50px rgba(0,0,0,0.5), 0 0 24px rgba(232, 93, 58, 0.15)`
                  : '0 12px 30px rgba(0,0,0,0.4)',
                opacity: cardP,
                transform: `translateY(${(1 - cardP) * 16}px)`,
              }}
            >
              <div
                style={{
                  fontFamily: sora,
                  fontWeight: 700,
                  fontSize: 22,
                  color: c.active ? ORANGE : BB.white,
                  marginBottom: 6,
                }}
              >
                {c.name}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: c.active ? ORANGE : '#22c55e',
                    boxShadow: c.active ? `0 0 6px ${ORANGE}` : '0 0 6px #22c55e',
                  }}
                />
                <span
                  style={{
                    fontFamily: mono,
                    fontSize: 10,
                    letterSpacing: '0.14em',
                    color: 'rgba(255, 255, 255, 0.5)',
                    textTransform: 'uppercase' as const,
                  }}
                >
                  {c.tag}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export default Scene10Grid;
