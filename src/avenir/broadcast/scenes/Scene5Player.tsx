import React from 'react';
import { AbsoluteFill, interpolate, OffthreadVideo, staticFile, Easing } from 'remotion';
import { ease, BB } from '../palette';
import { sora } from '../../tokens';

/**
 * S6 — PLAYER SHOWCASE (f240–360)
 *
 * The live Billboard video card sweeps corner-to-corner with a 3D perspective tilt:
 *  ENTER (f240–f268): starts top-left — rotateY −42°, rotateX −18°, scale 0.5,
 *                     translateX −580, translateY −200. Elastic-eases to center flat.
 *  HOLD  (f268–f352): gentle breathing tilt (±1.8° oscillating rotateY). Video plays.
 *  EXIT  (f352–f362): mirrors entry — sweeps to bottom-right corner.
 *
 * Top 10% of video is clipped to remove the CapCut watermark.
 */
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const MONO  = "'JetBrains Mono', 'Fira Code', monospace";
const ORANGE = '#E85D3A';
const AMBER  = '#F0A868';
const RED    = '#ef4444';

const elastic = Easing.bezier(0.34, 1.32, 0.4, 1);
const sharp   = Easing.bezier(0.4, 0, 0.6, 1);

const ri = (frame: number, a: number, b: number, x: number, y: number, ez = ease) =>
  interpolate(frame, [a, b], [x, y], { easing: ez, ...clamp });

