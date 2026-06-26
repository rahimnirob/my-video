const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

async function main() {
  const ffmpegPath = path.resolve('node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe');
  console.log('FFmpeg Path:', ffmpegPath);
  
  if (!fs.existsSync(ffmpegPath)) {
    console.error('ffmpeg.exe not found at:', ffmpegPath);
    process.exit(1);
  }
  
  const videoPath = path.resolve('public/inspiritions/Shipper_-_BREAKING_never_hire_again_AI_Employees_are_here_top_1_in_each_ski_KhDOOC.mp4');
  const outputDir = path.resolve('out/inspo-stills');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // We want to extract one frame every 3 seconds
  // The video is 35.6s long
  const times = [];
  for (let t = 0; t <= 35.5; t += 0.5) {
    times.push(t);
  }
  
  for (const t of times) {
    const timeStr = t.toFixed(1).replace('.', '_');
    const outFile = path.join(outputDir, `frame_${timeStr.padStart(5, '0')}.jpg`);
    const cmd = `"${ffmpegPath}" -y -ss ${t} -i "${videoPath}" -vframes 1 -q:v 2 "${outFile}"`;
    try {
      execSync(cmd, { stdio: 'ignore' });
      console.log(`Extracted frame at ${t}s to ${outFile}`);
    } catch (e) {
      console.error(`Failed to extract frame at ${t}s:`, e.message);
    }
  }
  
  console.log('Frame extraction complete.');
}

main().catch(console.error);
