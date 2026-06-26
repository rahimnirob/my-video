import { loadFont } from '@remotion/google-fonts/Inter';

// Inter — the only typeface for Ares. 500 is included for the glass-panel titles.
const { fontFamily } = loadFont('normal', { weights: ['400', '500', '600', '700', '800'], subsets: ['latin'] });

export const INTER = fontFamily;
