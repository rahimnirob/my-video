import React from 'react';
import { AbsoluteFill, interpolate, Easing } from 'remotion';
import { ease, bbFill } from '../palette';
import { sora } from '../../tokens';

/**
 * S1 — HOOK (f0–30): "Launch." zooms in big on the orange bloom.
 * Giant Sora headline with chromatic-aberration-style blur entrance.
 */
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const Scene1Hook: React.FC<{ frame: number }> = ({ frame: f }) => {
  if (f > 35) return null;

  // 1. Entrance Animation (f0 - f18)
  const enterP = interpolate(f, [0, 18], [0, 1], { easing: ease, ...clamp });
  
  // Slide smoothly from the right side
  const translateX = interpolate(enterP, [0, 1], [800, 0], clamp);
  
  // Stretch horizontally and squash vertically during fast movement for physical elastic feel
  const scaleX = interpolate(enterP, [0, 0.6, 1], [1.12, 1.05, 1.0], clamp);
  const scaleY = interpolate(enterP, [0, 0.6, 1], [0.92, 0.96, 1.0], clamp);
  
  // Entrance blur transition
  const enterBlur = interpolate(enterP, [0, 1], [18, 0], clamp);
  
  // Opacity fade in
  const enterOpacity = interpolate(enterP, [0, 0.5], [0, 1], clamp);

  // 2. Exit Zoom-Through Animation (f23 - f30)
  const exitP = interpolate(f, [23, 30], [0, 1], { easing: Easing.bezier(0.25, 1, 0.5, 1), ...clamp });
  
  // Camera flies through the text, scaling up, blurring, and fading out
  const exitScale = interpolate(exitP, [0, 1], [1, 5.0], clamp);
  const exitBlur = interpolate(exitP, [0, 1], [0, 24], clamp);
  const exitOpacity = interpolate(exitP, [0, 1], [1, 0], clamp);

  // Combine properties
  const opacity = enterOpacity * exitOpacity;
  const blur = enterBlur + exitBlur;

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          opacity,
          transform: `translate3d(${translateX}px, 0, 0) scale(${exitScale}) scaleX(${scaleX}) scaleY(${scaleY})`,
          filter: `blur(${blur}px)`,
          fontFamily: sora,
          fontWeight: 900,
          fontSize: 300,
          letterSpacing: '-0.03em',
          lineHeight: 1,
          textAlign: 'center',
          ...bbFill(f, true),
          // Subtly layered text-shadow to produce cinematic edge fringing (red/cyan chromatic aberration)
          textShadow: `
            0 0 50px rgba(232, 93, 58, 0.22),
            -3px -1px 0px rgba(255, 127, 94, 0.45),
            3px 1px 0px rgba(240, 168, 104, 0.45)
          `,
        }}
      >
        Launch.
      </div>
    </AbsoluteFill>
  );
};

export default Scene1Hook;
