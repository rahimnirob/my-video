import React from 'react';
import { Easing, interpolate, useCurrentFrame } from 'remotion';
import { EMBER_GLOW_EDGE } from '../constants';
import { anton } from '../fonts';

/**
 * BottomGradient (founder effect D) — a line fills the frame on black; the
 * gradient is lit only at the BOTTOM of the glyphs (tops fade to black), the
 * word REVEALS left→right (a clip wipe), and a bright sheen sweeps right→left.
 * Distinctive "rising out of the dark" landing. Used for hero short lines.
 */

export type BottomGradientProps = {
  text: string;
  startFrame: number;
  fontSize: number;
  top?: string;
  /** Left→right reveal duration (frames). */
  revealF?: number;
  /** Right→left sheen period (frames). */
  sheenF?: number;
  exitAt?: number;
  exitF?: number;
  fontFamily?: string;
  fontWeight?: number;
  letterSpacing?: string;
  zIndex?: number;
};

const VERTICAL =
  'linear-gradient(180deg, rgba(255,217,194,0) 20%, rgba(240,168,104,0.55) 52%, rgba(232,93,58,0.95) 80%, #FFE2D2 100%)';
const SHEEN =
  'linear-gradient(90deg, rgba(255,244,236,0) 40%, rgba(255,248,240,0.55) 50%, rgba(255,244,236,0) 60%)';

const BottomGradient: React.FC<BottomGradientProps> = ({
  text,
  startFrame,
  fontSize,
  top = '50%',
  revealF = 26,
  sheenF = 70,
  exitAt,
  exitF = 16,
  fontFamily = anton,
  fontWeight = 400,
  letterSpacing = '0.01em',
  zIndex = 10,
}) => {
  const frame = useCurrentFrame();
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  const ri = (a: number, b: number, x: number, y: number) =>
    interpolate(frame, [a, b], [x, y], { easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Reveal wipe from the left; clip the right side closed → open.
  const rightInset = ri(startFrame, startFrame + revealF, 100, 0);
  const opacity = ri(startFrame, startFrame + 6, 0, 1) * (exitAt != null ? 1 - ri(exitAt, exitAt + exitF, 0, 1) : 1);
  const rise = ri(startFrame, startFrame + revealF, 18, 0);

  // Sheen travels right→left.
  const t = (frame % sheenF) / sheenF;
  const sheenPos = -40 + 180 * t;

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top,
        transform: `translateY(calc(-50% + ${rise}px))`,
        display: 'flex',
        justifyContent: 'center',
        opacity,
        zIndex,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          whiteSpace: 'pre',
          fontFamily,
          fontWeight,
          fontSize,
          letterSpacing,
          lineHeight: 1.04,
          clipPath: `inset(-30% ${rightInset}% -30% 0)`,
          backgroundImage: `${SHEEN}, ${VERTICAL}`,
          backgroundSize: '230% 100%, 100% 100%',
          backgroundPosition: `${sheenPos}% 0, 0 0`,
          backgroundRepeat: 'no-repeat',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          filter: EMBER_GLOW_EDGE,
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default BottomGradient;
