// Spot-check stills for any OnAirExplainer beat.
//   node scripts/stills.mjs                       → default frames of OnAirExplainer
//   node scripts/stills.mjs OnAirExplainer 0 60 120 180
// Bundles ONCE (avoids the flaky webpack re-bundle hash crash), then renders
// each frame to out/stills/<comp>-f<frame>.png
import { bundle } from '@remotion/bundler';
import { selectComposition, renderStill } from '@remotion/renderer';
import { enableTailwind } from '@remotion/tailwind-v4';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const compId = args[0] && !/^\d+$/.test(args[0]) ? args.shift() : 'OnAirExplainer';
const framesList = args.length ? args.map(Number) : [12, 60, 100, 130, 165, 185];

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

console.log('▸ bundling once…');
const serveUrl = await bundle({
  entryPoint: path.resolve('src/index.ts'),
  webpackOverride,
});

const composition = await selectComposition({ serveUrl, id: compId });

for (const f of framesList) {
  const output = `out/stills/${compId}-f${f}.png`;
  await renderStill({
    composition,
    serveUrl,
    output,
    frame: f,
    imageFormat: 'png',
    overwrite: true,
  });
  console.log(`✓ ${output}`);
}

console.log('\n✓ stills in out/stills/');
process.exit(0);
