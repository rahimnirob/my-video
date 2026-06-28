import React from 'react';
import { AbsoluteFill, Easing, OffthreadVideo, interpolate, staticFile, useCurrentFrame } from 'remotion';
import RestyleBg from './kit/RestyleBg';
import { ease, bbFill } from './palette';
import { mono, sora, manrope } from '../tokens';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

// Avenir Billboard Canonical Colors
const BB_ORANGE = '#E85D3A';      // Broadcast Orange (primary)
const BB_AMBER = '#F0A868';       // Warm amber-orange (secondary)
const BB_RED_DEPTH = '#C23B22';   // Deeper red-orange
const LIVE_RED = '#ef4444';       // Canonical live pulse red

// Text color tokens
const TEXT_HI = '#F0F2F4';        // Bright text
const TEXT_MD = '#8A95A5';        // Secondary text
const TEXT_LO = '#3E4650';        // Low-priority text

const BB_GRADIENT = `linear-gradient(90deg, ${BB_ORANGE}, ${BB_AMBER})`;

export const TOTAL_FRAMES = 840;

const BillBoardStoryboard: React.FC = () => {
  const f = useCurrentFrame();

  // 1. Hook Scene: f = 0 to 90
  const hookP = interpolate(f, [0, 20], [0, 1], { easing: ease, ...clamp });
  const hookExit = interpolate(f, [72, 90], [0, 1], { easing: Easing.bezier(0.25, 1, 0.5, 1), ...clamp });
  const hookOp = hookP * (1 - hookExit);
  const hookY = interpolate(hookP, [0, 1], [20, 0], clamp) + hookExit * 24;
  const hookScale = interpolate(hookP, [0, 1], [0.96, 1], clamp) * (1 + hookExit * 0.12);
  const hookBlur = (1 - hookP) * 16 + hookExit * 18;
  const hookLabelOp = interpolate(f, [18, 36], [0, 1], { easing: ease, ...clamp });

  // 2. Surface Scene: f = 90 to 190
  const surfaceEnter = interpolate(f, [90, 118], [0, 1], { easing: ease, ...clamp });
  const surfaceExit = interpolate(f, [168, 190], [0, 1], { easing: ease, ...clamp });
  const surfaceOp = surfaceEnter * (1 - surfaceExit);
  const surfaceZoom = interpolate(surfaceEnter, [0, 1], [0.98, 1], clamp);
  const surfaceGlow = interpolate(surfaceEnter, [0, 1], [0, 1], clamp);

  // 3. Proof Scene: f = 190 to 270
  const proofEnter = interpolate(f, [190, 218], [0, 1], { easing: ease, ...clamp });
  const proofExit = interpolate(f, [254, 270], [0, 1], { easing: Easing.bezier(0.25, 1, 0.5, 1), ...clamp });
  const proofOp = proofEnter * (1 - proofExit);
  const proofZoom = interpolate(proofEnter, [0, 1], [0.96, 1], clamp);
  const proofProgress = interpolate(f, [210, 270], [18, 92], { easing: ease, ...clamp });
  const proofPulse = Math.max(0, Math.sin(((f - 190) / 30) * Math.PI));

  // 4. Problem / Archive Scene: f = 270 to 380
  const problemEnter = interpolate(f, [270, 290], [0, 1], { easing: ease, ...clamp });
  const problemExit = interpolate(f, [362, 380], [0, 1], { easing: ease, ...clamp });
  const problemOp = problemEnter * (1 - problemExit);
  const problemScale = interpolate(problemEnter, [0, 1], [0.94, 1], clamp);
  const problemBlur = (1 - problemEnter) * 8 + problemExit * 8;

  // 5. Apply Scene: f = 380 to 570
  const applyEnter = interpolate(f, [380, 402], [0, 1], { easing: ease, ...clamp });
  const applyExit = interpolate(f, [552, 570], [0, 1], { easing: ease, ...clamp });
  const applyOp = applyEnter * (1 - applyExit);
  const formZoom = interpolate(applyEnter, [0, 1], [0.92, 1], clamp);
  const playerEnter = interpolate(f, [420, 460], [0, 1], { easing: ease, ...clamp });
  const playerOp = playerEnter * (1 - applyExit);
  const progress = interpolate(f, [440, 550], [0, 100], { easing: ease, ...clamp });
  const spinDeg = ((f - 380) / 30) * (360 / 8);

  // 6. Forever Scene: f = 570 to 670
  const foreverEnter = interpolate(f, [570, 590], [0, 1], { easing: ease, ...clamp });
  const foreverExit = interpolate(f, [652, 670], [0, 1], { easing: ease, ...clamp });
  const foreverOp = foreverEnter * (1 - foreverExit);
  const foreverScale = interpolate(foreverEnter, [0, 1], [0.94, 1], clamp);
  const foreverGlow = interpolate(f, [578, 620], [0, 1], { easing: ease, ...clamp });

  // 7. Production Scene: f = 670 to 760
  const prodEnter = interpolate(f, [670, 690], [0, 1], { easing: ease, ...clamp });
  const prodExit = interpolate(f, [742, 760], [0, 1], { easing: ease, ...clamp });
  const prodOp = prodEnter * (1 - prodExit);

  // 8. CTA Scene: f = 760 to 840
  const ctaEnter = interpolate(f, [760, 780], [0, 1], { easing: ease, ...clamp });
  const ctaOp = ctaEnter;

  const productionPoints = ['Video production support', 'Ready-to-broadcast assets', 'Launch-ready motion delivery'];

  return (
    <AbsoluteFill style={{ backgroundColor: '#020304', overflow: 'hidden', fontFamily: sora }}>
      <RestyleBg />

      {/* 1. Hook Scene */}
      {hookOp > 0.001 && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              opacity: hookOp,
              transform: `translate3d(0, ${hookY}px, 0) scale(${hookScale})`,
              filter: `blur(${hookBlur}px)`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 18,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: sora,
                fontWeight: 900,
                fontSize: 160, // Fixed overlap: reduced font size to fit viewport single-line
                letterSpacing: '-0.04em',
                lineHeight: 1.1,
                textShadow: `0 0 ${42 * (1 - hookExit)}px rgba(232,93,58,${0.25 * (1 - hookExit)})`,
                whiteSpace: 'nowrap',
                // signature animated flowing gradient fill
                ...(hookExit > 0.5 ? { color: TEXT_MD, WebkitTextFillColor: TEXT_MD } : bbFill(f, false)),
              }}
            >
              LAUNCHED.
            </div>
            <div
              style={{
                opacity: hookLabelOp,
                fontFamily: mono,
                fontSize: 14,
                letterSpacing: '0.24em',
                textTransform: 'uppercase' as const,
                color: TEXT_MD,
              }}
            >
              08:19 UTC · Last signal
            </div>
            <div
              style={{
                width: 140,
                height: 2,
                borderRadius: 999,
                background: `linear-gradient(90deg, transparent 0%, ${BB_ORANGE} 50%, transparent 100%)`,
                opacity: 0.65,
              }}
            />
          </div>
        </AbsoluteFill>
      )}

      {/* 2. Surface Scene */}
      {surfaceOp > 0.001 && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: surfaceOp }}>
          <div style={{ width: '84%', maxWidth: 1520, transform: `scale(${surfaceZoom})` }}>
            <div
              style={{
                position: 'relative',
                height: 680,
                borderRadius: 34,
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #050506, #110f11)',
                border: `1px solid rgba(232, 93, 58, 0.18)`,
                boxShadow: `0 40px 120px rgba(232, 93, 58, 0.15)`,
              }}
            >
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 18% 18%, rgba(232, 93, 58, 0.22), transparent 34%)` }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 35%, rgba(0,0,0,0.24) 100%)' }} />
              <div style={{ position: 'absolute', inset: 0, opacity: 0.45 + surfaceGlow * 0.2, background: `radial-gradient(circle at 50% 50%, rgba(232, 93, 58, 0.18) 0%, transparent 58%)` }} />
              <div style={{ position: 'absolute', top: 24, left: 28, right: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: LIVE_RED, boxShadow: '0 0 14px rgba(239,68,68,0.7)' }} />
                  <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase' as const, color: 'rgba(255,249,244,0.8)', fontWeight: 700 }}>On Air • Billboard</div>
                </div>
                <div style={{ padding: '9px 14px', borderRadius: 999, background: 'rgba(18,18,22,0.88)', border: `1px solid rgba(232, 93, 58, 0.24)`, fontFamily: mono, fontSize: 11, letterSpacing: '0.2em', color: TEXT_HI, textTransform: 'uppercase' as const }}>Live • 17 slots</div>
              </div>

              <div style={{ position: 'absolute', top: 88, left: 26, right: 26, height: 64, borderRadius: 16, background: 'rgba(18,18,22,0.88)', border: `1px solid rgba(232, 93, 58, 0.22)`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', zIndex: 2 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: 'rgba(255,249,244,0.48)', fontWeight: 700 }}>Telemetry</div>
                  <div style={{ width: 110, height: 8, borderRadius: 999, background: 'rgba(255,255,255,0.08)' }} />
                  <div style={{ width: 70, height: 8, borderRadius: 999, background: `rgba(232, 93, 58, 0.55)` }} />
                </div>
                <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'rgba(255,249,244,0.72)' }}>Signal healthy</div>
              </div>

              <div style={{ position: 'absolute', inset: '140px 34px 34px 34px', borderRadius: 24, overflow: 'hidden', background: 'rgba(3,4,6,0.86)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)' }}>
                <OffthreadVideo
                  src={staticFile('billboard/lv_0_20260624023044.mp4')}
                  style={{
                    position: 'absolute',
                    inset: '-10% 0 0 0', // Top crop to hide CapCut watermark
                    width: '100%',
                    height: '120%',
                    objectFit: 'cover',
                    opacity: 0.84,
                  }}
                  startFrom={4}
                  muted
                />
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 20%, rgba(7,8,10,0.58) 100%)' }} />
                <div style={{ position: 'absolute', left: 24, bottom: 24, width: 420, padding: '16px 18px', borderRadius: 16, background: 'rgba(3,4,6,0.78)', border: `1px solid rgba(232, 93, 58, 0.24)`, boxShadow: '0 28px 70px rgba(0,0,0,0.32)' }}>
                  <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: BB_ORANGE, fontWeight: 700, marginBottom: 6 }}>Now broadcasting</div>
                  <div style={{ fontFamily: sora, fontWeight: 700, fontSize: 30, color: TEXT_HI }}>Avenir Billboard</div>
                  <div style={{ fontFamily: manrope, fontSize: 12, color: 'rgba(245,239,234,0.72)', marginTop: 6, lineHeight: 1.5 }}>Priority placement for launches that need to keep moving.</div>
                </div>
              </div>
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* 3. Proof Scene */}
      {proofOp > 0.001 && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: proofOp }}>
          <div style={{ width: '82%', maxWidth: 1480, transform: `scale(${proofZoom})` }}>
            <div
              style={{
                position: 'relative',
                height: 680,
                borderRadius: 34,
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(7,8,10,0.98), rgba(15,16,18,0.92))',
                border: `1px solid rgba(232, 93, 58, 0.15)`,
                boxShadow: '0 42px 140px rgba(0,0,0,0.42)',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 44% 40%, rgba(232, 93, 58, 0.14), transparent 36%)` }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 40%, rgba(0,0,0,0.22) 100%)' }} />

              <div style={{ position: 'absolute', top: 30, left: 34, right: 34, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: LIVE_RED, boxShadow: '0 0 16px rgba(239,68,68,0.75)' }} />
                  <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase' as const, color: 'rgba(255,249,244,0.86)', fontWeight: 700 }}>LIVE • Billboard</div>
                </div>
                <div style={{ padding: '10px 16px', borderRadius: 999, background: 'rgba(18,18,22,0.88)', border: `1px solid rgba(232, 93, 58, 0.22)`, fontFamily: mono, fontSize: 11, letterSpacing: '0.18em', color: TEXT_HI, textTransform: 'uppercase' as const }}>Signal stable</div>
              </div>

              <div style={{ position: 'absolute', left: 40, top: 120, width: 440, padding: '24px 28px', borderRadius: 24, background: 'rgba(10,10,12,0.92)', border: `1px solid rgba(232, 93, 58, 0.22)`, boxShadow: `0 28px 90px rgba(232, 93, 58, 0.18)`, zIndex: 2 }}>
                <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.24em', color: BB_ORANGE, textTransform: 'uppercase' as const, fontWeight: 700, marginBottom: 12 }}>Now broadcasting</div>
                <div style={{ fontFamily: sora, fontWeight: 800, fontSize: 48, lineHeight: 1, letterSpacing: '-0.04em', color: TEXT_HI }}>Avenir Billboard</div>
                <div style={{ fontFamily: manrope, fontSize: 12, color: 'rgba(245,239,234,0.72)', marginTop: 10, maxWidth: 380, lineHeight: 1.5 }}>A broadcast surface that keeps your launch visible while every other feed burns out.</div>
                <div style={{ marginTop: 22 }}>
                  <div style={{ height: 12, borderRadius: 999, background: 'rgba(255,255,255,0.04)' }}>
                    <div style={{ width: `${proofProgress}%`, height: '100%', borderRadius: 999, background: BB_GRADIENT }} />
                  </div>
                  <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: 10, letterSpacing: '0.2em', color: 'rgba(255,249,244,0.66)', textTransform: 'uppercase' as const }}>
                    <span>07:14 / 12:00</span>
                    <span>{Math.floor(proofProgress)}% live</span>
                  </div>
                </div>
              </div>

              <div style={{ position: 'absolute', inset: '152px 38px 38px 38px', borderRadius: 24, overflow: 'hidden', background: 'rgba(5,6,8,0.94)', border: `1px solid rgba(232, 93, 58, 0.18)`, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }}>
                <OffthreadVideo
                  src={staticFile('billboard/lv_0_20260624023044.mp4')}
                  style={{
                    position: 'absolute',
                    inset: '-10% 0 0 0', // Top crop to hide CapCut watermark
                    width: '100%',
                    height: '120%',
                    objectFit: 'cover',
                    opacity: 0.85,
                  }}
                  startFrom={4}
                  muted
                />
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 18%, rgba(6,7,9,0.54) 100%)' }} />
                <div style={{ position: 'absolute', left: 28, bottom: 24, display: 'flex', alignItems: 'center', gap: 14, zIndex: 2 }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: LIVE_RED, boxShadow: `0 0 ${14 + proofPulse * 14}px rgba(239,68,68,${0.4 + proofPulse * 0.3})` }} />
                  <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'rgba(255,249,244,0.82)' }}>Live playback</div>
                </div>
              </div>
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* 4. Problem / Archive Grid Scene */}
      {problemOp > 0.001 && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: problemOp }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, transform: `scale(${problemScale})`, filter: `blur(${problemBlur}px)` }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase' as const, color: BB_ORANGE, fontWeight: 700 }}>Permanent archive</div>
              <div style={{ fontFamily: sora, fontWeight: 800, fontSize: 72, lineHeight: 1.15, letterSpacing: '-0.03em', color: TEXT_HI, textAlign: 'center' }}>Your slot lives here.</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 18, width: '84%', maxWidth: 1300 }}>
              {[
                { name: 'Ares OS', category: 'SYSTEMS', age: '14d ago' },
                { name: 'Ella AI', category: 'PRODUCTIVITY', age: '8d ago' },
                { name: 'LumeX', category: 'VIDEO STAGE', age: 'Live now', isFeatured: true },
                { name: 'Pulse', category: 'MARKETS', age: '22d ago' },
                { name: 'Sentinel', category: 'SECURITY', age: '30d ago' },
              ].map((item, index) => {
                const isFeatured = item.isFeatured;
                return (
                  <div
                    key={item.name}
                    style={{
                      minHeight: 180,
                      borderRadius: 24,
                      background: isFeatured ? 'rgba(232, 93, 58, 0.08)' : 'rgba(8, 10, 13, 0.85)',
                      border: isFeatured ? `1px solid rgba(232, 93, 58, 0.32)` : '1px solid rgba(255, 255, 255, 0.05)',
                      boxShadow: isFeatured ? '0 20px 70px rgba(232, 93, 58, 0.18)' : '0 18px 42px rgba(0,0,0,0.18)',
                      padding: '24px 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.18em', color: isFeatured ? BB_ORANGE : TEXT_LO, fontWeight: 700, marginBottom: 8 }}>{item.category}</div>
                      <div style={{ fontFamily: sora, fontSize: 20, fontWeight: 800, color: TEXT_HI, letterSpacing: '-0.02em' }}>{item.name}</div>
                      <div style={{ fontFamily: manrope, fontSize: 11, color: TEXT_MD, marginTop: 6 }}>Broadcast Slot</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 18 }}>
                      <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: isFeatured ? BB_AMBER : 'rgba(255,255,255,0.48)' }}>{item.age}</span>
                      {isFeatured ? (
                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: LIVE_RED, boxShadow: '0 0 12px rgba(239,68,68,0.7)' }} />
                      ) : (
                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* 5. Apply / Includes Scene */}
      {applyOp > 0.001 && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: applyOp }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 34, transform: `scale(${formZoom})`, filter: `blur(${(1 - applyEnter) * 10}px)` }}>
            <div
              style={{
                flex: '0 0 520px',
                background: 'rgba(8, 10, 13, 0.95)',
                border: `1px solid rgba(232, 93, 58, 0.2)`,
                borderRadius: 24,
                padding: '36px 34px',
                boxShadow: '0 36px 110px rgba(0,0,0,0.34)',
              }}
            >
              <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase' as const, color: BB_ORANGE, fontWeight: 700, marginBottom: 18 }}>Billboard includes</div>
              <div style={{ display: 'grid', gap: 18 }}>
                {[
                  '30-day broadcast rotation',
                  'Permanent launch archive',
                  'Priority visibility placement',
                  'Real-time signal telemetry',
                ].map((line, index) => (
                  <div
                    key={line}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      opacity: interpolate(f, [390 + index * 12, 420 + index * 12], [0, 1], { easing: ease, ...clamp }),
                      transform: `translateY(${(1 - interpolate(f, [390 + index * 12, 420 + index * 12], [0, 1], { easing: ease, ...clamp })) * 12}px)`,
                    }}
                  >
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: BB_ORANGE }} />
                    <div style={{ fontFamily: sora, fontSize: 22, lineHeight: 1.2, fontWeight: 700, color: TEXT_HI }}>{line}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ position: 'relative', width: 760, minHeight: 430, opacity: playerOp, transform: `translateX(${playerEnter * 20}px) scale(${0.92 + playerEnter * 0.08})` }}>
              <div style={{ position: 'absolute', inset: -8, borderRadius: 28, overflow: 'hidden', pointerEvents: 'none', zIndex: -1, filter: 'blur(12px)', opacity: 0.5 }}>
                <div style={{ position: 'absolute', inset: '-50%', background: `conic-gradient(from ${spinDeg}deg, transparent 0%, rgba(232,93,58,0.35) 12%, rgba(194,59,34,0.3) 24%, transparent 40%, rgba(232,93,58,0.2) 58%, transparent 72%)` }} />
              </div>
              <div style={{ position: 'absolute', inset: -2, borderRadius: 24, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
                <div style={{ position: 'absolute', inset: '-50%', background: `conic-gradient(from ${spinDeg}deg, transparent 0%, ${BB_ORANGE} 10%, ${BB_RED_DEPTH} 18%, rgba(232,93,58,0.72) 36%, transparent 48%, transparent 60%, rgba(232,93,58,0.44) 74%, transparent 92%)` }} />
                <div style={{ position: 'absolute', inset: 2, borderRadius: 22, background: 'rgba(6, 8, 10, 0.92)' }} />
              </div>
              <div style={{ position: 'absolute', inset: 0, borderRadius: 22, overflow: 'hidden', background: '#090B0D', zIndex: 1 }}>
                <OffthreadVideo
                  src={staticFile('billboard/lv_0_20260624023044.mp4')}
                  style={{
                    position: 'absolute',
                    inset: '-10% 0 0 0', // Top crop to hide CapCut watermark
                    width: '100%',
                    height: '120%',
                    objectFit: 'cover',
                    opacity: 0.86,
                  }}
                  startFrom={4}
                  muted
                />
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 22%, rgba(6,7,9,0.56) 100%)' }} />
                <div style={{ position: 'absolute', left: 24, top: 24, right: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: LIVE_RED, boxShadow: '0 0 16px rgba(239,68,68,0.75)' }} />
                    <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'rgba(255,249,244,0.85)', fontWeight: 700 }}>Playing live</div>
                  </div>
                  <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'rgba(255,249,244,0.66)' }}>01:26 / 05:00</div>
                </div>
                <div style={{ position: 'absolute', bottom: 36, left: 24, right: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
                  <div style={{ width: '76%', height: 10, borderRadius: 999, background: 'rgba(255,255,255,0.06)' }}>
                    <div style={{ width: `${progress}%`, height: '100%', borderRadius: 999, background: BB_GRADIENT }} />
                  </div>
                  <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.18em', color: 'rgba(255,249,244,0.72)' }}>{Math.floor(progress)}%</div>
                </div>
              </div>
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* 6. Forever Scene */}
      {foreverOp > 0.001 && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: foreverOp }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, transform: `scale(${foreverScale})` }}>
            <div style={{ fontFamily: sora, fontWeight: 700, fontSize: 94, letterSpacing: '-0.03em', color: TEXT_HI, lineHeight: 1.12 }}>Your launch</div>
            <div style={{ fontFamily: sora, fontWeight: 800, fontSize: 104, letterSpacing: '-0.03em', lineHeight: 1.12, ...bbFill(f, false), transform: `scale(${1 + foreverGlow * 0.02})` }}>lasts forever.</div>
          </div>
        </AbsoluteFill>
      )}

      {/* 7. Production Scene */}
      {prodOp > 0.001 && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: prodOp }}>
          <div style={{ display: 'flex', gap: 32, width: '88%', maxWidth: 1360, justifyContent: 'center', alignItems: 'stretch' }}>
            <div
              style={{
                flex: '0 0 520px',
                background: 'rgba(8, 10, 13, 0.95)',
                border: `1px solid rgba(232, 93, 58, 0.2)`,
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
                <div style={{ fontFamily: sora, fontWeight: 800, fontSize: 48, lineHeight: 1.15, letterSpacing: '-0.04em', color: TEXT_HI, marginBottom: 18 }}>No video? We build it.</div>
                <div style={{ fontFamily: manrope, fontSize: 14, letterSpacing: '0.01em', color: 'rgba(255,249,244,0.72)', marginBottom: 24, lineHeight: 1.6 }}>We deliver a launch-ready motion package when your team needs it most.</div>
                <div style={{ display: 'grid', gap: 16 }}>
                  {productionPoints.map((point, index) => (
                    <div
                      key={point}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 14,
                        opacity: interpolate(f, [685 + index * 10, 715 + index * 10], [0, 1], { easing: ease, ...clamp }),
                        transform: `translateY(${(1 - interpolate(f, [685 + index * 10, 715 + index * 10], [0, 1], { easing: ease, ...clamp })) * 14}px)`,
                      }}
                    >
                      <div style={{ width: 12, height: 12, borderRadius: '50%', background: BB_ORANGE, marginTop: 8 }} />
                      <div style={{ fontFamily: sora, fontSize: 20, lineHeight: 1.3, fontWeight: 700, color: TEXT_HI }}>{point}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 18 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: BB_ORANGE }} />
                <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: 'rgba(255,249,244,0.72)' }}>Production support included</div>
              </div>
            </div>

            <div style={{ flex: '0 0 620px', position: 'relative', minHeight: 430, borderRadius: 28, background: 'rgba(8, 10, 13, 0.95)', border: `1px solid rgba(232, 93, 58, 0.15)`, overflow: 'hidden', boxShadow: '0 40px 130px rgba(0,0,0,0.32)' }}>
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 20% 20%, rgba(232, 93, 58, 0.16), transparent 30%)` }} />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 70%, rgba(255,255,255,0.04), transparent 22%)' }} />
              <div style={{ position: 'absolute', top: 28, left: 28, fontFamily: mono, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: 'rgba(255,249,244,0.68)', fontWeight: 700 }}>Production brief</div>
              <div style={{ position: 'absolute', top: 70, left: 28, right: 28, display: 'grid', gap: 14 }}> 
                <div style={{ padding: '18px 20px', borderRadius: 20, background: 'rgba(18,18,22,0.92)', border: `1px solid rgba(232, 93, 58, 0.22)`, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'rgba(255,249,244,0.64)', fontWeight: 700 }}>Style</div>
                  <div style={{ fontFamily: sora, fontSize: 18, fontWeight: 700, color: TEXT_HI }}>Premium cinematic launch</div>
                </div>
                <div style={{ padding: '18px 20px', borderRadius: 20, background: 'rgba(18,18,22,0.92)', border: `1px solid rgba(232, 93, 58, 0.22)`, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'rgba(255,249,244,0.64)', fontWeight: 700 }}>Deliverable</div>
                  <div style={{ fontFamily: sora, fontSize: 18, fontWeight: 700, color: TEXT_HI }}>Broadcast-ready video asset</div>
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', width: 80, height: 80, borderRadius: 20, background: 'rgba(18,18,22,0.78)', display: 'grid', placeItems: 'center', border: `1px solid rgba(232, 93, 58, 0.2)`, boxShadow: `0 24px 80px rgba(232, 93, 58, 0.18)` }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: BB_ORANGE, display: 'grid', placeItems: 'center', boxShadow: `0 0 24px rgba(232, 93, 58, 0.45)` }}>
                  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5L19 12L8 19V5Z" fill="#111" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* 8. CTA / Outro Scene */}
      {ctaOp > 0.001 && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: ctaOp }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, textAlign: 'center', maxWidth: 1200, padding: '0 40px' }}>
            <div style={{ fontFamily: sora, fontWeight: 800, fontSize: 72, lineHeight: 1.15, letterSpacing: '-0.04em', color: TEXT_HI }}>Pay once. Stay visible forever.</div>
            <div style={{ fontFamily: mono, fontSize: 18, letterSpacing: '0.24em', color: 'rgba(255,245,240,0.76)', fontWeight: 700, textTransform: 'uppercase' as const }}>avenirreym.com/billboard</div>
            <div style={{ width: 78, height: 78, borderRadius: 18, background: `linear-gradient(135deg, ${BB_ORANGE} 0%, ${BB_RED_DEPTH} 100%)`, boxShadow: `0 0 42px rgba(232, 93, 58, 0.42)`, display: 'grid', placeItems: 'center' }}>
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: TEXT_HI, boxShadow: '0 0 10px #FFF' }} />
            </div>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

export default BillBoardStoryboard;
