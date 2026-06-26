/**
 * ella.root.tsx — a MINIMAL Remotion root that registers ONLY EllaIntro.
 *
 * The full RemotionRoot pulls in every video (broadcast, archived, terminalnav,
 * onair, …) — each loading multiple fonts and images. On this 8GB box that
 * bundle OOMs the renderer. This root keeps the bundle to EllaIntro's own graph
 * so stills/MP4 render in the available RAM. Used by scripts/ella-stills.mjs and
 * the MP4 render. The canonical Root.tsx still owns EllaIntro for the Studio.
 */
import React from 'react';
import { Composition } from 'remotion';
import { EllaIntro, TOTAL_FRAMES } from './avenir/ella';

export const EllaOnlyRoot: React.FC = () => (
  <Composition
    id="EllaIntro"
    component={EllaIntro}
    durationInFrames={TOTAL_FRAMES}
    fps={30}
    width={1920}
    height={1080}
  />
);
