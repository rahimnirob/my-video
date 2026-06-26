import React from 'react';
import {
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { mono, EASE_SMOOTH } from '../../tokens';
import { s } from '../layout';

/**
 * LaunchCountdown — the hook's villain. A cold broadcast top-band: the launch is
 * already on a clock. A stark-white HH:MM:SS ticks DOWN from ~24h, the only
 * MOVING thing on the first frame (so the poster reads tension with no sound, no
 * text). COLD on purpose — stark white + cold-blue (rgb 106,163,247), the exact
 * blue of the Frame-02 glass dial — because this small stamp is the SAME timer
 * that escalates into that giant dial hitting 00:00. No red (red is Billboard).
 *
 * `exit` (0→1) runs the escalation: the band chrome falls away and the centre
 * clock GROWS + descends toward the dial's home, a match-cut into Frame 02.
 */

const WHITE = '#EFF4FF'; // stark cool white — the digits
const BLUE = '#6AA3F7'; // cold-blue accent (matches the Frame-02 dial)
const BLUE_RGB = '106,163,247';

const pad = (n: number) => String(n).padStart(2, '0');

export type LaunchCountdownProps = {
  /** 0 = steady; 1 = fully escalated for the Frame-02 hand-off. */
  exit?: number;
};

const LaunchCountdown: React.FC<LaunchCountdownProps> = ({ exit = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tau = Math.PI * 2;
  const ease = Easing.bezier(...EASE_SMOOTH);

  // Present (ticking) on frame 0 — the poster must carry the hook. Only a hair
  // of settle so it isn't a hard pop.
  const enterT = interpolate(frame, [0, 8], [0.85, 1], { easing: ease, extrapolateRight: 'clamp' });
  const bandY = interpolate(frame, [0, 10], [-s(6), 0], { easing: ease, extrapolateRight: 'clamp' });

  // Ticking: time REMAINING in the launch window, from 23:59:58, ~2 display-sec
  // per real-sec so the seconds visibly roll (motion = the hook) yet stay legible.
  const START = 23 * 3600 + 59 * 60 + 58; // seconds remaining at f0
  const COMPRESS = 2;
  const elapsed = Math.floor((frame / fps) * COMPRESS);
  const rem = Math.max(0, START - elapsed);
  const hh = Math.floor(rem / 3600);
  const mm = Math.floor((rem % 3600) / 60);
  const ss = rem % 60;
  const progress01 = rem / (24 * 3600);

  const dotPulse = 0.5 + 0.5 * Math.sin((frame / (0.9 * fps)) * tau);
  const colonBlink = Math.floor(frame / 15) % 2 === 0 ? 0.85 : 0.4;

  // Escalation — chrome falls away fast; the clock grows + descends + fades,
  // its vector pointing at the Frame-02 dial (a match-cut, not a swap).
  const chrome = 1 - interpolate(exit, [0, 0.45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const clockScale = 1 + 1.0 * exit;
  const clockDescend = exit * s(120);
  const clockFade = 1 - interpolate(exit, [0.55, 1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const colonStyle: React.CSSProperties = {
    color: `rgba(${BLUE_RGB},${colonBlink})`,
    margin: `0 ${s(1)}px`,
    fontWeight: 600,
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: s(58),
        transform: `translateY(${bandY}px)`,
        opacity: enterT,
        zIndex: 60,
        pointerEvents: 'none',
      }}
    >
      {/* cold near-black broadcast bar (the red elements of a chyron, but cold) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: chrome,
          background: 'linear-gradient(180deg, rgba(8,11,18,0.92) 0%, rgba(6,8,13,0.84) 100%)',
          backdropFilter: `blur(${s(6)}px)`,
          WebkitBackdropFilter: `blur(${s(6)}px)`,
          borderBottom: `1px solid rgba(${BLUE_RGB},0.5)`,
          boxShadow: `0 ${s(2)}px ${s(20)}px rgba(${BLUE_RGB},0.16), inset 0 1px 0 rgba(255,255,255,0.05)`,
        }}
      />

      {/* LEFT — the slug */}
      <div
        style={{
          position: 'absolute',
          left: s(26),
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: s(8),
          opacity: chrome,
          fontFamily: mono,
          fontSize: s(12),
          letterSpacing: '0.20em',
          textTransform: 'uppercase',
        }}
      >
        <span style={{ width: s(8), height: s(8), borderRadius: '50%', background: BLUE, boxShadow: `0 0 ${s(10)}px rgba(${BLUE_RGB},${0.5 + 0.4 * dotPulse})` }} />
        <span style={{ color: WHITE, fontWeight: 700 }}>LAUNCH DAY</span>
      </div>

      {/* CENTRE — the ticking clock (the villain; it escalates) */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translate(-50%, calc(-50% + ${clockDescend}px)) scale(${clockScale})`,
          opacity: clockFade,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: s(3),
        }}
      >
        <span style={{ fontFamily: mono, fontSize: s(10), letterSpacing: '0.34em', textTransform: 'uppercase', color: `rgba(${BLUE_RGB},${0.85 * (0.4 + 0.6 * chrome)})`, lineHeight: 1 }}>ENDS IN</span>
        <span
          style={{
            fontFamily: mono,
            fontWeight: 700,
            fontSize: s(32),
            letterSpacing: '0.04em',
            lineHeight: 1,
            color: WHITE,
            fontVariantNumeric: 'tabular-nums',
            textShadow: `0 0 ${s(18)}px rgba(${BLUE_RGB},0.5), 0 ${s(2)}px ${s(8)}px rgba(0,0,0,0.65)`,
          }}
        >
          {pad(hh)}<span style={colonStyle}>:</span>{pad(mm)}<span style={colonStyle}>:</span>{pad(ss)}
        </span>
      </div>

      {/* RIGHT — quiet brand ballast (sells the live-feed gestalt) */}
      <div style={{ position: 'absolute', right: s(26), top: '50%', transform: 'translateY(-50%)', opacity: chrome * 0.85, fontFamily: mono, fontSize: s(11), letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(239,244,255,0.4)' }}>
        AVENIR
      </div>

      {/* the 24h drain line — near-full here; it empties for real in Frame 02 */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: s(2), background: `rgba(${BLUE_RGB},0.14)`, opacity: chrome }}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: `${progress01 * 100}%`,
            background: `linear-gradient(90deg, rgba(${BLUE_RGB},0.3) 0%, ${BLUE} 100%)`,
            boxShadow: `0 0 ${s(8)}px rgba(${BLUE_RGB},0.6)`,
          }}
        />
      </div>
    </div>
  );
};

export default LaunchCountdown;
