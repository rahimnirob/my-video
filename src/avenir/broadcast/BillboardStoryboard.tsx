import React from 'react';
import { AbsoluteFill, Easing, OffthreadVideo, interpolate, staticFile, useCurrentFrame } from 'remotion';
import RestyleBg from './kit/RestyleBg';
import { ease } from './palette';
import { mono, sora } from '../tokens';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const RED = '#ef4444';
const RED_DEEP = '#991b1b';
const RED_TEXT = '#F5EFEA';
const RED_TEXT_FADED = 'rgba(255,250,247,0.68)';
const RED_BAR = `linear-gradient(90deg, ${RED}, ${RED_DEEP})`;
const redFill: React.CSSProperties = {
  backgroundImage: RED_BAR,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
};

export const TOTAL_FRAMES = 840;

const BillBoardStoryboard: React.FC = () => {
  const f = useCurrentFrame();

  const hookP = interpolate(f, [0, 20], [0, 1], { easing: ease, ...clamp });
  const hookExit = interpolate(f, [72, 90], [0, 1], { easing: Easing.bezier(0.25, 1, 0.5, 1), ...clamp });
  const hookOp = hookP * (1 - hookExit);
  const hookY = interpolate(hookP, [0, 1], [20, 0], clamp) + hookExit * 24;
  const hookScale = interpolate(hookP, [0, 1], [0.96, 1], clamp) * (1 + hookExit * 0.12);
  const hookBlur = (1 - hookP) * 16 + hookExit * 18;
  const hookFill = hookExit > 0.5 ? '#CCCCCC' : '#ef4444';
  const hookLabelOp = interpolate(f, [18, 36], [0, 1], { easing: ease, ...clamp });

  const surfaceEnter = interpolate(f, [90, 122], [0, 1], { easing: ease, ...clamp });
  const surfaceExit = interpolate(f, [176, 200], [0, 1], { easing: ease, ...clamp });
  const surfaceOp = surfaceEnter * (1 - surfaceExit);
  const surfaceZoom = interpolate(surfaceEnter, [0, 1], [0.98, 1], clamp);
  const surfaceGlow = interpolate(surfaceEnter, [0, 1], [0, 1], clamp);

  const proofEnter = interpolate(f, [200, 232], [0, 1], { easing: ease, ...clamp });
  const proofExit = interpolate(f, [260, 280], [0, 1], { easing: Easing.bezier(0.25, 1, 0.5, 1), ...clamp });
  const proofOp = proofEnter * (1 - proofExit);
  const proofZoom = interpolate(proofEnter, [0, 1], [0.96, 1], clamp);
  const proofProgress = interpolate(f, [220, 280], [18, 92], { easing: ease, ...clamp });
  const proofPulse = Math.max(0, Math.sin(((f - 200) / 30) * Math.PI));

  const problemEnter = interpolate(f, [280, 298], [0, 1], { easing: ease, ...clamp });
  const problemExit = interpolate(f, [376, 400], [0, 1], { easing: ease, ...clamp });
  const problemOp = problemEnter * (1 - problemExit);
  const problemScale = interpolate(problemEnter, [0, 1], [3.2, 1], clamp);
  const problemBlur = (1 - problemEnter) * 16 + problemExit * 16;

  const applyEnter = interpolate(f, [400, 422], [0, 1], { easing: ease, ...clamp });
  const applyExit = interpolate(f, [586, 610], [0, 1], { easing: ease, ...clamp });
  const applyOp = applyEnter * (1 - applyExit);
  const formZoom = interpolate(applyEnter, [0, 1], [0.85, 1], clamp);
  const playerEnter = interpolate(f, [490, 540], [0, 1], { easing: ease, ...clamp });
  const playerOp = playerEnter * (1 - applyExit);
  const progress = interpolate(f, [530, 640], [0, 100], { easing: ease, ...clamp });
  const spinDeg = ((f - 360) / 30) * (360 / 8);

  const foreverEnter = interpolate(f, [610, 630], [0, 1], { easing: ease, ...clamp });
  const foreverExit = interpolate(f, [690, 720], [0, 1], { easing: ease, ...clamp });
  const foreverOp = foreverEnter * (1 - foreverExit);
  const foreverScale = interpolate(foreverEnter, [0, 1], [0.95, 1], clamp);
  const foreverGlow = interpolate(f, [618, 660], [0, 1], { easing: ease, ...clamp });

  const prodEnter = interpolate(f, [730, 748], [0, 1], { easing: ease, ...clamp });
  const prodExit = interpolate(f, [800, 820], [0, 1], { easing: ease, ...clamp });
  const prodOp = prodEnter * (1 - prodExit);

  const ctaEnter = interpolate(f, [820, 840], [0, 1], { easing: ease, ...clamp });
  const ctaOp = ctaEnter;

  const productionPoints = ['Video production support', 'Ready-to-broadcast assets', 'Launch-ready motion delivery'];

  return (
    <AbsoluteFill style={{ backgroundColor: '#020304', overflow: 'hidden', fontFamily: sora }}>
      <RestyleBg />

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
                fontSize: 280,
                letterSpacing: '-0.045em',
                lineHeight: 0.95,
                color: hookFill,
                WebkitTextFillColor: hookFill,
                ...redFill,
                textShadow: `0 0 ${42 * (1 - hookExit)}px rgba(239,68,68,${0.24 * (1 - hookExit)})`,
              }}
            >
              LAUNCHED.
            </div>
            <div
              style={{
                opacity: hookLabelOp,
                fontFamily: mono,
                fontSize: 16,
                letterSpacing: '0.24em',
                textTransform: 'uppercase' as const,
                color: 'rgba(255,250,247,0.68)',
              }}
            >
              08:19 UTC · Last signal
            </div>
            <div
              style={{
                width: 190,
                height: 2,
                borderRadius: 999,
                background: 'linear-gradient(90deg, transparent 0%, #ef4444 50%, transparent 100%)',
                opacity: 0.65,
              }}
            />
          </div>
        </AbsoluteFill>
      )}

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
                border: '1px solid rgba(239,68,68,0.18)',
                boxShadow: '0 40px 120px rgba(239,68,68,0.18)',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 18% 18%, rgba(239,68,68,0.22), transparent 34%)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 35%, rgba(0,0,0,0.24) 100%)' }} />
              <div style={{ position: 'absolute', inset: 0, opacity: 0.45 + surfaceGlow * 0.2, background: `radial-gradient(circle at 50% 50%, rgba(239,68,68,0.18) 0%, transparent 58%)` }} />
              <div style={{ position: 'absolute', top: 24, left: 28, right: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 14px rgba(239,68,68,0.7)' }} />
                  <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase' as const, color: 'rgba(255,249,244,0.8)', fontWeight: 700 }}>On Air • Billboard</div>
                </div>
                <div style={{ padding: '9px 14px', borderRadius: 999, background: 'rgba(18,18,22,0.88)', border: '1px solid rgba(239,68,68,0.24)', fontFamily: mono, fontSize: 11, letterSpacing: '0.2em', color: '#F8F4F1', textTransform: 'uppercase' as const }}>Live • 17 slots</div>
              </div>

              <div style={{ position: 'absolute', top: 88, left: 26, right: 26, height: 64, borderRadius: 16, background: 'rgba(18,18,22,0.88)', border: '1px solid rgba(239,68,68,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', zIndex: 2 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: 'rgba(255,249,244,0.48)', fontWeight: 700 }}>Telemetry</div>
                  <div style={{ width: 110, height: 8, borderRadius: 999, background: 'rgba(255,255,255,0.08)' }} />
                  <div style={{ width: 70, height: 8, borderRadius: 999, background: 'rgba(239,68,68,0.55)' }} />
                </div>
                <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'rgba(255,249,244,0.72)' }}>Signal healthy</div>
              </div>

              <div style={{ position: 'absolute', inset: '140px 34px 34px 34px', borderRadius: 24, overflow: 'hidden', background: 'rgba(3,4,6,0.86)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)' }}>
                <OffthreadVideo
                  src={staticFile('billboard/lv_0_20260624023044.mp4')}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.84 }}
                  startFrom={4}
                  muted
                />
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 20%, rgba(7,8,10,0.58) 100%)' }} />
                <div style={{ position: 'absolute', left: 24, bottom: 24, width: 420, padding: '16px 18px', borderRadius: 16, background: 'rgba(3,4,6,0.78)', border: '1px solid rgba(232,93,58,0.24)', boxShadow: '0 28px 70px rgba(0,0,0,0.32)' }}>
                  <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: '#ef4444', fontWeight: 700, marginBottom: 6 }}>Now broadcasting</div>
                  <div style={{ fontFamily: sora, fontWeight: 700, fontSize: 30, color: '#F5EFEA' }}>Avenir Billboard</div>
                  <div style={{ fontFamily: mono, fontSize: 12, color: 'rgba(245,239,234,0.72)', marginTop: 6 }}>Priority placement for launches that need to keep moving.</div>
                </div>
              </div>
            </div>
          </div>
        </AbsoluteFill>
      )}

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
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 42px 140px rgba(0,0,0,0.42)',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 44% 40%, rgba(232,93,58,0.14), transparent 36%)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 40%, rgba(0,0,0,0.22) 100%)' }} />

              <div style={{ position: 'absolute', top: 30, left: 34, right: 34, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 16px rgba(239,68,68,0.75)' }} />
                  <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase' as const, color: 'rgba(255,249,244,0.86)', fontWeight: 700 }}>LIVE • Billboard</div>
                </div>
                <div style={{ padding: '10px 16px', borderRadius: 999, background: 'rgba(18,18,22,0.88)', border: '1px solid rgba(239,68,68,0.22)', fontFamily: mono, fontSize: 11, letterSpacing: '0.18em', color: '#F7F2EE', textTransform: 'uppercase' as const }}>Signal stable</div>
              </div>

              <div style={{ position: 'absolute', left: 40, top: 120, width: 440, padding: '24px 28px', borderRadius: 24, background: 'rgba(10,10,12,0.92)', border: '1px solid rgba(239,68,68,0.22)', boxShadow: '0 28px 90px rgba(239,68,68,0.18)', zIndex: 2 }}>
                <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.24em', color: '#ef4444', textTransform: 'uppercase' as const, fontWeight: 700, marginBottom: 12 }}>Now broadcasting</div>
                <div style={{ fontFamily: sora, fontWeight: 800, fontSize: 48, lineHeight: 1, letterSpacing: '-0.04em', color: '#F7F2EE' }}>Avenir Billboard</div>
                <div style={{ fontFamily: mono, fontSize: 12, color: 'rgba(245,239,234,0.72)', marginTop: 10, maxWidth: 380 }}>A broadcast surface that keeps your launch visible while every other feed burns out.</div>
                <div style={{ marginTop: 22 }}>
                  <div style={{ height: 12, borderRadius: 999, background: 'rgba(255,255,255,0.04)' }}>
                    <div style={{ width: `${proofProgress}%`, height: '100%', borderRadius: 999, background: 'linear-gradient(90deg, #ef4444, #991b1b)' }} />
                  </div>
                  <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: 10, letterSpacing: '0.2em', color: 'rgba(255,249,244,0.66)', textTransform: 'uppercase' as const }}>
                    <span>07:14 / 12:00</span>
                    <span>{Math.floor(proofProgress)}% live</span>
                  </div>
                </div>
              </div>

              <div style={{ position: 'absolute', inset: '152px 38px 38px 38px', borderRadius: 24, overflow: 'hidden', background: 'rgba(5,6,8,0.94)', border: '1px solid rgba(239,68,68,0.18)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }}>
                <OffthreadVideo
                  src={staticFile('billboard/lv_0_20260624023044.mp4')}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
                  startFrom={4}
                  muted
                />
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 18%, rgba(6,7,9,0.54) 100%)' }} />
                <div style={{ position: 'absolute', left: 28, bottom: 24, display: 'flex', alignItems: 'center', gap: 14, zIndex: 2 }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444', boxShadow: `0 0 ${14 + proofPulse * 14}px rgba(239,68,68,${0.4 + proofPulse * 0.3})` }} />
                  <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'rgba(255,249,244,0.82)' }}>Live playback</div>
                </div>
              </div>
            </div>
          </div>
        </AbsoluteFill>
      )}

      {problemOp > 0.001 && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: problemOp }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, transform: `scale(${problemScale})`, filter: `blur(${problemBlur}px)` }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase' as const, color: RED, fontWeight: 700 }}>Permanent archive</div>
              <div style={{ fontFamily: sora, fontWeight: 800, fontSize: 86, lineHeight: 1.02, letterSpacing: '-0.03em', color: RED_TEXT, textAlign: 'center' }}>Your slot lives here.</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 18, width: '82%', maxWidth: 1300 }}>
              {Array.from({ length: 5 }).map((_, index) => {
                const isFeatured = index === 2;
                return (
                  <div
                    key={index}
                    style={{
                      minHeight: 170,
                      borderRadius: 24,
                      background: isFeatured ? 'rgba(239,68,68,0.12)' : 'rgba(255,255,255,0.04)',
                      border: isFeatured ? `1px solid rgba(239,68,68,0.32)` : '1px solid rgba(255,255,255,0.08)',
                      boxShadow: isFeatured ? '0 20px 70px rgba(239,68,68,0.18)' : '0 18px 42px rgba(0,0,0,0.18)',
                      padding: '22px 18px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ width: 90, height: 10, borderRadius: 999, background: 'rgba(255,255,255,0.08)', marginBottom: 14 }} />
                      <div style={{ height: 10, width: isFeatured ? 140 : 110, borderRadius: 999, background: 'rgba(255,255,255,0.06)', marginBottom: 12 }} />
                      <div style={{ height: 10, width: isFeatured ? 100 : 86, borderRadius: 999, background: 'rgba(255,255,255,0.04)' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 18 }}>
                      <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.58)' }}>{isFeatured ? 'Featured' : 'Archived'}</span>
                      {isFeatured ? <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 12px rgba(239,68,68,0.45)' }} /> : <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'rgba(255,255,255,0.18)' }} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </AbsoluteFill>
      )}

      {applyOp > 0.001 && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: applyOp }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 34, transform: `scale(${formZoom})`, filter: `blur(${(1 - applyEnter) * 10}px)` }}>
            <div
              style={{
                flex: '0 0 520px',
                background: 'rgba(5,6,8,0.92)',
                border: '1px solid rgba(232,93,58,0.24)',
                borderRadius: 24,
                padding: '36px 34px',
                boxShadow: '0 36px 110px rgba(0,0,0,0.34)',
              }}
            >
              <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase' as const, color: RED, fontWeight: 700, marginBottom: 18 }}>Billboard includes</div>
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
                      opacity: interpolate(f, [410 + index * 12, 444 + index * 12], [0, 1], { easing: ease, ...clamp }),
                      transform: `translateY(${(1 - interpolate(f, [410 + index * 12, 444 + index * 12], [0, 1], { easing: ease, ...clamp })) * 12}px)`,
                    }}
                  >
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: RED }} />
                    <div style={{ fontFamily: sora, fontSize: 22, lineHeight: 1.2, fontWeight: 700, color: '#F5EFEA' }}>{line}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ position: 'relative', width: 760, minHeight: 430, opacity: playerOp, transform: `translateX(${playerEnter * 20}px) scale(${0.92 + playerEnter * 0.08})` }}>
              <div style={{ position: 'absolute', inset: -8, borderRadius: 28, overflow: 'hidden', pointerEvents: 'none', zIndex: -1, filter: 'blur(12px)', opacity: 0.5 }}>
                <div style={{ position: 'absolute', inset: '-50%', background: `conic-gradient(from ${spinDeg}deg, transparent 0%, rgba(239,68,68,0.35) 12%, rgba(153,27,27,0.3) 24%, transparent 40%, rgba(239,68,68,0.2) 58%, transparent 72%)` }} />
              </div>
              <div style={{ position: 'absolute', inset: -2, borderRadius: 24, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
                <div style={{ position: 'absolute', inset: '-50%', background: `conic-gradient(from ${spinDeg}deg, transparent 0%, ${RED} 10%, ${RED_DEEP} 18%, rgba(239,68,68,0.72) 36%, transparent 48%, transparent 60%, rgba(239,68,68,0.44) 74%, transparent 92%)` }} />
                <div style={{ position: 'absolute', inset: 2, borderRadius: 22, background: 'rgba(5,6,8,0.58)' }} />
              </div>
              <div style={{ position: 'absolute', inset: 0, borderRadius: 22, overflow: 'hidden', background: '#090B0D', zIndex: 1 }}>
                <OffthreadVideo
                  src={staticFile('billboard/lv_0_20260624023044.mp4')}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.86 }}
                  startFrom={4}
                  muted
                />
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 22%, rgba(6,7,9,0.56) 100%)' }} />
                <div style={{ position: 'absolute', left: 24, top: 24, right: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 16px rgba(239,68,68,0.75)' }} />
                    <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'rgba(255,249,244,0.85)', fontWeight: 700 }}>Playing live</div>
                  </div>
                  <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'rgba(255,249,244,0.66)' }}>01:26 / 05:00</div>
                </div>
                <div style={{ position: 'absolute', bottom: 36, left: 24, right: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
                  <div style={{ width: '76%', height: 10, borderRadius: 999, background: 'rgba(255,255,255,0.1)' }}>
                    <div style={{ width: `${progress}%`, height: '100%', borderRadius: 999, background: RED_BAR }} />
                  </div>
                  <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.18em', color: 'rgba(255,249,244,0.72)' }}>{Math.floor(progress)}%</div>
                </div>
              </div>
            </div>
          </div>
        </AbsoluteFill>
      )}

      {foreverOp > 0.001 && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: foreverOp }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, transform: `scale(${foreverScale})` }}>
            <div style={{ fontFamily: sora, fontWeight: 700, fontSize: 94, letterSpacing: '-0.03em', color: RED_TEXT, lineHeight: 1 }}>Your launch</div>
            <div style={{ fontFamily: sora, fontWeight: 800, fontSize: 104, letterSpacing: '-0.03em', lineHeight: 1, ...redFill, transform: `scale(${1 + foreverGlow * 0.02})` }}>lasts forever.</div>
          </div>
        </AbsoluteFill>
      )}

      {prodOp > 0.001 && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: prodOp }}>
          <div style={{ display: 'flex', gap: 32, width: '88%', maxWidth: 1360, justifyContent: 'center', alignItems: 'stretch' }}>
            <div
              style={{
                flex: '0 0 520px',
                background: 'rgba(8,8,10,0.95)',
                border: '1px solid rgba(239,68,68,0.18)',
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
                <div style={{ fontFamily: sora, fontWeight: 800, fontSize: 56, lineHeight: 1.02, letterSpacing: '-0.04em', color: '#F5EFEA', marginBottom: 18 }}>No video? We build it.</div>
                <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase' as const, color: 'rgba(255,249,244,0.72)', marginBottom: 20 }}>We deliver a launch-ready motion package when your team needs it most.</div>
                <div style={{ display: 'grid', gap: 16 }}>
                  {productionPoints.map((point, index) => (
                    <div
                      key={point}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 14,
                        opacity: interpolate(f, [740 + index * 10, 770 + index * 10], [0, 1], { easing: ease, ...clamp }),
                        transform: `translateY(${(1 - interpolate(f, [740 + index * 10, 770 + index * 10], [0, 1], { easing: ease, ...clamp })) * 14}px)`,
                      }}
                    >
                      <div style={{ width: 14, height: 14, borderRadius: '50%', background: RED, marginTop: 4 }} />
                      <div style={{ fontFamily: sora, fontSize: 22, lineHeight: 1.3, fontWeight: 700, color: '#F5EFEA' }}>{point}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 18 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: RED }} />
                <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: 'rgba(255,249,244,0.72)' }}>Production support included</div>
              </div>
            </div>

            <div style={{ flex: '0 0 620px', position: 'relative', minHeight: 430, borderRadius: 28, background: 'rgba(3,4,6,0.96)', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', boxShadow: '0 40px 130px rgba(0,0,0,0.32)' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 20%, rgba(239,68,68,0.16), transparent 30%)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 70%, rgba(255,255,255,0.04), transparent 22%)' }} />
              <div style={{ position: 'absolute', top: 28, left: 28, fontFamily: mono, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: 'rgba(255,249,244,0.68)', fontWeight: 700 }}>Production brief</div>
              <div style={{ position: 'absolute', top: 70, left: 28, right: 28, display: 'grid', gap: 14 }}> 
                <div style={{ padding: '18px 20px', borderRadius: 20, background: 'rgba(18,18,22,0.92)', border: '1px solid rgba(239,68,68,0.22)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'rgba(255,249,244,0.64)', fontWeight: 700 }}>Style</div>
                  <div style={{ fontFamily: sora, fontSize: 18, fontWeight: 700, color: '#F5EFEA' }}>Premium cinematic launch</div>
                </div>
                <div style={{ padding: '18px 20px', borderRadius: 20, background: 'rgba(18,18,22,0.92)', border: '1px solid rgba(239,68,68,0.22)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'rgba(255,249,244,0.64)', fontWeight: 700 }}>Deliverable</div>
                  <div style={{ fontFamily: sora, fontSize: 18, fontWeight: 700, color: '#F5EFEA' }}>Broadcast-ready video asset</div>
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', width: 152, height: 152, borderRadius: 28, background: 'rgba(18,18,22,0.78)', display: 'grid', placeItems: 'center', boxShadow: '0 24px 80px rgba(239,68,68,0.18)' }}>
                <div style={{ width: 62, height: 62, borderRadius: '50%', background: '#ef4444', display: 'grid', placeItems: 'center', boxShadow: '0 0 24px rgba(239,68,68,0.45)' }}>
                  <svg width={28} height={28} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5L19 12L8 19V5Z" fill="#111" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </AbsoluteFill>
      )}

      {ctaOp > 0.001 && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: ctaOp }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, textAlign: 'center', maxWidth: 1200, padding: '0 40px' }}>
            <div style={{ fontFamily: sora, fontWeight: 800, fontSize: 86, lineHeight: 1.05, letterSpacing: '-0.04em', color: '#F5EFEA' }}>Pay once. Stay visible forever.</div>
            <div style={{ fontFamily: mono, fontSize: 18, letterSpacing: '0.24em', color: 'rgba(255,245,240,0.76)', fontWeight: 700, textTransform: 'uppercase' as const }}>avenirreym.com/billboard</div>
            <div style={{ width: 78, height: 78, borderRadius: 18, background: 'linear-gradient(135deg, #ef4444 0%, #991b1b 100%)', boxShadow: '0 0 42px rgba(239,68,68,0.42)' }} />
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

export default BillBoardStoryboard;
