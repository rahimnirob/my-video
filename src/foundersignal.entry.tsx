// Minimal entry for low-RAM FounderSignalIntro renders (see foundersignal.root.tsx).
// No './index.css' import on purpose — FounderSignalIntro uses inline styles only, so we
// skip Tailwind to keep the bundle small.
import { registerRoot } from 'remotion';
import { FounderSignalOnlyRoot } from './foundersignal.root';

registerRoot(FounderSignalOnlyRoot);
