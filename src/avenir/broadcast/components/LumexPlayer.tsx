import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { sora, manrope, mono } from '../../tokens';
import { LUMEX_ACCENT, LUMEX_LIVE, lumex } from '../../lumex';

/**
 * LumexPlayer — the Avenir Billboard player with a product slot LIVE inside it
 * (the founder's note: show what they buy, not abstract bars). Chrome modeled on
 * the onair BroadcastPlayer but retuned to the soft LumeX palette:
 *   ● ON AIR        SEASON 02
 *   [ product video playing ]
 *   Founders Tool        0:20 ▶
 *   ─────────────────────────
 *   INTRO
 * The duration + section label + progress switch between the INTRO and FEATURE
 * slots; everything else (chrome, ON AIR pulse, the live screen) persists.
 */

export type LumexPlayerProps = {
  width: number;
  productName: string;
  durationLabel: string; // "0:20" | "1:30"
  sectionLabel: string; // "INTRO" | "FEATURE EXPLAINER"
  progress: number; // 0..1
  /** 'intro' shows the title slate; 'feature' shows the detailed dashboard. */
  screen?: 'intro' | 'feature';
  appear?: number; // 0..1 enter
};

/* A compact, living product screen (the "video playing"). */
const ScreenMock: React.FC<{ w: number }> = ({ w }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const m = w / 600;
  const accent = LUMEX_ACCENT;
  const rgb = '224,82,111';
  const bars = Array.from({ length: 11 }, (_, i) => {
    const base = 0.4 + 0.5 * Math.abs(Math.sin(i * 1.1 + 0.6));
    return Math.min(1, base * (0.85 + 0.15 * Math.sin(t * 2 + i * 0.5)));
  });
  const area = Array.from({ length: 22 }, (_, i) => {
    const x = i / 21;
    return 0.4 + 0.28 * Math.sin(x * 6 + t * 0.8) + 0.16 * Math.sin(x * 13 + t * 1.4);
  });

  return (
    <div
      style={{
        width: w,
        height: w * 0.56,
        borderRadius: 12 * m,
        overflow: 'hidden',
        display: 'flex',
        background: 'linear-gradient(160deg, #140e12, #0d090c)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: `0 0 ${64 * m}px rgba(${rgb},0.26), 0 ${20 * m}px ${48 * m}px rgba(0,0,0,0.6)`,
        position: 'relative',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 70% 60% at 28% 26%, rgba(${rgb},0.16), transparent 60%)` }} />
      {/* sidebar */}
      <div style={{ width: w * 0.2, padding: 13 * m, display: 'flex', flexDirection: 'column', gap: 9 * m, borderRight: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 * m, marginBottom: 5 * m }}>
          <span style={{ width: 11 * m, height: 11 * m, borderRadius: 3 * m, background: accent }} />
          <span style={{ fontFamily: sora, fontWeight: 700, fontSize: 9 * m, color: '#fff' }}>LumiX</span>
        </div>
        {['Overview', 'Pipeline', 'Signals', 'Reports'].map((n, i) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 6 * m, opacity: i === 0 ? 1 : 0.5 }}>
            <span style={{ width: 5 * m, height: 5 * m, borderRadius: '50%', background: i === 0 ? accent : 'rgba(255,255,255,0.3)' }} />
            <span style={{ fontFamily: manrope, fontSize: 7.5 * m, color: i === 0 ? '#fff' : 'rgba(255,255,255,0.55)' }}>{n}</span>
          </div>
        ))}
      </div>
      {/* main */}
      <div style={{ flex: 1, padding: 14 * m, display: 'flex', flexDirection: 'column', gap: 10 * m }}>
        <div style={{ fontFamily: sora, fontWeight: 700, fontSize: 13 * m, color: '#fff' }}>Good morning, founder</div>
        <div style={{ display: 'flex', gap: 10 * m }}>
          {[['Reach', '24.1k'], ['Live', '92%'], ['Saves', '317']].map(([l, v], i) => (
            <div key={l} style={{ flex: 1, padding: 9 * m, borderRadius: 7 * m, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontFamily: manrope, fontSize: 7 * m, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{l}</div>
              <div style={{ fontFamily: sora, fontWeight: 700, fontSize: 15 * m, color: i === 1 ? '#dcdcdc' : accent, marginTop: 2 * m }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10 * m, flex: 1 }}>
          <div style={{ flex: 1.2, padding: 10 * m, borderRadius: 7 * m, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontFamily: manrope, fontSize: 7.5 * m, color: 'rgba(255,255,255,0.5)', marginBottom: 6 * m }}>Engagement · weekly</div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 4 * m }}>
              {bars.map((b, i) => (
                <div key={i} style={{ flex: 1, height: `${b * 100}%`, borderRadius: 2 * m, background: `linear-gradient(180deg, ${accent}, rgba(${rgb},0.25))` }} />
              ))}
            </div>
          </div>
          <div style={{ flex: 1, padding: 10 * m, borderRadius: 7 * m, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ fontFamily: manrope, fontSize: 7.5 * m, color: 'rgba(255,255,255,0.5)' }}>Momentum</div>
            <svg viewBox="0 0 100 50" preserveAspectRatio="none" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, width: '100%', height: '70%' }}>
              <defs>
                <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={`rgba(${rgb},0.5)`} />
                  <stop offset="100%" stopColor={`rgba(${rgb},0)`} />
                </linearGradient>
              </defs>
              <polygon points={`0,50 ${area.map((y, i) => `${(i / 21) * 100},${50 - y * 44}`).join(' ')} 100,50`} fill="url(#lg)" />
              <polyline points={area.map((y, i) => `${(i / 21) * 100},${50 - y * 44}`).join(' ')} fill="none" stroke={accent} strokeWidth={1.2} />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

/* The 20-second intro slate (what plays first in the slot). */
const IntroCard: React.FC<{ w: number }> = ({ w }) => {
  const m = w / 600;
  return (
    <div style={{ width: w, height: w * 0.56, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 15 * m }}>
      <div
        style={{
          width: 42 * m,
          height: 42 * m,
          border: `${2.5 * m}px solid ${LUMEX_ACCENT}`,
          borderRadius: 8 * m,
          transform: 'rotate(45deg)',
          boxShadow: `0 0 ${20 * m}px rgba(224,82,111,0.5)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ width: 9 * m, height: 9 * m, borderRadius: '50%', background: LUMEX_ACCENT, transform: 'rotate(-45deg)' }} />
      </div>
      <div style={{ fontFamily: mono, fontSize: 13 * m, letterSpacing: '0.34em', color: 'rgba(220,220,220,0.6)', marginTop: 8 * m }}>INTRODUCING</div>
      <div style={{ fontFamily: sora, fontWeight: 800, fontSize: 60 * m, letterSpacing: '-0.01em', color: '#fff' }}>LumiX</div>
      <div style={{ fontFamily: manrope, fontSize: 13 * m, letterSpacing: '0.08em', color: 'rgba(220,220,220,0.45)' }}>Smart Data · Smarter Decisions</div>
    </div>
  );
};

