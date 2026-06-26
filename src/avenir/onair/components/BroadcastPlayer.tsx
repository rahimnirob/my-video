import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { sora, mono, manrope, billboard } from '../../tokens';
import type { Product } from '../products';
import ProductDemo from './ProductDemo';

/**
 * BroadcastPlayer — the Billboard player, matched to the live page. All chrome
 * is sized in `u` (proportional to the player width), so it stays compact and
 * never congests the frame. Ghost product name + living demo inside.
 */
export type BroadcastPlayerProps = {
  product: Product;
  width?: number;
  progress?: number;
  views?: number;
  tier?: 'STD' | 'PRI';
  scale?: number;
  demoRgb?: string;
};

const BroadcastPlayer: React.FC<BroadcastPlayerProps> = ({
  product,
  width = 1100,
  progress = 0.3,
  views = 0,
  tier = 'PRI',
  scale = 1,
  demoRgb = '96,150,255',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const height = width * (9 / 21);
  const u = width / 1100; // chrome unit — everything scales with the player
  const radius = 12 * u;

  const spin = ((frame % (8 * fps)) / (8 * fps)) * 360;
  const conic = `conic-gradient(from ${spin}deg, transparent 0deg, transparent 26deg, ${billboard.primary} 58deg, ${billboard.secondary} 86deg, transparent 128deg, transparent 206deg, ${billboard.primary} 238deg, ${billboard.secondary} 266deg, transparent 308deg)`;
  const pulse = 0.5 + 0.5 * Math.sin((frame / (1 * fps)) * Math.PI * 2);
  const tickerX = -((frame % (14 * fps)) / (14 * fps)) * 50;

  return (
    <div style={{ position: 'relative', width, height, borderRadius: radius, transform: `scale(${scale})` }}>
      {/* halo bloom + ring */}
      <div style={{ position: 'absolute', inset: -7 * u, borderRadius: radius + 7 * u, background: conic, filter: `blur(${9 * u}px)`, opacity: 0.6 }} />
      <div
        style={{
          position: 'absolute',
          inset: -2 * u,
          borderRadius: radius + 2 * u,
          background: conic,
          WebkitMask: `radial-gradient(closest-side, transparent calc(100% - ${2.5 * u}px), #000 calc(100% - ${2.5 * u}px))`,
          mask: `radial-gradient(closest-side, transparent calc(100% - ${2.5 * u}px), #000 calc(100% - ${2.5 * u}px))`,
        }}
      />

      {/* screen */}
      <div style={{ position: 'absolute', inset: 0, borderRadius: radius, overflow: 'hidden', background: 'radial-gradient(ellipse 90% 80% at 50% 40%, #0a0e16 0%, #050608 75%)' }}>
        {/* ghost product name */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: sora, fontWeight: 800, fontSize: width * 0.15, letterSpacing: '-0.02em', color: 'rgba(220,228,245,0.06)', whiteSpace: 'nowrap', transform: `translateY(-${14 * u}px)` }}>
            {product.name}
          </span>
        </div>

        {/* living product demo */}
        <div style={{ position: 'absolute', left: '50%', top: '46%', transform: 'translate(-50%, -50%)' }}>
          <ProductDemo rgb={demoRgb} width={width * 0.6} />
        </div>

        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 78% at 50% 50%, transparent 40%, rgba(5,6,8,0.66) 100%)' }} />

        {/* topbar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: `${9 * u}px ${13 * u}px`, background: 'linear-gradient(180deg, rgba(5,6,8,0.78) 0%, transparent 100%)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 * u }}>
            <span style={{ width: 6 * u, height: 6 * u, borderRadius: '50%', background: '#ef4444', boxShadow: `0 0 ${8 * u}px rgba(239,68,68,${0.4 + 0.5 * pulse})` }} />
            <span style={{ fontFamily: mono, fontSize: 11 * u, letterSpacing: '0.16em', color: 'rgba(239,68,68,0.9)', fontWeight: 600 }}>LIVE</span>
          </span>
          <span style={{ fontFamily: mono, fontSize: 11 * u, letterSpacing: '0.14em', color: 'rgba(230,234,242,0.34)' }}>{views.toLocaleString('en-US')} WATCHING</span>
        </div>

        {/* info card */}
        <div style={{ position: 'absolute', left: 13 * u, bottom: 26 * u, padding: `${8 * u}px ${12 * u}px`, borderRadius: 7 * u, background: 'rgba(5,6,8,0.74)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 * u, marginBottom: 4 * u }}>
            <span style={{ width: 5 * u, height: 5 * u, borderRadius: '50%', background: billboard.primary, boxShadow: `0 0 ${6 * u}px ${billboard.primary}` }} />
            <span style={{ fontFamily: mono, fontSize: 9 * u, letterSpacing: '0.2em', color: billboard.primary, fontWeight: 600 }}>NOW BROADCASTING</span>
            <span style={{ fontFamily: mono, fontSize: 8 * u, letterSpacing: '0.1em', color: billboard.gold, border: `1px solid ${billboard.gold}55`, borderRadius: 4 * u, padding: `${1 * u}px ${4 * u}px` }}>{tier}</span>
          </div>
          <div style={{ fontFamily: sora, fontWeight: 700, fontSize: 17 * u, color: '#fff' }}>{product.name}</div>
          <div style={{ fontFamily: manrope, fontSize: 10 * u, color: '#8F96A3', marginTop: 1 * u }}>{product.desc}</div>
        </div>

        {/* watch full */}
        <div style={{ position: 'absolute', right: 13 * u, bottom: 30 * u, display: 'inline-flex', alignItems: 'center', gap: 5 * u, padding: `${6 * u}px ${11 * u}px`, borderRadius: 6 * u, background: billboard.primary, fontFamily: mono, fontSize: 9 * u, letterSpacing: '0.1em', color: '#fff', fontWeight: 700, boxShadow: `0 0 ${12 * u}px rgba(232,93,58,0.4)` }}>
          ▷ WATCH FULL
        </div>
      </div>

      {/* progress bar */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 18 * u, height: 3 * u, background: 'rgba(255,255,255,0.06)' }}>
        <div style={{ height: '100%', width: `${progress * 100}%`, background: `linear-gradient(90deg, ${billboard.primary}, ${billboard.secondary})`, boxShadow: `0 0 ${7 * u}px rgba(232,93,58,0.4)`, position: 'relative' }}>
          <span style={{ position: 'absolute', right: -2 * u, top: '50%', transform: 'translateY(-50%)', width: 5 * u, height: 5 * u, borderRadius: '50%', background: billboard.secondary, boxShadow: `0 0 ${7 * u}px ${billboard.secondary}` }} />
        </div>
      </div>

      {/* ticker */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 18 * u, overflow: 'hidden', background: '#050608', borderTop: '1px solid rgba(255,255,255,0.05)', borderRadius: `0 0 ${radius}px ${radius}px` }}>
        <div style={{ display: 'flex', whiteSpace: 'nowrap', transform: `translateX(${tickerX}%)`, position: 'absolute', top: '50%', marginTop: -5 * u }}>
          {[0, 1].map((c) => (
            <span key={c} style={{ fontFamily: mono, fontSize: 9 * u, letterSpacing: '0.08em', color: 'rgba(230,234,242,0.3)', textTransform: 'uppercase', paddingRight: 40 * u }}>
              ● NOW BROADCASTING: <span style={{ color: billboard.primary }}>{product.name}</span> — SEASON 2026 — 30-DAY CINEMATIC BROADCAST — CURATED, NOT VOTED — NEXT UP: <span style={{ color: billboard.secondary }}>CARGO</span>&nbsp;&nbsp;▌▌▌&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BroadcastPlayer;
