import { bundle } from '@remotion/bundler';
import { selectComposition, renderMedia } from '@remotion/renderer';
import { enableTailwind } from '@remotion/tailwind-v4';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

// Ensure output directory exists
mkdirSync('out', { recursive: true });

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

console.log('▸ Bundling Remotion project…');
const serveUrl = await bundle({
  entryPoint: path.resolve('src/index.ts'),
  webpackOverride,
});

console.log('▸ Selecting composition "BillboardStoryboard"…');
const composition = await selectComposition({ serveUrl, id: 'BillboardStoryboard' });

console.log(`▸ Video details: ${composition.width}x${composition.height} @ ${composition.fps}fps, ${composition.durationInFrames} frames (${(composition.durationInFrames / composition.fps).toFixed(2)}s)`);
console.log('▸ Starting render with high-quality settings (H264, CRF 12)…');

let lastLoggedPercent = -1;

await renderMedia({
  composition,
  serveUrl,
  codec: 'h264',
  outputLocation: 'out/billboard-storyboard.mp4',
  crf: 12,
  overwrite: true,
  onProgress: ({ progress, renderedFrames, encodedFrames, stitchStage }) => {
    const percent = Math.round(progress * 100);
    if (percent !== lastLoggedPercent) {
      console.log(`Render Progress: ${percent}% | Rendered: ${renderedFrames}/${composition.durationInFrames} frames | Encoded: ${encodedFrames} frames`);
      lastLoggedPercent = percent;
    }
    if (stitchStage) {
      console.log(`Stitching stage: ${stitchStage}`);
    }
  },
});

console.log('\n✓ Render complete! Video saved to: out/billboard-storyboard.mp4');
process.exit(0);
