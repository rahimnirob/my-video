import React from 'react';
import { AbsoluteFill, Img, interpolate, useCurrentFrame } from 'remotion';
import { base, sentinel, pulse, mono, tracking } from '../../tokens';
import { CommandSequence } from '../components';
import { GLASS, PULSE_SHOT, ease, alpha } from '../constants';

/* ── left-rail status labels ─────────────────────────────────────────────── */
const RAIL = [
  { text: 'NAVIGATE', from: 0, to: 80 },
  { text: 'FILTER', from: 100, to: 180 },
  { text: 'CONTROL', from: 200, to: 280 },
];

const RailLabel: React.FC<{ text: string; active: boolean }> = ({ text, active }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <span
      style={{
        width: 5,
        height: 5,
        borderRadius: '50%',
        background: active ? sentinel.accent : base.textMuted,
        boxShadow: active ? `0 0 8px ${alpha(sentinel.accent, 0.7)}` : 'none',
      }}
    />
    <span
      style={{
        fontFamily: mono,
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: tracking.microLabel,
        textTransform: 'uppercase',
        color: active ? sentinel.accent : base.textMuted,
      }}
    >
      {text}
    </span>
  </div>
);

/* ── cmd 1: pulse screenshot preview ─────────────────────────────────────── */
const ThumbPreview: React.FC<{ from: number; to: number }> = ({ from, to }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [from, from + 12, to - 8, to], [0, 0.6, 0.6, 0], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  if (op <= 0) return null;
  const y = interpolate(frame, [from, from + 12], [8, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <div
      style={{
        width: 380,
        height: 230,
        borderRadius: 12,
        overflow: 'hidden',
        border: `1px solid ${GLASS.border}`,
        opacity: op,
        transform: `translateY(${y}px)`,
        boxShadow: `0 0 40px ${alpha(pulse.accent, 0.15)}`,
      }}
    >
      <Img src={PULSE_SHOT} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
};

/* ── cmd 2: filtered card grid (generic placeholder cards) ────────────────── */
const CardGrid: React.FC<{ from: number; to: number }> = ({ from, to }) => {
  const frame = useCurrentFrame();
  const out = interpolate(frame, [to - 8, to], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  if (frame < from || out <= 0) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, opacity: out }}>
      {[0, 1, 2].map((i) => {
        const t = interpolate(frame, [from + i * 8, from + i * 8 + 12], [0, 1], {
          easing: ease,
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        return (
          <div
            key={i}
            style={{
              width: 360,
              height: 64,
              background: GLASS.bg,
              border: `1px solid ${GLASS.border}`,
              borderRadius: 10,
              opacity: t,
              transform: `translateY(${interpolate(t, [0, 1], [-14, 0])}px)`,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              paddingLeft: 18,
              position: 'relative',
            }}
          >
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: pulse.accent }} />
            <div style={{ width: 36, height: 36, borderRadius: 8, background: alpha(pulse.accent, 0.18) }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ width: 180, height: 8, borderRadius: 3, background: alpha(base.textPrimary, 0.2) }} />
              <div style={{ width: 120, height: 6, borderRadius: 3, background: alpha(base.textPrimary, 0.1) }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ── cmd 3: three cards scrolling past (jump forward 3) ───────────────────── */
const ScrollCards: React.FC<{ from: number; to: number }> = ({ from, to }) => {
  const frame = useCurrentFrame();
  if (frame < from || frame > to) return null;
  const p = interpolate(frame, [from, to - 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const shift = interpolate(p, [0, 1], [120, -420]);
  const blur = interpolate(p, [0, 0.5, 1], [6, 10, 6]);
  const op = interpolate(frame, [from, from + 6, to - 8, to], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <div style={{ display: 'flex', gap: 16, transform: `translateX(${shift}px)`, filter: `blur(${blur}px)`, opacity: op }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 150,
            height: 200,
            borderRadius: 12,
            border: `1px solid ${pulse.accentHover}`,
            background: alpha(pulse.accent, 0.06),
            flex: '0 0 auto',
          }}
        />
      ))}
    </div>
  );
};

/**
 * SCENE 4 — COMMANDS (local 0–300). Three commands type into the centre panel
 * (navigate / filter / discover), each flashing green and producing a confirming
 * visual on the right. The left rail lights its label while each command runs.
 */
const Commands: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: base.bgBase }}>
      {/* left rail */}
      <div style={{ position: 'absolute', left: 120, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 22 }}>
        {RAIL.map((r) => (
          <RailLabel key={r.text} text={r.text} active={frame >= r.from && frame <= r.to} />
        ))}
      </div>

      {/* centre terminal panel */}
      <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 680 }}>
          <CommandSequence
            microLabel="NAVIGATION"
            command="exec.goto.pulse"
            feedbackText="Navigating to Pulse"
            feedbackType="success"
            startFrame={0}
            endFrame={70}
          />
          <CommandSequence
            microLabel="FILTERING"
            command="exec.category==ai"
            feedbackText="Filter: category = ai"
            feedbackType="success"
            startFrame={100}
            endFrame={170}
          />
          <CommandSequence
            microLabel="DISCOVERY"
            command=">>>"
            feedbackText="Jumping 3 products forward"
            feedbackType="info"
            startFrame={200}
            endFrame={260}
          />
        </div>
      </AbsoluteFill>

      {/* right-side confirmation visuals */}
      <div style={{ position: 'absolute', right: 130, top: '50%', transform: 'translateY(-50%)', width: 400, height: 260, display: 'flex', alignItems: 'center' }}>
        <ThumbPreview from={40} to={70} />
        <CardGrid from={138} to={170} />
        <ScrollCards from={218} to={250} />
      </div>
    </AbsoluteFill>
  );
};

export default Commands;