const LumexPlayer: React.FC<LumexPlayerProps> = ({ width, productName, durationLabel, sectionLabel, progress, screen = 'feature', appear = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const W = width;
  const H = W * (9 / 16);
  const u = W / 1200;
  const radius = 16 * u;
  const pulse = 0.5 + 0.5 * Math.sin((frame / fps) * Math.PI * 2);
  const rgb = '224,82,111';

  return (
    <div style={{ position: 'relative', width: W, height: H, borderRadius: radius, transform: `scale(${0.96 + 0.04 * appear})`, opacity: appear }}>
      {/* soft crimson halo */}
      <div style={{ position: 'absolute', inset: -28 * u, borderRadius: radius + 28 * u, background: `radial-gradient(ellipse 80% 80% at 50% 60%, rgba(${rgb},0.4), transparent 70%)`, filter: `blur(${30 * u}px)`, opacity: 0.7 }} />

      {/* screen */}
      <div style={{ position: 'absolute', inset: 0, borderRadius: radius, overflow: 'hidden', background: 'radial-gradient(ellipse 90% 80% at 50% 38%, #130d11 0%, #0a070a 78%)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: `0 ${24 * u}px ${70 * u}px rgba(0,0,0,0.6)` }}>
        {/* ghost product name */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: sora, fontWeight: 800, fontSize: W * 0.11, letterSpacing: '-0.02em', color: 'rgba(246,194,206,0.05)', whiteSpace: 'nowrap', transform: `translateY(-${28 * u}px)` }}>{productName}</span>
        </div>

        {/* the slot content — intro slate, then the live product screen */}
        <div style={{ position: 'absolute', left: '50%', top: '43%', transform: 'translate(-50%, -50%)' }}>
          {screen === 'feature' ? <ScreenMock w={W * 0.6} /> : <IntroCard w={W * 0.6} />}
        </div>

        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 86% 84% at 50% 46%, transparent 42%, rgba(8,5,7,0.72) 100%)' }} />

        {/* topbar: ON AIR · SEASON 02 */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: `${12 * u}px ${16 * u}px`, background: 'linear-gradient(180deg, rgba(8,5,7,0.8) 0%, transparent 100%)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 * u }}>
            <span style={{ width: 8 * u, height: 8 * u, borderRadius: '50%', background: LUMEX_LIVE, boxShadow: `0 0 ${10 * u}px rgba(255,0,80,${0.4 + 0.5 * pulse})` }} />
            <span style={{ fontFamily: mono, fontSize: 13 * u, letterSpacing: '0.2em', color: LUMEX_LIVE, fontWeight: 600 }}>ON AIR</span>
          </span>
          <span style={{ fontFamily: mono, fontSize: 13 * u, letterSpacing: '0.2em', color: lumex.brightGray, opacity: 0.7 }}>SEASON 02</span>
        </div>

        {/* bottom chrome: name · duration ▶ / progress / section label */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: `${24 * u}px ${18 * u}px ${16 * u}px`, background: 'linear-gradient(0deg, rgba(8,5,7,0.92) 0%, transparent 100%)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 9 * u }}>
            <span style={{ fontFamily: sora, fontWeight: 700, fontSize: 19 * u, color: '#fff' }}>{productName}</span>
            <span style={{ fontFamily: mono, fontSize: 14 * u, letterSpacing: '0.06em', color: lumex.brightGray }}>{durationLabel} ▶</span>
          </div>
          <div style={{ position: 'relative', width: '100%', height: 3 * u, background: 'rgba(255,255,255,0.1)', borderRadius: 999 }}>
            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${progress * 100}%`, background: LUMEX_ACCENT, borderRadius: 999, boxShadow: `0 0 ${8 * u}px rgba(${rgb},0.6)` }}>
              <span style={{ position: 'absolute', right: -2 * u, top: '50%', transform: 'translateY(-50%)', width: 6 * u, height: 6 * u, borderRadius: '50%', background: '#fff', boxShadow: `0 0 ${8 * u}px rgba(${rgb},0.9)` }} />
            </div>
          </div>
          <div style={{ fontFamily: mono, fontSize: 11 * u, letterSpacing: '0.24em', color: 'rgba(220,220,220,0.6)', marginTop: 9 * u }}>{sectionLabel}</div>
        </div>
      </div>
    </div>
  );
};

export default LumexPlayer;
