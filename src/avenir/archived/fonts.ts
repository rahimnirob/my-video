/**
 * archived/fonts.ts
 * Display fonts for the Archived film, loaded via @remotion/google-fonts so they
 * actually render in the bundle.
 *
 *  • anton  — heavy condensed display. The HERO/hook face: fills the frame,
 *             huge presence, pairs with the cinematic red stage.
 *  • Sora (from tokens) stays the substrate for smaller flow/body lines.
 */
import { loadFont as loadAnton } from '@remotion/google-fonts/Anton';

const { fontFamily: antonLoaded } = loadAnton('normal', {
  weights: ['400'],
  subsets: ['latin'],
});

export const anton = `${antonLoaded}, 'Anton', 'Arial Narrow', sans-serif`;
