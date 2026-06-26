import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { sora, manrope } from '../../tokens';
import { s } from '../layout';

/**
 * ProductDemo — a living SaaS dashboard mock that plays INSIDE the broadcast
 * player (so the screen is never a dark void). Sidebar + greeting + animated
 * analytics, in the product's accent colour. Matches the live page's framed,
 * glowing product-video look.
 */
export type ProductDemoProps = {
  /** Accent 'r,g,b' (the product's colour). */
  rgb?: string;
  width: number;
};

const NAV = ['Dashboard', 'Tables', 'Chat', 'Calendar', 'Reports', 'Settings'];

const ProductDemo: React.FC<ProductDemoProps> = ({ rgb = '120,150,255', width }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const height = width * 0.6;
  const accent = `rgb(${rgb})`;
  const t = frame / fps;

  const bars = Array.from({ length: 12 }, (_, i) => {
    const base = 0.35 + 0.55 * Math.abs(Math.sin(i * 1.1 + 0.6));
    const live = 0.85 + 0.15 * Math.sin(t * 2 + i * 0.5);
    return Math.min(1, base * live);
  });
  const area = Array.from({ length: 22 }, (_, i) => {
    const x = i / 21;
    return 0.35 + 0.3 * Math.sin(x * 6 + t * 0.8) + 0.18 * Math.sin(x * 13 + t * 1.4);
  });
  const cursorOn = Math.floor(t * 1.6) % 2 === 0;

  return (
    <div
      style={{
        width,
        height,
        borderRadius: s(10),
        overflow: 'hidden',
        display: 'flex',
        background: 'linear-gradient(160deg, #0c1018, #0a0d14)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: `0 0 ${s(60)}px rgba(${rgb},0.28), 0 ${s(20)}px ${s(50)}px rgba(0,0,0,0.6)`,
        position: 'relative',
      }}
    >
      {/* glow wash */}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 70% 60% at 30% 30%, rgba(${rgb},0.14), transparent 60%)` }} />

      {/* sidebar */}
      <div style={{ width: width * 0.2, padding: s(12), display: 'flex', flexDirection: 'column', gap: s(9), borderRight: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: s(6), marginBottom: s(6) }}>
          <span style={{ width: s(10), height: s(10), borderRadius: s(3), background: accent }} />
          <span style={{ fontFamily: sora, fontWeight: 700, fontSize: s(9), color: '#fff' }}>Lumen</span>
        </div>
        {NAV.map((n, i) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', gap: s(6), opacity: i === 0 ? 1 : 0.5 }}>
            <span style={{ width: s(5), height: s(5), borderRadius: '50%', background: i === 0 ? accent : 'rgba(255,255,255,0.3)' }} />
            <span style={{ fontFamily: manrope, fontSize: s(7.5), color: i === 0 ? '#fff' : 'rgba(255,255,255,0.55)' }}>{n}</span>
          </div>
        ))}
      </div>

      {/* main */}
      <div style={{ flex: 1, padding: s(14), display: 'flex', flexDirection: 'column', gap: s(10), position: 'relative' }}>
        <div>
          <div style={{ fontFamily: sora, fontWeight: 700, fontSize: s(13), color: '#fff' }}>Hello, founder</div>
          <div style={{ fontFamily: manrope, fontSize: s(9), color: 'rgba(255,255,255,0.5)', marginTop: s(2) }}>
            How can I help you today?
            <span style={{ display: 'inline-block', width: s(2), height: s(9), background: accent, marginLeft: s(3), transform: 'translateY(2px)', opacity: cursorOn ? 1 : 0 }} />
          </div>
        </div>

        {/* metric row */}
        <div style={{ display: 'flex', gap: s(10) }}>
          {[['Documents', '1,283', accent], ['Active', '92%', '#34d399'], ['Tasks', '47', '#F0A868']].map(([l, v, c]) => (
            <div key={l} style={{ flex: 1, padding: s(9), borderRadius: s(7), background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontFamily: manrope, fontSize: s(7), color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{l}</div>
              <div style={{ fontFamily: sora, fontWeight: 700, fontSize: s(15), color: c as string, marginTop: s(2) }}>{v}</div>
            </div>
          ))}
        </div>

        {/* charts row */}
        <div style={{ display: 'flex', gap: s(10), flex: 1 }}>
          {/* bar chart */}
          <div style={{ flex: 1.2, padding: s(10), borderRadius: s(7), background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontFamily: manrope, fontSize: s(7.5), color: 'rgba(255,255,255,0.5)', marginBottom: s(6) }}>Analytics · weekly</div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: s(4) }}>
              {bars.map((b, i) => (
                <div key={i} style={{ flex: 1, height: `${b * 100}%`, borderRadius: s(2), background: `linear-gradient(180deg, ${accent}, rgba(${rgb},0.25))`, boxShadow: `0 0 ${s(6)}px rgba(${rgb},0.4)` }} />
              ))}
            </div>
          </div>
          {/* area chart */}
          <div style={{ flex: 1, padding: s(10), borderRadius: s(7), background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ fontFamily: manrope, fontSize: s(7.5), color: 'rgba(255,255,255,0.5)', marginBottom: s(6) }}>Costs · trend</div>
            <svg viewBox="0 0 100 50" preserveAspectRatio="none" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, width: '100%', height: '72%' }}>
              <defs>
                <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={`rgba(${rgb},0.5)`} />
                  <stop offset="100%" stopColor={`rgba(${rgb},0)`} />
                </linearGradient>
              </defs>
              <polygon
                points={`0,50 ${area.map((y, i) => `${(i / 21) * 100},${50 - y * 44}`).join(' ')} 100,50`}
                fill="url(#ag)"
              />
              <polyline
                points={area.map((y, i) => `${(i / 21) * 100},${50 - y * 44}`).join(' ')}
                fill="none"
                stroke={accent}
                strokeWidth={1.2}
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDemo;
