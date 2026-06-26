import React from 'react';
import { Character, Wordmark } from '../components';

/**
 * Beat 6 — CLOSE (1140–1280). The cinematic outro: the Billboard Sentinel rises
 * out of the dark stage at the right with a warm ember halo and a slow push-in
 * (its natural habitat now that the world is the tech stage); the AVENIR
 * wordmark draws in across the left with its gold underline. A poster lockup.
 */
export const Outro: React.FC = () => (
  <>
    <Character startFrame={992} heightPct={1.02} centerXPct={0.72} />
    <Wordmark startFrame={1030} fontSize={128} top={'50%'} centerXPct={0.34} />
  </>
);

export default Outro;
