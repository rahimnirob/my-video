import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { base, sentinel, sora, mono, tracking } from '../../tokens';
import { ease, alpha } from '../constants';

/** Deliberately generic system sans — NOT an Avenir font. The blandness is the point. */
const SYS = 'Arial, "Helvetica Neue", Helvetica, sans-serif';
const GREY = '#E5E7EB';

const NAV_ITEMS = ['Home', 'Features', 'Pricing', 'About', 'Contact'];

/** A placeholder grey block — the "Figma wireframe" hero filler. */
const Block: React.FC<{ w: number; h: number; r?: number; color?: string; mb?: number }> = ({
  w,
  h,
  r = 6,
  color = GREY,
  mb = 0,
}) => <div style={{ width: w, height: h, borderRadius: r, background: color, marginBottom: mb }} />;

/**
 * SCENE 1 — TRADITIONAL (local 0–180). A bright, generic site mockup: nav bar
 * loads item-by-item, a "Pricing" dropdown pops open mechanically, then a dark
 * Avenir text panel slides up. Whole scene dims to 40% before the hard cut.
 */
const Traditional: React.FC = () => {
  const frame = useCurrentFrame();

  // fade in from black (0–15) and dim to 40% before the cut (150–180)
  const blackOut = interpolate(frame, [0, 15], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dim = interpolate(frame, [150, 180], [1, 0.4], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // nav items load in left-to-right, stagger 8f each
  const navItemOpacity = (i: number) =>
    interpolate(frame, [i * 8, i * 8 + 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // dropdown opens at F60 — flat, mechanical pop (no smooth easing, on purpose)
  const dropOpen = frame >= 60;

  // text overlay slides up from F90
  const overlayT = interpolate(frame, [90, 110], [0, 1], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: '#F4F5F7', opacity: dim }}>
      {/* NAV BAR */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 56,
          background: '#FFFFFF',
          borderBottom: `1px solid ${GREY}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 40px',
          gap: 32,
        }}
      >
        {/* logo placeholder */}
        <div style={{ width: 80, height: 28, borderRadius: 6, background: '#9CA3AF', opacity: navItemOpacity(0) }} />

        {/* center nav items */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 32, position: 'relative' }}>
          {NAV_ITEMS.map((item, i) => (
            <div
              key={item}
              style={{
                position: 'relative',
                fontFamily: SYS,
                fontSize: 14,
                color: '#374151',
                opacity: navItemOpacity(i),
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              {item}
              {item === 'Pricing' && (
                <span style={{ fontSize: 9, color: '#9CA3AF', transform: 'translateY(1px)' }}>▼</span>
              )}
              {/* dropdown under Pricing */}
              {item === 'Pricing' && dropOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 30,
                    left: -16,
                    width: 160,
                    background: '#FFFFFF',
                    border: `1px solid ${GREY}`,
                    borderRadius: 6,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                    padding: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                  }}
                >
                  {[0, 1, 2].map((d) => (
                    <Block key={d} w={120} h={10} r={3} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* right buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, opacity: navItemOpacity(5) }}>
          <span style={{ fontFamily: SYS, fontSize: 14, color: '#6B7280' }}>Log in</span>
          <span
            style={{
              fontFamily: SYS,
              fontSize: 14,
              color: '#FFFFFF',
              background: '#111827',
              borderRadius: 999,
              padding: '8px 16px',
            }}
          >
            Get started
          </span>
        </div>
      </div>

      {/* HERO WIREFRAME */}
      <div style={{ position: 'absolute', top: 180, left: 160, opacity: interpolate(frame, [20, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
        <Block w={620} h={44} mb={20} />
        <Block w={520} h={44} mb={36} />
        <Block w={420} h={18} color="#EDEEF1" mb={12} />
        <Block w={460} h={18} color="#EDEEF1" mb={40} />
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ width: 160, height: 48, borderRadius: 8, border: `1.5px solid #CBD0D8` }} />
          <div style={{ width: 160, height: 48, borderRadius: 8, border: `1.5px solid #CBD0D8` }} />
        </div>
      </div>

      {/* black fade-in cover */}
      <AbsoluteFill style={{ background: '#000', opacity: blackOut, pointerEvents: 'none' }} />

      {/* TEXT OVERLAY — dark Avenir panel, bottom third */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 280,
          background: alpha(base.bgBase, 0.86),
          opacity: overlayT,
          transform: `translateY(${interpolate(overlayT, [0, 1], [16, 0])}px)`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 160px',
          gap: 18,
        }}
      >
        <span
          style={{
            fontFamily: mono,
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: tracking.microLabel,
            textTransform: 'uppercase',
            color: sentinel.accent,
          }}
        >
          TRADITIONAL NAVIGATION
        </span>
        <span style={{ fontFamily: sora, fontSize: 32, fontWeight: 700, color: base.textPrimary, letterSpacing: tracking.headlineTight, lineHeight: 1.25 }}>
          "The same menu. Every website. Since 2005."
        </span>
      </div>
    </AbsoluteFill>
  );
};

export default Traditional;
