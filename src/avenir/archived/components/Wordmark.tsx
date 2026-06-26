import React from 'react';
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { EMBER_INK, EMBER_SHADOW, WIDTH, emberFill } from '../constants';
import { anton } from '../fonts';

/**
 * Wordmark — AVENIR set wide in the metallic gold foil, with a gold underline
 * that draws in beneath it. The film's signature close. Letters settle in from
 * extra tracking (a calm, high-end lockup), then the rule sweeps open.
 */

export type WordmarkProps = {
  startFrame: number;
  fontSize?: number;
  top?: string;
  /** Horizontal center as a fraction of frame width (0.5 = dead centre). */
  centerXPct?: number;
  zIndex?: number;
};

const Wordmark: React.FC<WordmarkProps> = ({
  startFrame,
  fontSize = 128,
  top = '50%',
  centerXPct = 0.5,
  zIndex = 12,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ease = Easing.bezier(0.16, 1, 0.3, 1);

  const r = (a: number, b: number) =>
    interpolate(frame, [a, b], [0, 1], { easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const reveal = r(startFrame, startFrame + 18);
  const settle = spring({ frame: frame - startFrame, fps, config: { damping: 22, stiffness: 80, mass: 1 }, durationInFrames: 40 });
  const underline = r(startFrame + 18, startFrame + 46);

  const tracking = 0.46 - 0.28 * settle; // em — collapses to the wordmark's rest tracking
  const rise = (1 - settle) * 22;

  return (
    <div
      style={{
        position: 'absolute',
        left: WIDTH * centerXPct,
        top,
        transform: `translate(-50%, calc(-50% + ${rise}px))`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: reveal,
        zIndex,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          fontFamily: anton,
          fontWeight: 400,
          fontSize,
          letterSpacing: `${tracking}em`,
          paddingLeft: `${tracking}em`, // optical re-centre for the wide tracking
          filter: EMBER_SHADOW,
          ...emberFill(frame, 60),
        }}
      >
        AVENIR
      </div>
      <div
        style={{
          marginTop: fontSize * 0.2,
          height: Math.max(3, fontSize * 0.026),
          width: `${underline * 100}%`,
          maxWidth: fontSize * 4.7,
          background: `linear-gradient(90deg, rgba(255,64,49,0) 0%, ${EMBER_INK} 16%, #FFFFFF 50%, ${EMBER_INK} 84%, rgba(255,64,49,0) 100%)`,
          borderRadius: 999,
          boxShadow: '0 0 20px rgba(255,64,49,0.45)',
        }}
      />
    </div>
  );
};

export default Wordmark;
