import { loadFont as loadSora } from '@remotion/google-fonts/Sora';
import { loadFont as loadManrope } from '@remotion/google-fonts/Manrope';
import { loadFont as loadJetBrainsMono } from '@remotion/google-fonts/JetBrainsMono';

const { fontFamily: soraLoaded } = loadSora('normal', {
  weights: ['400', '500', '700', '800'],
  subsets: ['latin'],
});

const { fontFamily: manropeLoaded } = loadManrope('normal', {
  weights: ['400', '500', '700'],
  subsets: ['latin'],
});

const { fontFamily: monoLoaded } = loadJetBrainsMono('normal', {
  weights: ['400', '500', '700'],
  subsets: ['latin'],
});

export const sora = `${soraLoaded}, 'Sora', sans-serif`;
export const manrope = `${manropeLoaded}, 'Manrope', sans-serif`;
export const mono = `${monoLoaded}, 'JetBrains Mono', 'Fira Code', monospace`;
