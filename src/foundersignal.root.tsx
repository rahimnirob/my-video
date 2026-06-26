/**
 * foundersignal.root.tsx — a MINIMAL Remotion root that registers ONLY FounderSignalIntro,
 * so the bundle stays small enough to render on this RAM-constrained box (see the Ella
 * equivalent). The canonical Root.tsx also registers FounderSignalIntro for the Studio.
 */
import React from 'react';
import { Composition } from 'remotion';
import { FounderSignalIntro } from './foundersignal/FounderSignalIntro';
import { TOTAL_FRAMES } from './foundersignal/foundersignal-tokens';

export const FounderSignalOnlyRoot: React.FC = () => (
  <Composition id="FounderSignalIntro" component={FounderSignalIntro} durationInFrames={TOTAL_FRAMES} fps={30} width={1920} height={1080} />
);
