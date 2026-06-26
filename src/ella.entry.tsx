// Minimal entry for low-RAM EllaIntro renders (see ella.root.tsx).
// No './index.css' import on purpose — EllaIntro uses inline styles only, so we
// skip Tailwind to keep the bundle small.
import { registerRoot } from 'remotion';
import { EllaOnlyRoot } from './ella.root';

registerRoot(EllaOnlyRoot);
