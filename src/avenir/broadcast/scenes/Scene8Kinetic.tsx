import React from 'react';
import { AbsoluteFill, interpolate } from 'remotion';
import { ease, BB, bbFill } from '../palette';
import { sora } from '../../tokens';

/**
 * S10 — KINETIC BEATS (f660–840):
 * Rapid-fire kinetic words in the center.
 * Swaps background style in sync with the beat.
 */
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

interface WordBeat {
  word: string;
  inAt: number;
  outAt: number;
  onBloom: boolean;
  isEmphasized?: boolean;
}

const BEATS: WordBeat[] = [
  { word: 'broadcast', inAt: 660, outAt: 696, onBloom: true, isEmphasized: true },
  { word: 'archive',   inAt: 696, outAt: 726, onBloom: false, isEmphasized: false },
  { word: 'amplify',   inAt: 726, outAt: 756, onBloom: true, isEmphasized: true },
  { word: 'once',      inAt: 756, outAt: 786, onBloom: false, isEmphasized: false },
  { word: 'visible',   inAt: 786, outAt: 816, onBloom: false, isEmphasized: false },
  { word: 'forever.',  inAt: 816, outAt: 840, onBloom: false, isEmphasized: true },
];

const Scene8Kinetic: React.FC<{ frame: number }> = ({ frame: f }) => {
  if (f < 655 || f > 844) return null;

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      {BEATS.map((beat) => {
        if (f < beat.inAt || f >= beat.outAt) return null;

        // Entrances / Exits
        const enterP = interpolate(f, [beat.inAt, beat.inAt + 6], [0, 1], { easing: ease, ...clamp });
        const exitP = interpolate(f, [beat.outAt - 5, beat.outAt], [0, 1], { easing: ease, ...clamp });
        const op = enterP * (1 - exitP);

        // Zoom from giant to readable, or small zoom-in drift
        const scale = interpolate(enterP, [0, 1], [2.2, 1], clamp) * interpolate(exitP, [0, 1], [1, 0.85], clamp);
        const blur = (1 - enterP) * 16 + exitP * 10;
        const ty = (1 - enterP) * 15 - exitP * 12;

        let wordStyle: React.CSSProperties = {
          fontFamily: sora,
          fontWeight: 800,
          fontSize: 160,
          letterSpacing: '-0.03em',
          textAlign: 'center',
        };

        if (beat.isEmphasized) {
          wordStyle = {
            ...wordStyle,
            ...bbFill(f, beat.onBloom),
            fontStyle: 'italic',
          };
        } else {
          wordStyle = {
            ...wordStyle,
            color: beat.onBloom ? BB.white : BB.ink,
          };
        }

        return (
          <div
            key={beat.word}
            style={{
              opacity: op,
              transform: `scale(${scale}) translateY(${ty}px)`,
              filter: `blur(${blur}px)`,
              ...wordStyle,
            }}
          >
            {beat.word}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export default Scene8Kinetic;
