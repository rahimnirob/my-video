import React from 'react';
import { AbsoluteFill, interpolate } from 'remotion';
import { ease } from '../palette';

/**
 * S9 — PRODUCTION (f510–660): Briefing form on left, draft video on right,
 * chat overlays showing collaborative edits. The "No video? We build it" beat.
 */
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const MONO = "'JetBrains Mono', 'Fira Code', monospace";
const ORANGE = '#E85D3A';

const CHAT_MESSAGES = [
  { from: 'Founder', msg: 'Emphasis on the terminal UI?', at: 560 },
  { from: 'Avenir', msg: 'Adding telemetry overlay.', at: 582 },
  { from: 'Avenir', msg: 'Draft v2 rendering now.', at: 608 },
];

const Scene7Production: React.FC<{ frame: number }> = ({ frame: f }) => {
  if (f < 506 || f > 668) return null;

  const enterP = interpolate(f, [510, 530], [0, 1], { easing: ease, ...clamp });
  const exitP = interpolate(f, [650, 660], [0, 1], { easing: ease, ...clamp });
  const op = enterP * (1 - exitP);

  // Zoom into the production workspace
  const zoom = interpolate(f, [510, 540], [0.88, 1], { easing: ease, ...clamp });

  // Caption
  const captionP = interpolate(f, [516, 530], [0, 1], { easing: ease, ...clamp });

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: op }}>
      {/* Title caption */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          opacity: captionP,
          fontFamily: MONO,
          fontSize: 13,
          letterSpacing: '0.24em',
          color: ORANGE,
          fontWeight: 700,
          textTransform: 'uppercase' as const,
        }}
      >
        ● TEMPLATE PRODUCTION
      </div>

      <div
        style={{
          display: 'flex',
          gap: 28,
          transform: `scale(${zoom})`,
          filter: `blur(${(1 - enterP) * 8}px)`,
        }}
      >
        {/* Left: Briefing form */}
        <div
          style={{
            width: 440,
            background: 'rgba(5,6,8,0.88)',
            border: '1px solid rgba(232,93,58,0.2)',
            borderRadius: 14,
            padding: '28px 28px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          }}
        >
          <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', color: ORANGE, fontWeight: 600, marginBottom: 20, textTransform: 'uppercase' as const }}>
            CREATIVE BRIEF
          </div>
          {['Product Name', 'One-Liner', 'Target Audience', 'Key Features', 'Production Style'].map((label, i) => {
            const fieldP = interpolate(f, [522 + i * 6, 534 + i * 6], [0, 1], { easing: ease, ...clamp });
            return (
              <div key={label} style={{ marginBottom: 14, opacity: fieldP }}>
                <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.14em', color: 'rgba(240,242,244,0.35)', textTransform: 'uppercase' as const, marginBottom: 5 }}>
                  {label}
                </div>
                <div style={{ height: label === 'Key Features' ? 48 : 32, borderRadius: 6, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }} />
              </div>
            );
          })}
          {/* Style picker */}
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            {['SIGNAL', 'CLARITY', 'EDGE', 'SEQUENCE'].map((s, i) => {
              const styleP = interpolate(f, [554 + i * 4, 562 + i * 4], [0, 1], { easing: ease, ...clamp });
              const isSelected = s === 'SIGNAL';
              return (
                <div
                  key={s}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 6,
                    fontSize: 9,
                    fontFamily: MONO,
                    letterSpacing: '0.12em',
                    fontWeight: 600,
                    opacity: styleP,
                    background: isSelected ? 'rgba(232,93,58,0.15)' : 'rgba(255,255,255,0.03)',
                    border: isSelected ? `1px solid ${ORANGE}` : '1px solid rgba(255,255,255,0.06)',
                    color: isSelected ? ORANGE : 'rgba(240,242,244,0.5)',
                  }}
                >
                  {s}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Draft video preview + chat */}
        <div
          style={{
            width: 540,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {/* Video preview card */}
          <div
            style={{
              flex: 1,
              background: 'rgba(5,6,8,0.88)',
              border: '1px solid rgba(232,93,58,0.2)',
              borderRadius: 14,
              padding: 16,
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', color: 'rgba(240,242,244,0.35)', fontWeight: 600, marginBottom: 10, textTransform: 'uppercase' as const }}>
              DRAFT PREVIEW
            </div>
            <div
              style={{
                flex: 1,
                borderRadius: 8,
                background: 'radial-gradient(ellipse at center, rgba(232,93,58,0.08), rgba(5,6,8,0.9))',
                border: '1px solid rgba(255,255,255,0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 180,
              }}
            >
              {/* Play button */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${ORANGE}, #C7472B)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 24px rgba(232,93,58,0.35)',
                }}
              >
                <svg width={22} height={22} viewBox="0 0 24 24" fill="none">
                  <path d="M8 5v14l11-7L8 5z" fill="white" />
                </svg>
              </div>
            </div>
          </div>

          {/* Chat messages */}
          <div
            style={{
              background: 'rgba(5,6,8,0.88)',
              border: '1px solid rgba(232,93,58,0.15)',
              borderRadius: 14,
              padding: '16px 20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            }}
          >
            {CHAT_MESSAGES.map((msg, i) => {
              const msgP = interpolate(f, [msg.at, msg.at + 14], [0, 1], { easing: ease, ...clamp });
              const isAvenir = msg.from === 'Avenir';
              return (
                <div
                  key={i}
                  style={{
                    opacity: msgP,
                    transform: `translateY(${(1 - msgP) * 10}px)`,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    marginBottom: i < CHAT_MESSAGES.length - 1 ? 12 : 0,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      marginTop: 6,
                      background: isAvenir ? ORANGE : '#8A95A5',
                      boxShadow: isAvenir ? '0 0 6px rgba(232,93,58,0.4)' : 'none',
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.14em', color: isAvenir ? ORANGE : '#8A95A5', fontWeight: 600, marginBottom: 2, textTransform: 'uppercase' as const }}>
                      {msg.from}
                    </div>
                    <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 13, color: '#E6EAF2', lineHeight: 1.4 }}>
                      {msg.msg}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default Scene7Production;
