import React from 'react';
import {
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { EASE_SMOOTH, frames, sora } from '../../tokens';
import { s } from '../layout';

/**
 * KineticHeadline — free-standing recognition headline (avenir-motion §3.1).
 * Sits in a 3D perspective and angles toward the viewer; enters from the right
 * and reveals ONE WORD AT A TIME (mask wipe up) while the block drifts left.
 * Plain words are solid white for readability; ACCENT words carry a fast-moving
 * gradient sweep.
 */

export type KineticHeadlineProps = {
  words: string[];
  startFrame?: number;
  /** Demo-space font px (scaled by S). */
  fontSize?: number;
  /** Indices of words that get the animated accent gradient. */
  accentIndices?: number[];
  /** Gradient used on accent words (keep white-dominant so it stays legible). */
  accentGradient?: string;
  wordStaggerMs?: number;
  /** 3D tilt of the block, degrees. */
  tiltY?: number;
  tiltX?: number;
  /** Accent gradient sweep period (fast = small). */
  shimmerMs?: number;
  align?: 'left' | 'center';
  /** Placement (CSS) + which corner/edge the 3D tilt pivots from. */
  top?: string;
  left?: string;
  right?: string;
  /** Vertical anchor: -50 centers on `top`; 0 anchors the top edge to `top`. */
  translateYPct?: number;
  transformOrigin?: string;
  /** Horizontal enter offset (demo px). 0 = no slide (for centered captions). */
  enterX?: number;
  zIndex?: number;
  /** Scene frame at which the whole headline fades away (lifts with the guide). */
  exitAt?: number;
  /** Slow cinematic push-in + float (for hero lines like the hook). */
  cinematic?: boolean;
};

const KineticHeadline: React.FC<KineticHeadlineProps> = ({
  words,
  startFrame = 0,
  fontSize = 31,
  accentIndices = [],
  accentGradient = 'linear-gradient(100deg, #FFFFFF 0%, #C4A9FF 42%, #8B5CF6 58%, #FFFFFF 100%)',
  wordStaggerMs = 150,
  tiltY = -16,
  tiltX = 6,
  shimmerMs = 700,
  align = 'left',
  top = '50%',
  left = '50%',
  right = '4%',
  translateYPct = -50,
  transformOrigin = 'right center',
  enterX = 96,
  zIndex = 12,
  exitAt,
  cinematic = false,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const ease = Easing.bezier(...EASE_SMOOTH);
  const accent = new Set(accentIndices);
  const tau = Math.PI * 2;

  // Block: enter from the right, settle, drift left a touch (the pull).
  const containerX = interpolate(
    frame,
    [startFrame, startFrame + frames(520, fps), startFrame + frames(2200, fps)],
    [s(enterX), 0, -s(enterX * 0.17)],
    { easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );
  const enterOpacity = interpolate(
    frame,
    [startFrame, startFrame + frames(300, fps)],
    [0, 1],
    { easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );
  const exitFade =
    exitAt != null
      ? interpolate(frame, [exitAt, exitAt + frames(360, fps)], [1, 0], {
          easing: ease,
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : 1;
  const containerOpacity = enterOpacity * exitFade;
  const exitLift = (1 - exitFade) * s(14); // drifts up a touch as it leaves

  // Subtle life on the 3D tilt.
  const ry = tiltY + 1.4 * Math.sin((frame / (8 * fps)) * tau);
  const rx = tiltX + 1.0 * Math.sin((frame / (10 * fps)) * tau + 1);
  // Optional hero motion: a slow cinematic push-in + gentle float.
  const pushScale = cinematic
    ? interpolate(frame, [startFrame, startFrame + durationInFrames], [0.985, 1.04], {
        easing: ease,
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 1;
  const floatY = cinematic ? s(4) * Math.sin((frame / (5 * fps)) * tau) : 0;

  // Fast accent shimmer.
  const cycle = Math.max(1, (shimmerMs / 1000) * fps);
  const shimmerX = -200 * ((frame % cycle) / cycle);

  const wordStart = startFrame + frames(280, fps);
  const plainShadow = `drop-shadow(0 ${s(2)}px ${s(14)}px rgba(0,0,0,0.55))`;

  return (
    <div
      style={{
        position: 'absolute',
        left,
        right,
        top,
        transform: `translate(${containerX}px, ${translateYPct}%) translateY(${-exitLift}px)`,
        perspective: s(900),
        opacity: containerOpacity,
        zIndex,
      }}
    >
      <div
        style={{
          transform: `rotateX(${rx}deg) rotateY(${ry}deg) scale(${pushScale}) translateY(${floatY}px)`,
          transformOrigin,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: align === 'center' ? 'center' : 'flex-start',
          gap: `${s(4)}px ${s(16)}px`,
          fontFamily: sora,
          fontWeight: 700,
          fontSize: s(fontSize),
          lineHeight: 1.02,
          letterSpacing: '-0.02em',
        }}
      >
        {words.map((w, i) => {
          const wStart = wordStart + i * frames(wordStaggerMs, fps);
          const rev = interpolate(
            frame,
            [wStart, wStart + frames(440, fps)],
            [0, 1],
            { easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
          );
          const wordY = interpolate(rev, [0, 1], [s(24), 0]);
          const wordBlur = (1 - rev) * s(7); // cinematic blur-in
          const wordScale = 0.9 + 0.1 * rev;
          const isAccent = accent.has(i);
          // accent glow swells as the word lands, then settles
          const glow = 0.3 + 0.45 * Math.sin(Math.min(1, rev) * Math.PI);
          return (
            <span
              key={i}
              style={{ display: 'inline-block', overflow: 'visible', paddingBottom: s(3) }}
            >
              <span
                style={{
                  display: 'inline-block',
                  transform: `translateY(${wordY}px) scale(${wordScale})`,
                  opacity: rev,
                  ...(isAccent
                    ? {
                        backgroundImage: accentGradient,
                        backgroundSize: '200% auto',
                        backgroundPosition: `${shimmerX}% center`,
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                        filter: `blur(${wordBlur}px) ${plainShadow} drop-shadow(0 0 ${s(18)}px rgba(255,244,232,${glow}))`,
                      }
                    : {
                        color: '#FFFFFF',
                        filter: `blur(${wordBlur}px) ${plainShadow}`,
                      }),
                }}
              >
                {w}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default KineticHeadline;
