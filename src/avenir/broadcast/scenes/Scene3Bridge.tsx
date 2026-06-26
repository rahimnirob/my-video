import React from 'react';
import { AbsoluteFill, interpolate } from 'remotion';
import { ease, BB, bbFill } from '../palette';
import { sora } from '../../tokens';
import BlurText from '../kit/BlurText';

/**
 * S3 — BRIDGE (f135–165): "without the" centered on light field.
 * S4 — DECAY  (f165–204): "24-hour decay" zoom-out text on orange bloom.
 * Tight transition — bridge text blurs out as decay text zooms in.
 */
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const Scene3Bridge: React.FC<{ frame: number }> = ({ frame: f }) => {
  if (f < 130 || f > 210) return null;

  return (
    <AbsoluteFill>
      {/* S3: "without the" — centered, clean entrance */}
      <BlurText
        text="without the"
        frame={f}
        inAt={137}
        outAt={158}
        fontSize={88}
        color={BB.ink}
        weight={600}
        emphasis={[]}
        accentMode="field"
      />

      {/* S4: "24-hour decay" — dramatic zoom from giant to readable */}
      {f >= 160 && (() => {
        const zP = interpolate(f, [165, 190], [0, 1], { easing: ease, ...clamp });
        const outP = interpolate(f, [196, 204], [0, 1], { easing: ease, ...clamp });
        const scale = interpolate(zP, [0, 1], [4.5, 1], clamp);
        const blur = (1 - zP) * 20;
        const op = zP * (1 - outP);
        return (
          <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
            <div
              style={{
                opacity: op,
                transform: `scale(${scale})`,
                filter: `blur(${blur}px)`,
                display: 'flex',
                alignItems: 'baseline',
                gap: 24,
              }}
            >
              <span
                style={{
                  fontFamily: sora,
                  fontWeight: 800,
                  fontSize: 140,
                  color: BB.white,
                  letterSpacing: '-0.02em',
                }}
              >
                24-hour
              </span>
              <span
                style={{
                  fontFamily: sora,
                  fontWeight: 800,
                  fontSize: 140,
                  letterSpacing: '-0.02em',
                  fontStyle: 'italic',
                  ...bbFill(f, true),
                }}
              >
                decay
              </span>
            </div>
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

export default Scene3Bridge;
