import React from 'react';
import {
  AbsoluteFill,
  OffthreadVideo,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import { ease, bbFill } from './palette';
import { mono, sora, manrope } from '../tokens';
import BlurText from './kit/BlurText';
import FitSentence from './kit/FitSentence';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

// ── Avenir Billboard canonical colors ────────────────────────────────────────
const BB_ORANGE    = '#E85D3A'; // Broadcast Orange (primary)
const BB_AMBER     = '#F0A868'; // Warm amber-orange (secondary)
const BB_RED_DEPTH = '#C23B22'; // Deep red-orange
const LIVE_RED     = '#ef4444'; // ON AIR pulse dot

// ── Text tokens ───────────────────────────────────────────────────────────────
const TEXT_HI = '#F0F2F4';
const TEXT_MD = '#8A95A5';
const TEXT_LO = '#3E4650';

const BB_GRADIENT = `linear-gradient(90deg, ${BB_ORANGE}, ${BB_AMBER})`;

// ── Helper: frame interpolation ──────────────────────────────────────────────
const ri = (
  f: number,
  a: number,
  b: number,
  x: number,
  y: number,
  ez: (t: number) => number = ease,
) => interpolate(f, [a, b], [x, y], { easing: ez, ...clamp });

// ── Timeline (1000 frames ≈ 33.3 s @ 30fps) ──────────────────────────────────
// S1 Hook     : f0  – f160  (two kinetic beats)
// S2 Intro    : f155 – f268 (Introducing + gradient)
// S3 Tilt     : f260 – f425 (slow 3-D rotating player, 5.5 s)
// S4 Proof    : f415 – f530 (live card + progress)
// S5 Archive  : f520 – f630 (permanent archive grid)
// S6 Features : f620 – f790 (includes list + player, slow shimmer)
// S7 Forever  : f780 – f880 (swipe-up headline)
// S8 Production: f870 – f958 (split panel)
// S9 CTA      : f950 – f1000 (word-by-word swipe-up)

export const TOTAL_FRAMES = 1000;

const BillBoardStoryboard: React.FC = () => {
  const f = useCurrentFrame();

  // ── S2: Introducing ─────────────────────────────────────────────────────────
  const introEnter = ri(f, 155, 178, 0, 1);
  const introExit  = ri(f, 248, 268, 0, 1);
  const introOp    = introEnter * (1 - introExit);
  // Exit: aperture-close — scale down + blur
  const introScale = interpolate(introExit, [0, 1], [1, 0.92], clamp);
  const introBlur  = introExit * 10;

  // ── S3: Tilt Player ──────────────────────────────────────────────────────────
  const tiltEnter = ri(f, 260, 290, 0, 1);
  const tiltExit  = ri(f, 408, 425, 0, 1);
  const tiltOp    = tiltEnter * (1 - tiltExit);
  // Slow sinusoidal tilt (one full oscillation over 120f ≈ 4 s)
  const holdF  = Math.max(0, f - 292);
  const tiltRY = Math.sin((holdF / 120) * Math.PI * 2) * 8;   // ±8° Y
  const tiltRX = Math.cos((holdF / 160) * Math.PI)     * 3;   // ±3° X
  const tiltSpinDeg = ((f - 260) / 30) * (360 / 8);
  // Exit: slide left
  const tiltExitX = ri(f, 408, 425, 0, -200);

  // ── S4: Proof card ───────────────────────────────────────────────────────────
  const proofEnter   = ri(f, 415, 440, 0, 1);
  const proofExit    = ri(f, 515, 530, 0, 1);
  const proofOp      = proofEnter * (1 - proofExit);
  const proofZoom    = ri(f, 415, 440, 0.96, 1);
  const proofProgress = ri(f, 440, 530, 18, 92);
  const proofPulse   = Math.max(0, Math.sin(((f - 415) / 30) * Math.PI));
  // Exit: slide down
  const proofExitY   = ri(f, 515, 530, 0, 60);

  // ── S5: Archive grid ─────────────────────────────────────────────────────────
  const archEnter = ri(f, 520, 545, 0, 1);
  const archExit  = ri(f, 615, 630, 0, 1);
  const archOp    = archEnter * (1 - archExit);
  const archScale = ri(f, 520, 545, 0.94, 1);
  const archBlur  = (1 - archEnter) * 8 + archExit * 8;
  // Exit: slide left
  const archExitX = ri(f, 615, 630, 0, -120);

  // ── S6: Features / Includes ──────────────────────────────────────────────────
  const featEnter  = ri(f, 620, 645, 0, 1);
  const featExit   = ri(f, 772, 790, 0, 1);
  const featOp     = featEnter * (1 - featExit);
  const featZoom   = ri(f, 620, 645, 0.92, 1);
  const playerEnter = ri(f, 650, 695, 0, 1);
  const playerOp   = playerEnter * (1 - featExit);
  const featProgress = ri(f, 680, 785, 0, 100);
  const spinDeg    = ((f - 620) / 30) * (360 / 8);
  // Slow gradient shimmer: background-position animates over 200 frames
  const shimmerX   = ri(f, 620, 820, 0, -200);
  // Exit: slide up
  const featExitY  = ri(f, 772, 790, 0, -80);

  // ── S7: Forever ──────────────────────────────────────────────────────────────
  const foreverEnter     = ri(f, 780, 800, 0, 1);
  const foreverExit      = ri(f, 865, 880, 0, 1);
  const foreverOp        = foreverEnter * (1 - foreverExit);
  const foreverScale     = ri(f, 780, 800, 0.94, 1);
  // Exit: scale up (camera pull-back)
  const foreverExitScale = ri(f, 865, 880, 1, 1.06);
  // Swipe-up per line
  const fLine1 = ri(f, 782, 800, 0, 1);
  const fLine2 = ri(f, 797, 816, 0, 1);

  // ── S8: Production ───────────────────────────────────────────────────────────
  const prodEnter = ri(f, 870, 892, 0, 1);
  const prodExit  = ri(f, 942, 958, 0, 1);
  const prodOp    = prodEnter * (1 - prodExit);
  // Exit: slide right
  const prodExitX = ri(f, 942, 958, 0, 120);

  // ── S9: CTA ──────────────────────────────────────────────────────────────────
  const ctaEnter = ri(f, 950, 974, 0, 1);
  const ctaOp    = ctaEnter;
  // Swipe-up per line
  const ctaLine1 = ri(f, 952, 972, 0, 1);
  const ctaLine2 = ri(f, 964, 984, 0, 1);
  const ctaLine3 = ri(f, 976, 996, 0, 1);
  const ctaBadge = ri(f, 990, 1000, 0, 1);

  const productionPoints = [
    'Video production support',
    'Ready-to-broadcast assets',
    'Launch-ready motion delivery',
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#020304', overflow: 'hidden', fontFamily: sora }}>

      {/* ── Dark void with subtle persistent orange bloom ─────────────────── */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse 80% 55% at 50% 50%, rgba(232,93,58,0.07) 0%, transparent 68%)',
          pointerEvents: 'none',
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          S1 — HOOK  (two kinetic beats using kit components)
          Beat 1: FitSentence — the big launch statement
          Beat 2: BlurText   — the painful truth
      ═══════════════════════════════════════════════════════════════════ */}

      {/* Beat 1: "You launched on Product Hunt." — fit-to-frame zoom-out */}
      <FitSentence
        text="You launched on Product Hunt."
        startFrame={2}
        accentWord="Hunt"
        outAt={90}
        maxSize={300}
        minSize={84}
        onBloom={false}
        color={TEXT_HI}
      />

      {/* Beat 2: "Nobody came back." — blur word-by-word, "back" gradient */}
      <BlurText
        text="Nobody came back."
        frame={f}
        inAt={100}
        outAt={148}
        inDur={14}
        stagger={6}
        fontSize={112}
        color={TEXT_HI}
        weight={800}
        emphasis={['back.']}
        accentMode="field"
      />

      {/* ═══════════════════════════════════════════════════════════════════
          S2 — INTRODUCING  (gradient on product name, sub with italic fill)
      ═══════════════════════════════════════════════════════════════════ */}
      {introOp > 0.001 && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              opacity: introOp,
              transform: `scale(${introScale})`,
              filter: `blur(${introBlur}px)`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 20,
              textAlign: 'center',
              padding: '0 80px',
              overflow: 'visible',
            }}
          >
            {/* "Introducing" label */}
            <div
              style={{
                fontFamily: mono,
                fontSize: 13,
                letterSpacing: '0.28em',
                textTransform: 'uppercase' as const,
                color: BB_ORANGE,
                fontWeight: 700,
                opacity: ri(f, 158, 172, 0, 1),
                transform: `translateY(${ri(f, 158, 172, 12, 0)}px)`,
              }}
            >
              Introducing
            </div>

            {/* "Avenir Billboard" — flowing gradient fill */}
            <div
              style={{
                fontFamily: sora,
                fontWeight: 900,
                fontSize: 114,
                letterSpacing: '-0.04em',
                lineHeight: 1.12,
                overflow: 'visible',
                padding: '0 48px',
                opacity: ri(f, 168, 186, 0, 1),
                transform: `translateY(${ri(f, 168, 186, 28, 0)}px)`,
                ...bbFill(f, false),
              }}
            >
              Avenir Billboard
            </div>

            {/* Subtitle */}
            <div
              style={{
                fontFamily: manrope,
                fontSize: 22,
                color: TEXT_MD,
                letterSpacing: '0.01em',
                lineHeight: 1.55,
                maxWidth: 660,
                opacity: ri(f, 194, 212, 0, 1),
                transform: `translateY(${ri(f, 194, 212, 14, 0)}px)`,
              }}
            >
              A live broadcast surface that keeps your launch{' '}
              <span
                style={{
                  overflow: 'visible',
                  padding: '0 4px',
                  fontStyle: 'italic',
                  ...bbFill(f, false),
                }}
              >
                visible
              </span>
              {' '}long after launch day.
            </div>

            {/* Accent rule */}
            <div
              style={{
                width: 100,
                height: 2,
                borderRadius: 999,
                background: BB_GRADIENT,
                opacity: ri(f, 214, 228, 0, 0.7),
              }}
            />
          </div>
        </AbsoluteFill>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          S3 — TILT PLAYER  (slow 3-D oscillation, 5.5 s hold)
          perspective: 1400px  rotateY ±8°  rotateX ±3°
      ═══════════════════════════════════════════════════════════════════ */}
      {tiltOp > 0.001 && (
        <AbsoluteFill
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            perspective: 1400,
            perspectiveOrigin: '50% 50%',
            opacity: tiltOp,
          }}
        >
          {/* Telemetry strip */}
          <div
            style={{
              position: 'absolute',
              top: '9%',
              opacity: ri(f, 272, 292, 0, 1),
              transform: `translateY(${ri(f, 272, 292, 10, 0)}px)`,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 16,
              padding: '10px 20px',
              background: 'rgba(12,15,20,0.92)',
              border: `1px solid rgba(232,93,58,0.22)`,
              borderRadius: 4,
              fontFamily: mono,
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
                {i > 0 && (
                  <span style={{ color: 'rgba(232,93,58,0.3)', fontSize: 10 }}>◆</span>
                )}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      fontSize: 9,
                      letterSpacing: '0.18em',
                      color: TEXT_LO,
                      fontWeight: 600,
                      textTransform: 'uppercase' as const,
                    }}
                  >
                    {cell.label}
                  </span>
                  {cell.accent && (
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: LIVE_RED,
                        boxShadow: '0 0 8px rgba(239,68,68,0.7)',
                      }}
                    />
                  )}
                  <span
                    style={{
                      fontSize: 12,
                      letterSpacing: '0.04em',
                      color: cell.accent ? BB_ORANGE : TEXT_HI,
                      fontWeight: 600,
                    }}
                  >
                    {cell.value}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* 3-D tilting card wrapper */}
          <div
            style={{
              transform: `
                translate3d(${tiltExitX}px, 0, 0)
                rotateY(${tiltRY}deg)
                rotateX(${tiltRX}deg)
              `,
              transformOrigin: 'center center',
              willChange: 'transform',
              position: 'relative',
            }}
          >
            {/* Parallax shadow */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                transform: `translate(${tiltRY * 4}px, ${tiltRX * 3 + 36}px)`,
                background: 'rgba(0,0,0,0.5)',
                borderRadius: 22,
                filter: `blur(${62 + Math.abs(tiltRY) * 1.5}px)`,
                zIndex: -1,
                pointerEvents: 'none',
              }}
            />

            {/* Card shell */}
            <div
              style={{
                position: 'relative',
                width: 1100,
                height: Math.round(1100 * (9 / 21)),
                borderRadius: 16,
                overflow: 'visible',
              }}
            >
              {/* Outer conic bloom */}
              <div
                style={{
                  position: 'absolute',
                  inset: -10,
                  borderRadius: 26,
                  overflow: 'hidden',
                  pointerEvents: 'none',
                  zIndex: -1,
                  filter: 'blur(12px)',
                  opacity: 0.55,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: '-50%',
                    background: `conic-gradient(from ${tiltSpinDeg}deg,
                      transparent 0%,
                      rgba(232,93,58,0.42) 10%,
                      rgba(240,168,104,0.36) 20%,
                      transparent 38%,
                      transparent 52%,
                      rgba(232,93,58,0.28) 62%,
                      transparent 82%)`,
                  }}
                />
              </div>

              {/* Inner conic ring */}
              <div
                style={{
                  position: 'absolute',
                  inset: -2,
                  borderRadius: 18,
                  overflow: 'hidden',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: '-50%',
                    background: `conic-gradient(from ${tiltSpinDeg}deg,
                      transparent 0%,
                      ${BB_ORANGE}    8%,
                      ${BB_AMBER}    16%,
                      ${BB_RED_DEPTH} 24%,
                      transparent 42%,
                      transparent 62%,
                      rgba(232,93,58,0.62) 74%,
                      transparent 92%)`,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 2,
                    borderRadius: 16,
                    background: 'rgba(5,6,8,0.65)',
                  }}
                />
              </div>

              {/* Video content */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 14,
                  overflow: 'hidden',
                  background: '#090B0D',
                  zIndex: 1,
                }}
              >
                <OffthreadVideo
                  src={staticFile('billboard/lv_0_20260624023044.mp4')}
                  style={{
                    position: 'absolute',
                    inset: '-10% 0 0 0',
                    width: '100%',
                    height: '120%',
                    objectFit: 'cover',
                    opacity: 0.88,
                  }}
                  startFrom={4}
                  muted
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'radial-gradient(ellipse at center, transparent 20%, rgba(6,7,9,0.55) 100%)',
                  }}
                />

                {/* HUD top */}
                <div
                  style={{
                    position: 'absolute',
                    top: 20,
                    left: 24,
                    right: 24,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 2,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: LIVE_RED,
                        boxShadow: '0 0 16px rgba(239,68,68,0.8)',
                      }}
                    />
                    <div
                      style={{
                        fontFamily: mono,
                        fontSize: 12,
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase' as const,
                        color: 'rgba(255,249,244,0.88)',
                        fontWeight: 700,
                      }}
                    >
                      On Air • Billboard
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: mono,
                      fontSize: 10,
                      letterSpacing: '0.18em',
                      color: 'rgba(255,249,244,0.6)',
                      textTransform: 'uppercase' as const,
                    }}
                  >
                    S02 · Slot 14 / 50
                  </div>
                </div>

                {/* Progress bar */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 24,
                    left: 24,
                    right: 24,
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      height: 6,
                      borderRadius: 999,
                      background: 'rgba(255,255,255,0.06)',
                      marginBottom: 8,
                    }}
                  >
                    <div
                      style={{
                        width: `${ri(f, 300, 408, 18, 74)}%`,
                        height: '100%',
                        borderRadius: 999,
                        background: BB_GRADIENT,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontFamily: mono,
                      fontSize: 10,
                      letterSpacing: '0.16em',
                      color: 'rgba(255,249,244,0.55)',
                      textTransform: 'uppercase' as const,
                    }}
                  >
                    <span>Billboard Live</span>
                    <span>{Math.floor(ri(f, 300, 408, 18, 74))}% broadcast</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          S4 — PROOF / LIVE CARD  (exit: slide down)
      ═══════════════════════════════════════════════════════════════════ */}
      {proofOp > 0.001 && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: proofOp }}>
          <div
            style={{
              width: '82%',
              maxWidth: 1480,
              transform: `scale(${proofZoom}) translateY(${proofExitY}px)`,
            }}
          >
            <div
              style={{
                position: 'relative',
                height: 680,
                borderRadius: 34,
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(7,8,10,0.98), rgba(15,16,18,0.92))',
                border: '1px solid rgba(232,93,58,0.15)',
                boxShadow: '0 42px 140px rgba(0,0,0,0.42)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(circle at 44% 40%, rgba(232,93,58,0.14), transparent 36%)',
                }}
              />

              {/* Header */}
              <div
                style={{
                  position: 'absolute',
                  top: 30,
                  left: 34,
                  right: 34,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  zIndex: 2,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: LIVE_RED,
                      boxShadow: '0 0 16px rgba(239,68,68,0.75)',
                    }}
                  />
                  <div
                    style={{
                      fontFamily: mono,
                      fontSize: 12,
                      letterSpacing: '0.24em',
                      textTransform: 'uppercase' as const,
                      color: 'rgba(255,249,244,0.86)',
                      fontWeight: 700,
                    }}
                  >
                    LIVE • Billboard
                  </div>
                </div>
                <div
                  style={{
                    padding: '10px 16px',
                    borderRadius: 999,
                    background: 'rgba(18,18,22,0.88)',
                    border: '1px solid rgba(232,93,58,0.22)',
                    fontFamily: mono,
                    fontSize: 11,
                    letterSpacing: '0.18em',
                    color: TEXT_HI,
                    textTransform: 'uppercase' as const,
                  }}
                >
                  Signal stable
                </div>
              </div>

              {/* Info card */}
              <div
                style={{
                  position: 'absolute',
                  left: 40,
                  top: 120,
                  width: 440,
                  padding: '24px 28px',
                  borderRadius: 24,
                  background: 'rgba(10,10,12,0.92)',
                  border: '1px solid rgba(232,93,58,0.22)',
                  boxShadow: '0 28px 90px rgba(232,93,58,0.18)',
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    fontFamily: mono,
                    fontSize: 11,
                    letterSpacing: '0.24em',
                    color: BB_ORANGE,
                    textTransform: 'uppercase' as const,
                    fontWeight: 700,
                    marginBottom: 12,
                  }}
                >
                  Now broadcasting
                </div>
                <div
                  style={{
                    fontFamily: sora,
                    fontWeight: 800,
                    fontSize: 48,
                    lineHeight: 1.1,
                    letterSpacing: '-0.04em',
                    overflow: 'visible',
                    padding: '0 8px 0 0',
                    ...bbFill(f, false),
                  }}
                >
                  Avenir Billboard
                </div>
                <div
                  style={{
                    fontFamily: manrope,
                    fontSize: 13,
                    color: 'rgba(245,239,234,0.72)',
                    marginTop: 10,
                    maxWidth: 380,
                    lineHeight: 1.55,
                  }}
                >
                  A broadcast surface that keeps your launch visible while every other feed burns out.
                </div>
                <div style={{ marginTop: 22 }}>
                  <div
                    style={{
                      height: 10,
                      borderRadius: 999,
                      background: 'rgba(255,255,255,0.04)',
                    }}
                  >
                    <div
                      style={{
                        width: `${proofProgress}%`,
                        height: '100%',
                        borderRadius: 999,
                        background: BB_GRADIENT,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontFamily: mono,
                      fontSize: 10,
                      letterSpacing: '0.2em',
                      color: 'rgba(255,249,244,0.55)',
                      textTransform: 'uppercase' as const,
                    }}
                  >
                    <span>07:14 / 12:00</span>
                    <span>{Math.floor(proofProgress)}% live</span>
                  </div>
                </div>
              </div>

              {/* Video panel */}
              <div
                style={{
                  position: 'absolute',
                  inset: '152px 38px 38px 38px',
                  borderRadius: 24,
                  overflow: 'hidden',
                  background: 'rgba(5,6,8,0.94)',
                  border: '1px solid rgba(232,93,58,0.18)',
                }}
              >
                <OffthreadVideo
                  src={staticFile('billboard/lv_0_20260624023044.mp4')}
                  style={{
                    position: 'absolute',
                    inset: '-10% 0 0 0',
                    width: '100%',
                    height: '120%',
                    objectFit: 'cover',
                    opacity: 0.85,
                  }}
                  startFrom={4}
                  muted
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'radial-gradient(ellipse at center, transparent 18%, rgba(6,7,9,0.54) 100%)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: 28,
                    bottom: 24,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: LIVE_RED,
                      boxShadow: `0 0 ${14 + proofPulse * 14}px rgba(239,68,68,${0.4 + proofPulse * 0.3})`,
                    }}
                  />
                  <div
                    style={{
                      fontFamily: mono,
                      fontSize: 11,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase' as const,
                      color: 'rgba(255,249,244,0.82)',
                    }}
                  >
                    Live playback
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          S5 — ARCHIVE GRID  (swipe-up cards, exit: slide left)
      ═══════════════════════════════════════════════════════════════════ */}
      {archOp > 0.001 && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: archOp }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 28,
              transform: `scale(${archScale}) translateX(${archExitX}px)`,
              filter: `blur(${archBlur}px)`,
            }}
          >
            {/* Title */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <div
                style={{
                  fontFamily: mono,
                  fontSize: 12,
                  letterSpacing: '0.26em',
                  textTransform: 'uppercase' as const,
                  color: BB_ORANGE,
                  fontWeight: 700,
                  opacity: ri(f, 523, 538, 0, 1),
                  transform: `translateY(${ri(f, 523, 538, 14, 0)}px)`,
                }}
              >
                Permanent archive
              </div>
              <div
                style={{
                  fontFamily: sora,
                  fontWeight: 800,
                  fontSize: 72,
                  lineHeight: 1.15,
                  letterSpacing: '-0.03em',
                  color: TEXT_HI,
                  textAlign: 'center',
                  overflow: 'visible',
                  padding: '0 48px',
                  opacity: ri(f, 532, 552, 0, 1),
                  transform: `translateY(${ri(f, 532, 552, 22, 0)}px)`,
                }}
              >
                Your slot lives here.
              </div>
            </div>

            {/* Archive cards — staggered swipe-up entrance */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
                gap: 18,
                width: '84%',
                maxWidth: 1300,
              }}
            >
              {[
                { name: 'Ares OS',   category: 'SYSTEMS',     age: '14d ago'  },
                { name: 'Ella AI',   category: 'PRODUCTIVITY', age: '8d ago'   },
                { name: 'LumeX',     category: 'VIDEO STAGE',  age: 'Live now', isFeatured: true },
                { name: 'Pulse',     category: 'MARKETS',      age: '22d ago'  },
                { name: 'Sentinel',  category: 'SECURITY',     age: '30d ago'  },
              ].map((item, index) => {
                const isFeatured = !!item.isFeatured;
                const cardP = ri(f, 544 + index * 16, 570 + index * 16, 0, 1);
                return (
                  <div
                    key={item.name}
                    style={{
                      minHeight: 180,
                      borderRadius: 24,
                      background: isFeatured
                        ? 'rgba(232,93,58,0.08)'
                        : 'rgba(8,10,13,0.85)',
                      border: isFeatured
                        ? '1px solid rgba(232,93,58,0.32)'
                        : '1px solid rgba(255,255,255,0.05)',
                      boxShadow: isFeatured
                        ? '0 20px 70px rgba(232,93,58,0.18)'
                        : '0 18px 42px rgba(0,0,0,0.18)',
                      padding: '24px 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      opacity: cardP,
                      transform: `translateY(${(1 - cardP) * 28}px)`,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: mono,
                          fontSize: 9,
                          letterSpacing: '0.18em',
                          color: isFeatured ? BB_ORANGE : TEXT_LO,
                          fontWeight: 700,
                          marginBottom: 8,
                        }}
                      >
                        {item.category}
                      </div>
                      <div
                        style={{
                          fontFamily: sora,
                          fontSize: 20,
                          fontWeight: 800,
                          color: TEXT_HI,
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {item.name}
                      </div>
                      <div
                        style={{
                          fontFamily: manrope,
                          fontSize: 11,
                          color: TEXT_MD,
                          marginTop: 6,
                        }}
                      >
                        Broadcast Slot
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 18,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: mono,
                          fontSize: 10,
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase' as const,
                          color: isFeatured ? BB_AMBER : 'rgba(255,255,255,0.45)',
                        }}
                      >
                        {item.age}
                      </span>
                      {isFeatured ? (
                        <span
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            background: LIVE_RED,
                            boxShadow: '0 0 12px rgba(239,68,68,0.7)',
                          }}
                        />
                      ) : (
                        <span
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.12)',
                          }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          S6 — FEATURES / INCLUDES  (slow shimmer, exit: slide up)
      ═══════════════════════════════════════════════════════════════════ */}
      {featOp > 0.001 && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: featOp }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: 34,
              transform: `scale(${featZoom}) translateY(${featExitY}px)`,
              filter: `blur(${(1 - featEnter) * 10}px)`,
            }}
          >
            {/* Features list card */}
            <div
              style={{
                flex: '0 0 520px',
                background: 'rgba(8,10,13,0.95)',
                border: '1px solid rgba(232,93,58,0.2)',
                borderRadius: 24,
                padding: '36px 34px',
                boxShadow: '0 36px 110px rgba(0,0,0,0.34)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Slow animated shimmer overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 24,
                  background: `linear-gradient(135deg,
                    transparent 0%,
                    rgba(232,93,58,0.05) 40%,
                    rgba(240,168,104,0.08) 55%,
                    transparent 80%)`,
                  backgroundSize: '300% 100%',
                  backgroundPosition: `${shimmerX}% center`,
                  pointerEvents: 'none',
                }}
              />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div
                  style={{
                    fontFamily: mono,
                    fontSize: 11,
                    letterSpacing: '0.26em',
                    textTransform: 'uppercase' as const,
                    color: BB_ORANGE,
                    fontWeight: 700,
                    marginBottom: 26,
                  }}
                >
                  Billboard includes
                </div>

                <div style={{ display: 'grid', gap: 24 }}>
                  {[
                    '30-day broadcast rotation',
                    'Permanent launch archive',
                    'Priority visibility placement',
                    'Real-time signal telemetry',
                  ].map((line, index) => {
                    const lineP = ri(f, 632 + index * 22, 668 + index * 22, 0, 1);
                    return (
                      <div
                        key={line}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 16,
                          opacity: lineP,
                          transform: `translateY(${(1 - lineP) * 24}px)`,
                        }}
                      >
                        <div
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            background: BB_ORANGE,
                            boxShadow: `0 0 ${8 + lineP * 10}px rgba(232,93,58,${0.3 + lineP * 0.3})`,
                            flexShrink: 0,
                          }}
                        />
                        <div
                          style={{
                            fontFamily: sora,
                            fontSize: 22,
                            lineHeight: 1.25,
                            fontWeight: 700,
                            color: TEXT_HI,
                          }}
                        >
                          {line}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Player panel */}
            <div
              style={{
                position: 'relative',
                width: 760,
                minHeight: 430,
                opacity: playerOp,
                transform: `translateX(${(1 - playerEnter) * 40}px) scale(${0.92 + playerEnter * 0.08})`,
              }}
            >
              {/* Outer bloom */}
              <div
                style={{
                  position: 'absolute',
                  inset: -8,
                  borderRadius: 28,
                  overflow: 'hidden',
                  pointerEvents: 'none',
                  zIndex: -1,
                  filter: 'blur(12px)',
                  opacity: 0.5,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: '-50%',
                    background: `conic-gradient(from ${spinDeg}deg,
                      transparent 0%, rgba(232,93,58,0.35) 12%,
                      rgba(194,59,34,0.3) 24%, transparent 40%,
                      rgba(232,93,58,0.2) 58%, transparent 72%)`,
                  }}
                />
              </div>

              {/* Inner ring */}
              <div
                style={{
                  position: 'absolute',
                  inset: -2,
                  borderRadius: 24,
                  overflow: 'hidden',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: '-50%',
                    background: `conic-gradient(from ${spinDeg}deg,
                      transparent 0%, ${BB_ORANGE} 10%, ${BB_RED_DEPTH} 18%,
                      rgba(232,93,58,0.72) 36%, transparent 48%,
                      transparent 60%, rgba(232,93,58,0.44) 74%, transparent 92%)`,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 2,
                    borderRadius: 22,
                    background: 'rgba(6,8,10,0.92)',
                  }}
                />
              </div>

              {/* Video */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 22,
                  overflow: 'hidden',
                  background: '#090B0D',
                  zIndex: 1,
                }}
              >
                <OffthreadVideo
                  src={staticFile('billboard/lv_0_20260624023044.mp4')}
                  style={{
                    position: 'absolute',
                    inset: '-10% 0 0 0',
                    width: '100%',
                    height: '120%',
                    objectFit: 'cover',
                    opacity: 0.86,
                  }}
                  startFrom={4}
                  muted
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'radial-gradient(ellipse at center, transparent 22%, rgba(6,7,9,0.56) 100%)',
                  }}
                />

                {/* Top HUD */}
                <div
                  style={{
                    position: 'absolute',
                    left: 24,
                    top: 24,
                    right: 24,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 2,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: LIVE_RED,
                        boxShadow: '0 0 16px rgba(239,68,68,0.75)',
                      }}
                    />
                    <div
                      style={{
                        fontFamily: mono,
                        fontSize: 11,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase' as const,
                        color: 'rgba(255,249,244,0.85)',
                        fontWeight: 700,
                      }}
                    >
                      Playing live
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: mono,
                      fontSize: 10,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase' as const,
                      color: 'rgba(255,249,244,0.66)',
                    }}
                  >
                    01:26 / 05:00
                  </div>
                </div>

                {/* Progress */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 36,
                    left: 24,
                    right: 24,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      width: '76%',
                      height: 10,
                      borderRadius: 999,
                      background: 'rgba(255,255,255,0.06)',
                    }}
                  >
                    <div
                      style={{
                        width: `${featProgress}%`,
                        height: '100%',
                        borderRadius: 999,
                        background: BB_GRADIENT,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontFamily: mono,
                      fontSize: 10,
                      letterSpacing: '0.18em',
                      color: 'rgba(255,249,244,0.72)',
                    }}
                  >
                    {Math.floor(featProgress)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          S7 — FOREVER  (word-by-word swipe-up, exit: scale-up camera pull)
          Italic gradient word has padding + overflow:visible to prevent clip
      ═══════════════════════════════════════════════════════════════════ */}
      {foreverOp > 0.001 && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: foreverOp }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 32,
              transform: `scale(${foreverScale * foreverExitScale})`,
              overflow: 'visible',
              padding: '0 80px',
            }}
          >
            <div
              style={{
                fontFamily: sora,
                fontWeight: 700,
                fontSize: 94,
                letterSpacing: '-0.03em',
                color: TEXT_HI,
                lineHeight: 1.2,
                opacity: fLine1,
                transform: `translateY(${(1 - fLine1) * 42}px)`,
              }}
            >
              Your launch
            </div>
            {/* "lasts forever." — gradient fill, padded to prevent clip */}
            <div
              style={{
                fontFamily: sora,
                fontWeight: 800,
                fontSize: 104,
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                padding: '0 56px',
                overflow: 'visible',
                opacity: fLine2,
                transform: `translateY(${(1 - fLine2) * 42}px) scale(${1 + ri(f, 797, 845, 0, 0.02)})`,
                ...bbFill(f, false),
              }}
            >
              lasts forever.
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          S8 — PRODUCTION  (swipe-up title + list, exit: slide right)
      ═══════════════════════════════════════════════════════════════════ */}
      {prodOp > 0.001 && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: prodOp }}>
          <div
            style={{
              display: 'flex',
              gap: 32,
              width: '88%',
              maxWidth: 1360,
              justifyContent: 'center',
              alignItems: 'stretch',
              transform: `translateX(${prodExitX}px)`,
            }}
          >
            {/* Left: copy + checklist */}
            <div
              style={{
                flex: '0 0 520px',
                background: 'rgba(8,10,13,0.95)',
                border: '1px solid rgba(232,93,58,0.2)',
                borderRadius: 28,
                padding: '40px 36px',
                boxShadow: '0 36px 120px rgba(0,0,0,0.28)',
                minHeight: 430,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: sora,
                    fontWeight: 800,
                    fontSize: 48,
                    lineHeight: 1.15,
                    letterSpacing: '-0.04em',
                    color: TEXT_HI,
                    marginBottom: 18,
                    opacity: ri(f, 873, 890, 0, 1),
                    transform: `translateY(${ri(f, 873, 890, 22, 0)}px)`,
                  }}
                >
                  No video? We build it.
                </div>
                <div
                  style={{
                    fontFamily: manrope,
                    fontSize: 14,
                    letterSpacing: '0.01em',
                    color: 'rgba(255,249,244,0.72)',
                    marginBottom: 26,
                    lineHeight: 1.62,
                    opacity: ri(f, 883, 900, 0, 1),
                    transform: `translateY(${ri(f, 883, 900, 14, 0)}px)`,
                  }}
                >
                  We deliver a launch-ready motion package when your team needs it most.
                </div>
                <div style={{ display: 'grid', gap: 16 }}>
                  {productionPoints.map((point, index) => {
                    const ptP = ri(f, 894 + index * 12, 922 + index * 12, 0, 1);
                    return (
                      <div
                        key={point}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 14,
                          opacity: ptP,
                          transform: `translateY(${(1 - ptP) * 20}px)`,
                        }}
                      >
                        <div
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            background: BB_ORANGE,
                            marginTop: 8,
                            flexShrink: 0,
                          }}
                        />
                        <div
                          style={{
                            fontFamily: sora,
                            fontSize: 20,
                            lineHeight: 1.3,
                            fontWeight: 700,
                            color: TEXT_HI,
                          }}
                        >
                          {point}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  marginTop: 18,
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: BB_ORANGE,
                  }}
                />
                <div
                  style={{
                    fontFamily: mono,
                    fontSize: 11,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase' as const,
                    color: 'rgba(255,249,244,0.72)',
                  }}
                >
                  Production support included
                </div>
              </div>
            </div>

            {/* Right: production brief card */}
            <div
              style={{
                flex: '0 0 620px',
                position: 'relative',
                minHeight: 430,
                borderRadius: 28,
                background: 'rgba(8,10,13,0.95)',
                border: '1px solid rgba(232,93,58,0.15)',
                overflow: 'hidden',
                boxShadow: '0 40px 130px rgba(0,0,0,0.32)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(circle at 20% 20%, rgba(232,93,58,0.16), transparent 30%)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 28,
                  left: 28,
                  fontFamily: mono,
                  fontSize: 11,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase' as const,
                  color: 'rgba(255,249,244,0.68)',
                  fontWeight: 700,
                }}
              >
                Production brief
              </div>

              <div
                style={{
                  position: 'absolute',
                  top: 70,
                  left: 28,
                  right: 28,
                  display: 'grid',
                  gap: 14,
                }}
              >
                {[
                  { label: 'Style',       value: 'Premium cinematic launch' },
                  { label: 'Deliverable', value: 'Broadcast-ready video asset' },
                ].map((row) => (
                  <div
                    key={row.label}
                    style={{
                      padding: '18px 20px',
                      borderRadius: 20,
                      background: 'rgba(18,18,22,0.92)',
                      border: '1px solid rgba(232,93,58,0.22)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: mono,
                        fontSize: 10,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase' as const,
                        color: 'rgba(255,249,244,0.64)',
                        fontWeight: 700,
                      }}
                    >
                      {row.label}
                    </div>
                    <div
                      style={{
                        fontFamily: sora,
                        fontSize: 18,
                        fontWeight: 700,
                        color: TEXT_HI,
                      }}
                    >
                      {row.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Play button */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 28,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 80,
                  height: 80,
                  borderRadius: 20,
                  background: 'rgba(18,18,22,0.78)',
                  display: 'grid',
                  placeItems: 'center',
                  border: '1px solid rgba(232,93,58,0.2)',
                  boxShadow: '0 24px 80px rgba(232,93,58,0.18)',
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: BB_ORANGE,
                    display: 'grid',
                    placeItems: 'center',
                    boxShadow: '0 0 24px rgba(232,93,58,0.45)',
                  }}
                >
                  <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                    <path d="M8 5L19 12L8 19V5Z" fill="#111" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          S9 — CTA  (word-by-word swipe-up, gradient line fixed, holds to end)
      ═══════════════════════════════════════════════════════════════════ */}
      {ctaOp > 0.001 && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: ctaOp }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 28,
              textAlign: 'center',
              maxWidth: 1200,
              padding: '0 80px',
              overflow: 'visible',
            }}
          >
            <div
              style={{
                fontFamily: sora,
                fontWeight: 800,
                fontSize: 72,
                lineHeight: 1.15,
                letterSpacing: '-0.04em',
                color: TEXT_HI,
                opacity: ctaLine1,
                transform: `translateY(${(1 - ctaLine1) * 38}px)`,
              }}
            >
              Pay once.
            </div>

            {/* Gradient line — padded + overflow visible to prevent clip */}
            <div
              style={{
                fontFamily: sora,
                fontWeight: 800,
                fontSize: 72,
                lineHeight: 1.15,
                letterSpacing: '-0.04em',
                padding: '0 48px',
                overflow: 'visible',
                opacity: ctaLine2,
                transform: `translateY(${(1 - ctaLine2) * 38}px)`,
                ...bbFill(f, false),
              }}
            >
              Stay visible forever.
            </div>

            <div
              style={{
                fontFamily: mono,
                fontSize: 18,
                letterSpacing: '0.24em',
                color: 'rgba(255,245,240,0.76)',
                fontWeight: 700,
                textTransform: 'uppercase' as const,
                opacity: ctaLine3,
                transform: `translateY(${(1 - ctaLine3) * 24}px)`,
              }}
            >
              avenirreym.com/billboard
            </div>

            {/* Badge */}
            <div
              style={{
                width: 78,
                height: 78,
                borderRadius: 18,
                background: `linear-gradient(135deg, ${BB_ORANGE} 0%, ${BB_RED_DEPTH} 100%)`,
                boxShadow: '0 0 42px rgba(232,93,58,0.42)',
                display: 'grid',
                placeItems: 'center',
                opacity: ctaBadge,
                transform: `scale(${0.82 + ctaBadge * 0.18})`,
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: TEXT_HI,
                }}
              />
            </div>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

export default BillBoardStoryboard;
