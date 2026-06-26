import React from 'react';
import { AbsoluteFill, Img } from 'remotion';
import { base } from '../../tokens';
import { alpha } from '../constants';

export type ScreenshotRevealProps = {
  src: string;
  opacity: number;
  scale?: number;
  translateX?: number;
  translateY?: number;
  /** Darkening overlay alpha for text legibility. */
  overlayAlpha?: number;
  objectPosition?: string;
  zIndex?: number;
};

/**
 * A full-bleed screenshot with a camera transform (translate-then-scale push)
 * and a dark legibility overlay. Driven by the composition-level controller so
 * the image is ONE continuous element across scenes 4–7 (no boundary flash).
 */
const ScreenshotReveal: React.FC<ScreenshotRevealProps> = ({
  src,
  opacity,
  scale = 1,
  translateX = 0,
  translateY = 0,
  overlayAlpha = 0.35,
  objectPosition = 'center top',
  zIndex = 1,
}) => {
  if (opacity <= 0) return null;
  return (
    <AbsoluteFill style={{ opacity, zIndex }}>
      <AbsoluteFill
        style={{
          transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        <Img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: alpha(base.bgBase, overlayAlpha) }} />
    </AbsoluteFill>
  );
};

export default ScreenshotReveal;
