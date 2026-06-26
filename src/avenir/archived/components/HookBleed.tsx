import React from 'react';
import { Easing, interpolate, useCurrentFrame } from 'remotion';
import { EMBER_GLOW_EDGE, emberFill } from '../constants';
import { anton } from '../fonts';

/**
 * HookBleed — the cold-open hook. ONE word at a time, BIG, FAST. Each word stays
 * CRISP (edge glow only, no full-word blur) and JUMPS IN from a different side
 * (left / bottom / right / top), filled with the flowing onair ember gradient
 * (white→peach→amber→ember→white). The whole statement reads in ~3.4s, no audio.
 *
 * One motion effect (multi-direction jump-in, with a small landing overshoot) +
 * the onair gradient look — deliberately NOT stacked with defocus/scale/glint.
 */

const DIRS = ['left', 'bottom', 'right', 'top'] as const;

export type HookBleedProps = {
  text: string;
  startFrame: number;
  /** Frames each word owns the centre before the next jumps in. */
  stepF?: number;
  /** Entrance travel length (frames). */
  enterF?: number;
  /** How far off-centre a word starts before jumping to place (px). */
  slideDist?: number;
  /** Gradient flow period (frames); small = fast. */
  gradientF?: number;
  /** Block exit. */
  exitAt?: number;
  exitF?: number;
  /** Auto-fit target width (px) and clamps. */
  targetWidth?: number;
  maxSize?: number;
  minSize?: number;
  zIndex?: number;
};

const HookBleed: React.FC<HookBleedProps> = ({
  text,
  startFrame,
  stepF = 17,
  enterF = 10,
  slideDist = 480,
  gradientF = 22,
  exitAt,
  exitF = 10,
  targetWidth = 1680,
  maxSize = 560,
  minSize = 270,
  zIndex = 11,
}) => {
  const frame = useCurrentFrame();
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  // A little overshoot past centre, then settle — the "jump" landing.
  const jump = Easing.bezier(0.34, 1.32, 0.5, 1);
  const ri = (a: number, b: number, x: number, y: number, e = ease) =>
    interpolate(frame, [a, b], [x, y], { easing: e, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const words = text.split('\n').join(' ').split(' ').filter(Boolean);
  const exitFade = exitAt != null ? 1 - ri(exitAt, exitAt + exitF, 0, 1) : 1;

  // Auto-fit a word to roughly fill the frame width (Anton ≈ 0.47em advance).
  const fitSize = (w: string) =>
    Math.max(minSize, Math.min(maxSize, targetWidth / (w.length * 0.47)));

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex,
        opacity: exitFade,
        pointerEvents: 'none',
        fontFamily: anton,
        fontWeight: 400,
        letterSpacing: '0.005em',
      }}
    >
      {words.map((w, i) => {
        const inAt = startFrame + i * stepF;
        const isLast = i === words.length - 1;

        // Fade in fast so the travel from the edge is actually seen.
        const opIn = ri(inAt, inAt + 2, 0, 1);
        const enterT = ri(inAt, inAt + enterF, 0, 1, jump); // 0→1 (overshoots)
        // Clear out exactly as the next word lands — only ONE word on screen.
        const outP = isLast ? 0 : ri(inAt + stepF - 6, inAt + stepF, 0, 1);
        const op = opIn * (1 - outP);
        if (op <= 0.002) return null;

        // Jump in from a different side per word; small upward drift on exit.
        const dir = DIRS[i % DIRS.length];
        const off = (1 - enterT) * slideDist;
        const ex = dir === 'left' ? -off : dir === 'right' ? off : 0;
        const ey = (dir === 'top' ? -off : dir === 'bottom' ? off : 0) - outP * 36;
        const size = fitSize(w);

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              whiteSpace: 'nowrap',
              fontSize: size,
              transform: `translate(-50%, -50%) translate(${ex}px, ${ey}px)`,
              opacity: op,
              filter: EMBER_GLOW_EDGE,
              ...emberFill(frame, gradientF),
            }}
          >
            {w}
          </div>
        );
      })}
    </div>
  );
};

export default HookBleed;
