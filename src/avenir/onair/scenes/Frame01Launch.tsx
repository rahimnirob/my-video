import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { frames, mono, sentinel as sentinelTokens, EASE_SMOOTH } from '../../tokens';
import { s } from '../layout';
import { LUMEN } from '../products';
import Bloom from '../components/Bloom';
import { BLOOM } from '../world';
import ProductCard from '../components/ProductCard';
import KineticHeadline from '../components/KineticHeadline';
import LaunchCountdown from '../components/LaunchCountdown';
import Atmosphere from '../components/Atmosphere';

/**
 * Frame 01 — LAUNCH · the hook (16:9). Must stop the scroll.
 * A cold broadcast countdown ticks down from frame zero (the villain) while
 * Lumen goes viral beneath it — the launch is winning UNDER a death timer.
 * The cold clock is the SAME timer that becomes the giant dial in Frame 02.
 * Stark second-person line lands a beat later: "YOU GET 24 HOURS."
 */

const CAPTION_AT_MS = 900; // hook line 2 — lands as the launch visual arrives
/** Cold Lumen gradient (white→violet→blue) — the launch is still the subject. */
const COLD_GRADIENT =
  'linear-gradient(100deg, #FFFFFF 0%, #C9B8F5 38%, #7AA2F7 62%, #FFFFFF 100%)';
const SPIKE = [0.1, 0.15, 0.13, 0.2, 0.28, 0.26, 0.4, 0.58, 0.72, 0.85, 0.99];