const Scene5Player: React.FC<{ frame: number }> = ({ frame: f }) => {
  if (f < 236 || f > 368) return null;

  // ── Corner-to-corner tilt sweep ────────────────────────────────────────────
  const enterP = ri(f, 240, 268, 0, 1, elastic);  // elastic overshoot entry
  const exitP  = ri(f, 352, 362, 0, 1, sharp);    // sharp exit

  // 3D transforms — top-left to center on entry, center to bottom-right on exit
  const tx = interpolate(enterP, [0, 1], [-580, 0], clamp) +
             interpolate(exitP,  [0, 1], [0,  580], clamp);
  const ty = interpolate(enterP, [0, 1], [-200, 0], clamp) +
             interpolate(exitP,  [0, 1], [0,  200], clamp);
  const ry = interpolate(enterP, [0, 1], [-42, 0], clamp) +
             interpolate(exitP,  [0, 1], [0,  42], clamp);
  const rx = interpolate(enterP, [0, 1], [-18, 0], clamp) +
             interpolate(exitP,  [0, 1], [0,  18], clamp);
  const scaleCard = interpolate(enterP, [0, 1], [0.5, 1], clamp) *
                    interpolate(exitP,  [0, 1], [1, 0.5], clamp);

  // Breathing tilt while held
  const holdF = Math.max(0, f - 268);
  const breatheRY = Math.sin((holdF / 84) * Math.PI * 3) * 1.8;

  // Blur — motion blur on sweep
  const sweepBlur = (1 - enterP) * 14 + exitP * 14;

  // Overall opacity
  const op = ri(f, 240, 250, 0, 1) * ri(f, 356, 362, 1, 0);

  // Shadow parallax with tilt angle
  const shadowX = (ry + breatheRY) * 4;
  const shadowY = rx * 3 + 32;

  // Telemetry strip entrance
  const telP = ri(f, 252, 268, 0, 1);

  // ON AIR pulse (2s = 60f cycle)
  const pulsePhase = ((f % 60) / 60) * Math.PI * 2;
  const pulseRing  = Math.max(0, Math.sin(pulsePhase)) * 4;
  const pulseOp    = 0.5 - 0.5 * Math.sin(pulsePhase);

  // Progress bar
  const progress = ri(f, 260, 350, 0, 100);

  // Spin for conic border
  const spinDeg = ((f - 240) / 30) * (360 / 8);

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        perspective: 1300,
        perspectiveOrigin: '50% 50%',
        opacity: op,
      }}
    >
      {/* ── Telemetry strip ─────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          opacity: telP,
          transform: `translateY(${(1 - telP) * 10}px)`,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 16,
          padding: '10px 18px',
          background: 'rgba(13,16,20,0.88)',
          border: '1px solid rgba(232,93,58,0.22)',
          borderRadius: 4,
          boxShadow: '0 4px 18px rgba(0,0,0,0.5), 0 0 18px rgba(232,93,58,0.08)',
          fontFamily: MONO,
          zIndex: 20,
        }}
      >
        {[
          { label: 'SEASON', value: '02' },
          { label: 'SLOTS',  value: '17/50' },
          { label: 'STATUS', value: 'LIVE', accent: true },
          { label: 'ARC',    value: '30·DAY' },
        ].map((cell, i) => (
          <React.Fragment key={cell.label}>
            {i > 0 && <span style={{ color: 'rgba(232,93,58,0.3)', fontSize: 10 }}>◆</span>}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 9, letterSpacing: '0.18em', color: '#3E4650', fontWeight: 600, textTransform: 'uppercase' as const }}>{cell.label}</span>
              {cell.accent && (
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: RED, boxShadow: `0 0 0 ${pulseRing}px rgba(239,68,68,${pulseOp})` }} />
              )}
              <span style={{ fontSize: 12, letterSpacing: '0.04em', color: cell.accent ? ORANGE : '#F0F2F4', fontWeight: 600 }}>{cell.value}</span>
              {cell.label === 'SLOTS' && (
                <span style={{ display: 'inline-flex', gap: 2, marginLeft: 4 }}>
                  {Array.from({ length: 10 }).map((_, j) => (
                    <span
                      key={j}
                      style={{
                        width: 5, height: 8, borderRadius: 1,
                        background: j < 3 ? `linear-gradient(180deg, ${ORANGE}, #C23B22)` : 'rgba(255,255,255,0.06)',
                        boxShadow: j < 3 ? '0 0 4px rgba(232,93,58,0.4)' : 'none',
                      }}
                    />
                  ))}
                </span>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* ── Video card — 3D tilt sweep ───────────────────────────────────────── */}
      <div
        style={{
          transform: `
            translate3d(${tx}px, ${ty}px, 0)
            rotateY(${ry + breatheRY}deg)
            rotateX(${rx}deg)
            scale(${scaleCard})
          `,
          transformOrigin: 'center center',
          filter: sweepBlur > 0.5 ? `blur(${sweepBlur}px)` : undefined,
          position: 'relative',
          willChange: 'transform',
        }}
      >
        {/* Parallax shadow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: `translate(${shadowX}px, ${shadowY}px)`,
            background: 'rgba(0,0,0,0.5)',
            borderRadius: 20,
            filter: `blur(${60 + Math.abs(ry) * 1.2}px)`,
            zIndex: -1,
            pointerEvents: 'none',
          }}
        />

        {/* Card */}
        <div
          style={{
            position: 'relative',
            width: 1100,
            height: Math.round(1100 * (9 / 21)),
            borderRadius: 14,
            overflow: 'visible',
          }}
        >
          {/* Rotating conic border — outer glow */}
          <div
            style={{
              position: 'absolute', inset: -6, borderRadius: 20,
              overflow: 'hidden', pointerEvents: 'none', zIndex: -1,
              filter: 'blur(8px)', opacity: 0.5,
            }}
          >
            <div
              style={{
                position: 'absolute', inset: '-50%',
                background: `conic-gradient(from ${spinDeg}deg, transparent 0%, rgba(232,93,58,0.4) 10%, rgba(240,168,104,0.3) 20%, transparent 35%, transparent 50%, rgba(232,93,58,0.35) 60%, rgba(240,168,104,0.3) 70%, transparent 85%)`,
              }}
            />
          </div>

          {/* Rotating conic border — inner ring */}
          <div
            style={{
              position: 'absolute', inset: -2, borderRadius: 16,
              overflow: 'hidden', pointerEvents: 'none', zIndex: 0,
            }}
          >
            <div
              style={{
                position: 'absolute', inset: '-50%',
                background: `conic-gradient(from ${spinDeg}deg, transparent 0%, ${ORANGE} 8%, ${AMBER} 16%, ${ORANGE} 24%, transparent 36%, transparent 50%, rgba(232,93,58,0.7) 58%, ${AMBER} 66%, rgba(232,93,58,0.7) 74%, transparent 86%)`,
              }}
            />
            <div style={{ position: 'absolute', inset: 2, borderRadius: 14, background: 'rgba(5,6,8,0.55)' }} />
          </div>

          {/* Video area */}
          <div
            style={{
              position: 'absolute', inset: 0, borderRadius: 14,
              overflow: 'hidden', background: '#050608', zIndex: 1,
            }}
          >
            {/* Video — shifted up to crop watermark from top */}
            <OffthreadVideo
              src={staticFile('billboard broadcast (1).mp4')}
              style={{
                position: 'absolute',
                width: '100%',
                height: '115%',         // taller than container
                top: '-10%',            // push up — hides top ~10% (watermark)
                left: 0,
                objectFit: 'cover',
                objectPosition: 'center bottom',
                opacity: 0.9,
              }}
              startFrom={4}
              muted
            />

            {/* Cinematic vignette */}
            <div
              style={{
                position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none',
                background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 20%, rgba(5,6,8,0.6) 100%)',
              }}
            />

            {/* ON AIR bar */}
            <div
              style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px 16px',
                background: 'linear-gradient(180deg, rgba(5,6,8,0.7) 0%, transparent 100%)',
                zIndex: 20,
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                <span
                  style={{
                    width: 6, height: 6, borderRadius: '50%', background: RED,
                    boxShadow: `0 0 ${10}px rgba(255,0,80,${0.4 + 0.5 * Math.sin(pulsePhase)})`,
                  }}
                />
                <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.12em', color: 'rgba(239,68,68,0.8)', textTransform: 'uppercase' as const, fontWeight: 600 }}>LIVE</span>
              </span>
              <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.15em', color: 'rgba(230,234,242,0.2)', textTransform: 'uppercase' as const }}>#3 of 17 · S02 · JUN 2026</span>
            </div>

            {/* Product info card */}
            <div
              style={{
                position: 'absolute', bottom: 48, left: 16, zIndex: 10,
                padding: '12px 16px', borderRadius: 8,
                background: 'rgba(5,6,8,0.7)', border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: ORANGE, boxShadow: '0 0 6px rgba(232,93,58,0.5)' }} />
                <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', color: ORANGE, textTransform: 'uppercase' as const, fontWeight: 600 }}>NOW BROADCASTING</span>
              </div>
              <div style={{ fontFamily: sora, fontWeight: 700, fontSize: 16, color: '#E6EAF2' }}>Avenir Billboard</div>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 12, color: '#8F96A3', marginTop: 2 }}>Launch once. Stay visible forever.</div>
            </div>
          </div>

          {/* Progress bar */}
          <div
            style={{
              position: 'absolute', bottom: -2, left: 0, right: 0,
              height: 3, background: 'rgba(255,255,255,0.04)',
              borderRadius: 999, zIndex: 2, overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%', width: `${progress}%`,
                background: `linear-gradient(90deg, ${ORANGE}, ${AMBER})`,
                boxShadow: `0 2px 8px rgba(232,93,58,0.3)`,
                borderRadius: 999, position: 'relative',
              }}
            >
              <span style={{ position: 'absolute', right: -1, top: '50%', transform: 'translateY(-50%)', width: 6, height: 6, borderRadius: '50%', background: AMBER, boxShadow: '0 0 8px rgba(240,168,104,0.6)' }} />
            </div>
          </div>

          {/* Orange accent line at bottom edge */}
          <div
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: 2, zIndex: 10,
              background: `linear-gradient(90deg, transparent 0%, ${BB.bloom} 25%, ${AMBER} 55%, ${BB.bloom} 80%, transparent 100%)`,
              opacity: 0.65,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default Scene5Player;
