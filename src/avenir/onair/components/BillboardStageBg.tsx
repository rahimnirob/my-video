import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { sora } from '../../tokens';
import { s } from '../layout';

/**
 * BillboardStageBg — the warm Billboard world (reused 04–07). The ambient image
 * (tech.jpg) stays VISIBLE: a light scrim + a top ember glow + a vignette sit
 * over it (no opaque gradient burying it). Plus the giant ghost wordmark.
 * `warmth` (0→1) fades the whole warm world in (the Frame 04 turn).
 */

// Warm light from above + a vignette — all transparent so the image shows.
const EMBER_GLOW =
  'radial-gradient(ellipse 95% 60% at 50% 12%, rgba(200,52,32,0.5) 0%, transparent 58%),' +
  'radial-gradient(ellipse 65% 44% at 50% 4%, rgba(255,107,71,0.32) 0%, transparent 52%)';
const VIGNETTE =
  'radial-gradient(ellipse 82% 78% at 50% 46%, transparent 34%, rgba(2,2,4,0.55) 78%, rgba(2,2,4,0.86) 100%)';

export type BillboardStageBgProps = {
  warmth?: number;
  driftX?: number;
};

const BillboardStageBg: React.FC<BillboardStageBgProps> = ({ warmth = 1, driftX = 0 }) => {
  return (
    <AbsoluteFill style={{ background: '#0a0405' }}>
      <AbsoluteFill style={{ opacity: warmth }}>
        {/* ambient Billboard image — visible */}
        <Img
          src={staticFile('tech.jpg')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'saturate(1.05) brightness(1.02)',
            transform: `scale(1.1) translateX(${driftX}px)`,
          }}
        />
        {/* light scrim for depth (lets the streaks read) */}
        <AbsoluteFill style={{ background: 'rgba(8,3,3,0.3)' }} />
        {/* top ember glow */}
        <AbsoluteFill style={{ background: EMBER_GLOW }} />
        {/* vignette frames the centre, darkens edges */}
        <AbsoluteFill style={{ background: VIGNETTE }} />
        {/* ghost wordmark — barely there */}
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              fontFamily: sora,
              fontWeight: 800,
              fontSize: s(96),
              letterSpacing: s(4),
              color: 'rgba(240,242,244,0.05)',
              whiteSpace: 'nowrap',
              lineHeight: 1,
              transform: `translate(${driftX * 0.5}px, ${s(40)}px)`,
            }}
          >
            BILLBOARD
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default BillboardStageBg;
