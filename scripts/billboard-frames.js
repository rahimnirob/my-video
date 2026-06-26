// Extract frames from the billboard reference video at 0.5s intervals
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const inputVideo = path.resolve('public/billboard/lv_0_20260624023044.mp4');
const outputDir = path.resolve('out/billboard-stills');
fs.mkdirSync(outputDir, { recursive: true });

// Get duration first
const probe = execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 "${inputVideo}"`).toString().trim();
const duration = parseFloat(probe);
console.log(`Video duration: ${duration}s`);

const times = [];
for (let t = 0; t <= duration; t += 0.5) {
  times.push(t);
}

for (const t of times) {
  const timeStr = t.toFixed(1).replace('.', '_');
  const outFile = path.join(outputDir, `frame_${timeStr.padStart(5, '0')}.jpg`);
  try {
    execSync(`ffmpeg -y -ss ${t} -i "${inputVideo}" -frames:v 1 -q:v 2 "${outFile}"`, { stdio: 'pipe' });
    console.log(`✓ ${outFile}`);
  } catch (e) {
    console.log(`✗ frame at ${t}s failed`);
  }
}
console.log('Done!');
