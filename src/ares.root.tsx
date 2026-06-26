/**
 * ares.root.tsx — a MINIMAL Remotion root that registers ONLY AresIntro, so the
 * bundle stays small enough to render on this RAM-constrained box (see the Ella
 * equivalent). The canonical Root.tsx also registers AresIntro for the Studio.
 */
import React from 'react';
import { Composition } from 'remotion';
import { AresIntro, TOTAL_FRAMES } from './ares';

export const AresOnlyRoot: React.FC = () => (
  <Composition id="AresIntro" component={AresIntro} durationInFrames={TOTAL_FRAMES} fps={30} width={1920} height={1080} />
);
