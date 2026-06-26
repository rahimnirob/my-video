import React from 'react';
import { AbsoluteFill, Img, interpolate, useCurrentFrame } from 'remotion';
import { base, sentinel, pulse, sora, manrope, mono, tracking } from '../../tokens';
import { DPadKey, CenterDiamond } from '../components';
import { PULSE_SHOT, ease, alpha } from '../constants';

/** Transient caption that appears beside the D-Pad during a press. */
const PressCaption: React.FC<{ text: string; from: number; to: number }> = ({ text, from, to }) => {
  const frame = useCurrentFrame();
  if (frame < from || frame > to) return null;
  const t = interpolate(frame, [from, from + 8, to - 6, to], [0, 1, 1, 0], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <span
      style={{
        fontFamily: sora,
        fontSize: 24,
        fontWeight: 700,
        color: base.textPrimary,
        opacity: t,
        transform: `translateX(${interpolate(t, [0, 1], [-12, 0])}px)`,
        letterSpacing: tracking.headlineTight,
      }}
    >
      {text}
    </span>
  );
};

/**
 * SCENE 5 — DPAD (local 0–210). The signature moment: the cockpit D-Pad enters
 * key-by-key, the centre crystal pulses throughout, and three presses
 * (right → up → left) animate with tilt + ripple + a caption.
 */
const DPad: React.FC = () => {
  const frame = useCurrentFrame();

  const headIn = interpolate(frame, [20, 35], [0, 1], { easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const diamondIn = interpolate(frame, [32, 50], [0, 1], { easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // up-press detail "zoom" of the pulse screenshot
  const upThumb = interpolate(frame, [145, 158, 178, 188], [0, 0.7, 0.7, 0], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: base.bgBase }}>
      {/* subtle violet "system alive" glow */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 50% 50% at 50% 50%, ${alpha(pulse.accent, 0.06)} 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
        <span
          style={{
            fontFamily: mono,
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: tracking.microLabel,
            textTransform: 'uppercase',
            color: alpha(sentinel.accent, 0.5),
            opacity: headIn,
          }}
        >
          CAROUSEL CONTROL
        </span>

        {/* D-Pad cross */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <DPadKey direction="up" arrow="↑" label="VIEW DETAILS" entranceStart={0} pressFrame={140} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <DPadKey direction="left" arrow="←" label="PREV LEFT" entranceStart={24} pressFrame={190} />
            <div style={{ opacity: diamondIn, transform: `scale(${interpolate(diamondIn, [0, 1], [0.85, 1])})` }}>
              <CenterDiamond />
            </div>
            <DPadKey direction="right" arrow="→" label="MOVE RIGHT" entranceStart={8} pressFrame={80} />
          </div>
          <DPadKey direction="down" arrow="↓" label="CLOSE" entranceStart={16} pressFrame={null} />
        </div>

        <span
          style={{
            fontFamily: manrope,
            fontSize: 16,
            color: base.textSecondary,
            opacity: headIn,
          }}
        >
          Precision control. Built in.
        </span>
      </AbsoluteFill>

      {/* press captions, to the right of the D-Pad */}
      <div style={{ position: 'absolute', left: '64%', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <PressCaption text="→ Next product" from={85} to={120} />
        <PressCaption text="↑ Open details" from={145} to={185} />
        <PressCaption text="← Previous" from={192} to={210} />
      </div>

      {/* up-press: zoomed detail preview */}
      {upThumb > 0 && (
        <div
          style={{
            position: 'absolute',
            right: 180,
            top: '28%',
            width: 300,
            height: 185,
            borderRadius: 12,
            overflow: 'hidden',
            border: `1px solid ${alpha(sentinel.accent, 0.2)}`,
            opacity: upThumb,
            boxShadow: `0 0 40px ${alpha(pulse.accent, 0.2)}`,
          }}
        >
          <Img src={PULSE_SHOT} style={{ width: '140%', height: '140%', objectFit: 'cover', objectPosition: 'center' }} />
        </div>
      )}
    </AbsoluteFill>
  );
};

export default DPad;
