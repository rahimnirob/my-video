// See all configuration options: https://remotion.dev/docs/config
// Each option also is available as a CLI flag: https://remotion.dev/docs/cli

// Note: When using the Node.JS APIs, the config file doesn't apply. Instead, pass options directly to the APIs

import { Config } from "@remotion/cli/config";
import { enableTailwind } from '@remotion/tailwind-v4';

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);

// Node 22 + this webpack throws a FileSystemInfo hashing crash
// ("Cannot read properties of undefined (reading 'length')") while
// content-hashing node_modules snapshots. Disable cache, force sha256, and make
// snapshots timestamp-based (not hash-based). Mirrors scripts/stills.mjs — keep
// the two in sync or CLI renders break.
Config.overrideWebpackConfig((config) => {
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
});
