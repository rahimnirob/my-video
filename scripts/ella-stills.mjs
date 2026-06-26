// Spot-check stills for EllaIntro from the MINIMAL entry (low-RAM friendly).
//   node scripts/ella-stills.mjs 30 110 240 420 540 690 845
// Bundles src/ella.entry.tsx ONCE (only EllaIntro's graph), then renders each
// frame to out/stills/EllaIntro-f<frame>.png
import { bundle } from '@remotion/bundler';
import { selectComposition, renderStill } from '@remotion/renderer';
import { enableTailwind } from '@remotion/tailwind-v4';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const framesList = args.length ? args.map(Number) : [30, 110, 240, 420, 540, 690, 845];

mkdirSync('out/stills', { recursive: true });

const webpackOverride = (config) => {
  const withTailwind = enableTailwind(config);
  const ts = { timestamp: true, hash: false };
  return {
    ...withTailwind,
    cache: false,
    output: { ...withTailwind.output, hashFunction: 'sha256' },
    snapshot: {
      ...withTailwind.snapshot,
      module: ts,
      resolve: ts,
      resolveBuildDependencies: ts,
      buildDependencies: ts,
    },
  };
};

console.log('▸ bundling EllaIntro only…');
const serveUrl = await bundle({
  entryPoint: path.resolve('src/ella.entry.tsx'),
  webpackOverride,
});

const composition = await selectComposition({ serveUrl, id: 'EllaIntro' });

for (const f of framesList) {
  const output = `out/stills/EllaIntro-f${f}.png`;
  await renderStill({ composition, serveUrl, output, frame: f, imageFormat: 'png', overwrite: true });
  console.log(`✓ ${output}`);
}

console.log('\n✓ stills in out/stills/');
process.exit(0);
