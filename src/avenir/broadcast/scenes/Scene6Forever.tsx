import React from 'react';
import { AbsoluteFill, interpolate } from 'remotion';
import { ease, BB } from '../palette';
import { sora } from '../../tokens';
import BlurText from '../kit/BlurText';

/**
 * S7 — FOREVER (f360–444): "your launch" → "lasts forever" on light field.
 * Staggered text reveal, accent on "forever".
 * S8 — FEATURES (f444–510): Curved 3D features list scroll with cursor.
 */
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const FEATURES = [
  'Standard Slot · $200',
  'Priority Slot · $350',
  'Real-Time Telemetry',
  'Priority Amplification',
  'Template Production',
];

const Scene6Forever: React.FC<{ frame: number }> = ({ frame: f }) => {
  if (f < 356 || f > 518) return null;

  return (
    <AbsoluteFill>
      {/* S7: "your launch lasts forever" */}
      <BlurText
        text="your launch"
        frame={f}
        inAt={364}
        outAt={404}
        fontSize={110}
        color={BB.ink}
        weight={700}
        top="42%"
        emphasis={[]}
        accentMode="field"
        stagger={4}
      />
      <BlurText
        text="lasts forever."
        frame={f}
        inAt={386}
        outAt={426}
        fontSize={110}
        color={BB.ink}
        weight={700}
        top="58%"
        emphasis={['forever']}
        accentMode="field"
        stagger={4}
      />

      {/* S8: Curved 3D features list */}
      {f >= 440 && (() => {
        const listEnter = interpolate(f, [444, 460], [0, 1], { easing: ease, ...clamp });
        const listExit = interpolate(f, [502, 510], [0, 1], { easing: ease, ...clamp });
        const listOp = listEnter * (1 - listExit);

        // Cursor targets "Template Production" (index 4)
        const cursorP = interpolate(f, [468, 484], [0, 1], { easing: ease, ...clamp });
        const cursorClick = interpolate(f, [486, 488, 490], [1, 0.88, 1], clamp);
        const clickGlow = interpolate(f, [486, 492, 500], [0, 1, 0.5], clamp);

        return (
          <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: listOp }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, perspective: 900 }}>
              {FEATURES.map((feat, i) => {
                const fEnter = 448 + i * 6;
                const fP = interpolate(f, [fEnter, fEnter + 14], [0, 1], { easing: ease, ...clamp });
                const isTarget = i === 4;
                const selected = isTarget && f > 486;
                const rotX = -12 + i * 6;

                return (
                  <div
                    key={feat}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      padding: '18px 36px',
                      borderRadius: 12,
                      background: selected ? 'rgba(232,93,58,0.14)' : 'rgba(5,6,8,0.75)',
                      border: selected ? `2px solid ${BB.bloom}` : '2px solid rgba(255,255,255,0.06)',
                      boxShadow: selected ? `0 0 20px rgba(232,93,58,${0.15 + clickGlow * 0.2})` : '0 8px 30px rgba(0,0,0,0.3)',
                      opacity: fP,
                      transform: `translateY(${(1 - fP) * 18}px) perspective(900px) rotateX(${rotX * (1 - fP * 0.8)}deg)`,
                      minWidth: 480,
                    }}
                  >
                    {selected && (
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: BB.bloom, boxShadow: '0 0 8px rgba(232,93,58,0.6)', flexShrink: 0 }} />
                    )}
                    <span
                      style={{
                        fontFamily: sora,
                        fontWeight: 600,
                        fontSize: 28,
                        color: selected ? BB.bloom : '#E6EAF2',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {feat}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Cursor */}
            {cursorP > 0.01 && (
              <div
                style={{
                  position: 'absolute',
                  left: interpolate(cursorP, [0, 1], [1200, 980], clamp),
                  top: interpolate(cursorP, [0, 1], [700, 608], clamp),
                  transform: `scale(${cursorClick})`,
                  pointerEvents: 'none',
                  zIndex: 100,
                }}
              >
                <svg width={36} height={44} viewBox="0 0 24 28" fill="none">
                  <path d="M5 2L5 18L9.5 14.5L13 22L16 20.5L12.5 13L18 12L5 2Z" fill="white" stroke="#111" strokeWidth={1.5} strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

export default Scene6Forever;