const Frame01Launch: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ease = Easing.bezier(...EASE_SMOOTH);
  const tau = Math.PI * 2;
  const ramp = (a: number, b: number) =>
    interpolate(frame, [a, b], [0, 1], {
      easing: ease,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  const captionAt = frames(CAPTION_AT_MS, fps);

  // Card alive from frame 0 (the muted poster must read), settling fast.
  const entT = ramp(0, frames(420, fps));
  const entY = interpolate(entT, [0, 1], [s(24), 0]);
  const entScale = interpolate(entT, [0, 1], [0.93, 1]);
  const cardOpacity = interpolate(frame, [0, 10], [0.72, 1], { easing: ease, extrapolateRight: 'clamp' });
  const rotX = 2.0 * Math.sin((frame / (7 * fps)) * tau);
  const rotY = 2.6 * Math.sin((frame / (9 * fps)) * tau + 1);
  const floatY = s(6) * Math.sin((frame / (6 * fps)) * tau);
  const shine = interpolate(frame, [frames(160, fps), frames(900, fps)], [0, 1], {
    easing: Easing.inOut(Easing.quad),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const spike = interpolate(frame, [frames(180, fps), frames(1700, fps)], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const liveDot = 0.5 + 0.5 * Math.sin((frame / (0.9 * fps)) * tau);

  // Escalation hand-off: the countdown grows + descends into the Frame-02 dial.
  const escal = interpolate(frame, [196, 224], [0, 1], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const metricsIn = ramp(frames(220, fps), frames(820, fps));
  const captionScrim = ramp(captionAt, captionAt + frames(450, fps));
  const line1Exit = captionAt + frames(2100, fps);
  const line2At = captionAt + frames(2700, fps);
  const exitOut = interpolate(frame, [196, 210], [1, 0], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const bgScale = interpolate(frame, [0, 225], [1.08, 1.16]);
  const bloomPulse = 0.34 + 0.06 * Math.sin((frame / (2.2 * fps)) * tau);

  const pts = SPIKE.map((y, i) => {
    const rev = ramp(frames(220 + i * 70, fps), frames(400 + i * 70, fps));
    return { x: (i / (SPIKE.length - 1)) * 100, y: 46 - y * rev * spike * 42 };
  });
  const headPt = pts[pts.length - 1];

  return (
    <AbsoluteFill style={{ background: '#06040e' }}>
      {/* richer bloom backdrop — the image, energised by a CSS glow */}
      <AbsoluteFill>
        <Img
          src={staticFile('bloom.jpg')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 42%',
            filter: 'saturate(1.05) brightness(0.95)',
            transform: `scale(${bgScale})`,
          }}
        />
      </AbsoluteFill>
      <Bloom rgb={BLOOM.life.rgb} intensity={bloomPulse} posY={50} base="transparent" />
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(4,2,10,0.66) 0%, rgba(4,2,10,0.12) 30%, rgba(4,2,10,0.14) 60%, rgba(4,2,10,0.7) 100%)',
        }}
      />

      <div style={{ position: 'absolute', inset: 0, opacity: exitOut }}>
        {/* scene slate — moved to the floor so the countdown band owns the top */}
        <div
          style={{
            position: 'absolute',
            left: s(18),
            bottom: s(16),
            zIndex: 42,
            fontFamily: mono,
            fontSize: s(10),
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'rgba(239,244,255,0.4)',
          }}
        >
          <b style={{ color: '#6AA3F7', fontWeight: 700 }}>01</b> · LAUNCH
        </div>

        {/* Lumen card — left */}
        <div
          style={{
            position: 'absolute',
            left: '29%',
            top: '52%',
            transform: 'translate(-50%, -50%)',
            perspective: s(800),
            zIndex: 10,
          }}
        >
          <div
            style={{
              transform: `translateY(${entY + floatY}px) scale(${entScale}) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
              transformStyle: 'preserve-3d',
              opacity: cardOpacity,
            }}
          >
            <ProductCard product={LUMEN} state="alive" width={248} shine={shine} />
          </div>
        </div>

        {/* one quiet viral cue — the launch is winning, shown as a rising line
            (not a stat dashboard) so the countdown stays the only big number */}
        <div
          style={{
            position: 'absolute',
            right: '8.5%',
            top: '52%',
            transform: `translateY(calc(-50% + ${(1 - metricsIn) * s(20)}px))`,
            opacity: metricsIn * 0.95,
            width: s(206),
            display: 'flex',
            flexDirection: 'column',
            gap: s(10),
            zIndex: 11,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: s(7), fontFamily: mono, fontSize: s(10.5), letterSpacing: '0.16em', color: 'rgba(255,255,255,0.8)' }}>
            <span style={{ width: s(6), height: s(6), borderRadius: '50%', background: '#C9B8F5', boxShadow: `0 0 ${s(9)}px rgba(139,92,246,${0.5 + 0.5 * liveDot})` }} />
            TRENDING · <span style={{ color: '#C9B8F5' }}>#1 TODAY</span>
          </div>
          <svg viewBox="0 0 100 46" preserveAspectRatio="none" style={{ width: '100%', height: s(50) }}>
            <defs>
              <linearGradient id="spk" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(139,92,246,0.42)" />
                <stop offset="100%" stopColor="rgba(139,92,246,0)" />
              </linearGradient>
            </defs>
            <polygon points={`0,46 ${pts.map((p) => `${p.x},${p.y}`).join(' ')} 100,46`} fill="url(#spk)" />
            <polyline points={pts.map((p) => `${p.x},${p.y}`).join(' ')} fill="none" stroke="#C9B8F5" strokeWidth={1.5} />
            <circle cx={headPt.x} cy={headPt.y} r={2} fill="#fff" />
          </svg>
          <div style={{ fontFamily: mono, fontSize: s(8.5), letterSpacing: '0.2em', color: 'rgba(255,255,255,0.45)' }}>
            VIEWS CLIMBING
          </div>
        </div>

        {/* kinetic caption — line 1 (the timeline), then the launch-day high
            that hands straight into Frame 02 ("but it only lasts a day") */}
        <AbsoluteFill
          style={{
            background: 'radial-gradient(ellipse 60% 26% at 50% 85%, rgba(2,1,7,0.66) 0%, transparent 72%)',
            opacity: captionScrim,
            zIndex: 12,
          }}
        />
        <KineticHeadline
          words={["HERE'S", 'YOUR', "PRODUCT'S", 'TIMELINE.']}
          accentIndices={[2, 3]}
          accentGradient={COLD_GRADIENT}
          startFrame={captionAt}
          exitAt={line1Exit}
          fontSize={38}
          top="85%"
          left="6%"
          right="6%"
          translateYPct={-50}
          transformOrigin="center center"
          tiltX={4}
          tiltY={0}
          align="center"
          enterX={0}
          zIndex={13}
        />
        <KineticHeadline
          words={['RIGHT', 'NOW,', "EVERYONE'S", 'WATCHING.']}
          accentIndices={[2, 3]}
          accentGradient={COLD_GRADIENT}
          startFrame={line2At}
          fontSize={38}
          top="85%"
          left="6%"
          right="6%"
          translateYPct={-50}
          transformOrigin="center center"
          tiltX={4}
          tiltY={0}
          align="center"
          enterX={0}
          zIndex={13}
        />
      </div>

      {/* the villain — cold broadcast countdown, ticking from frame 0, rides its
          own escalation into the Frame-02 dial (so it survives the stage fade) */}
      <LaunchCountdown exit={escal} />

      <Atmosphere topFade={false} />
    </AbsoluteFill>
  );
};

export const Slate: React.FC<{ label: string; accent?: string }> = ({ label, accent }) => {
  const [num, ...rest] = label.split(' ');
  return (
    <div
      style={{
        position: 'absolute',
        top: s(14),
        left: s(18),
        zIndex: 42,
        fontFamily: mono,
        fontSize: s(10),
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.4)',
      }}
    >
      <b style={{ color: accent ?? sentinelTokens.accent, fontWeight: 700 }}>{num}</b>{' '}
      {rest.join(' ')}
    </div>
  );
};

export default Frame01Launch;
