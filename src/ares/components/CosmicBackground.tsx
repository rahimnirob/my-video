import React from 'react';
import { AbsoluteFill, Img, OffthreadVideo, staticFile } from 'remotion';
import { C } from '../ares-tokens';
import StarField from './StarField';

/**
 * CosmicBackground — the shared atmosphere: void base → optional starfield (+S4
 * gradient) → optional still image (e.g. bloom.jpg) → optional video clip (with
 * blend/opacity, optionally clipped to an expanding iris via `clipRadius`) →
 * color-grade (clip only) → dark suppression (covers image+clip) → vignette →
 * film grain. `frame` drives the grain position shift.
 */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      background: 'radial-gradient(ellipse 75% 65% at 50% 50%, transparent 30%, rgba(2,5,15,0.7) 100%)',
      pointerEvents: 'none',
    }}
  />
);

const Grain: React.FC<{ frame: number }> = ({ frame }) => {
  const steps: [number, number][] = [
    [0, 0],
    [-20, -15],
    [15, -25],
  ];
  const [px, py] = steps[Math.floor(frame / 10) % 3];
  return (
    <AbsoluteFill
      style={{
        backgroundImage: GRAIN,
        backgroundRepeat: 'repeat',
        backgroundPosition: `${px}px ${py}px`,
        opacity: 0.03,
        mixBlendMode: 'overlay',
        pointerEvents: 'none',
      }}
    />
  );
};

type Props = {
  frame: number;
  clipSrc?: string;
  clipOpacity?: number;
  clipBlend?: React.CSSProperties['mixBlendMode'];
  colorGrade?: boolean;
  suppressionOpacity?: number;
  showStarField?: boolean;
  starCount?: number;
  starSeed?: number;
  /** Iris: clip the video layer to a centred circle of this % radius. */
  clipRadius?: number;
  /** Still-image background (e.g. bloom.jpg), rendered cover. */
  imageSrc?: string;
  imageOpacity?: number;
  imageBlend?: React.CSSProperties['mixBlendMode'];
  imageObjectPosition?: string;
  imageStyle?: React.CSSProperties;
};

const CosmicBackground: React.FC<Props> = ({
  frame,
  clipSrc,
  clipOpacity = 0.5,
  clipBlend,
  colorGrade = false,
  suppressionOpacity = 0.5,
  showStarField = false,
  starCount = 150,
  starSeed = 42,
  clipRadius,
  imageSrc,
  imageOpacity = 1,
  imageBlend,
  imageObjectPosition = 'center center',
  imageStyle,
}) => {
  return (
    <AbsoluteFill style={{ background: C.void }}>
      {showStarField && <StarField count={starCount} seed={starSeed} />}
      {showStarField && (
        <AbsoluteFill style={{ background: 'linear-gradient(180deg, #02050F 0%, #0A1A3F 45%, #02050F 100%)', opacity: 0.7 }} />
      )}
      {imageSrc && (
        <Img
          src={staticFile(imageSrc)}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: imageObjectPosition,
            opacity: imageOpacity,
            mixBlendMode: imageBlend,
            ...imageStyle,
          }}
        />
      )}
      <AbsoluteFill style={{ clipPath: clipRadius != null ? `circle(${clipRadius}% at 50% 50%)` : undefined }}>
        {clipSrc && (
          <OffthreadVideo
            src={staticFile(clipSrc)}
            muted
            style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: clipOpacity, mixBlendMode: clipBlend }}
          />
        )}
        {clipSrc && colorGrade && <AbsoluteFill style={{ background: 'rgba(0,229,255,0.06)' }} />}
      </AbsoluteFill>
      {suppressionOpacity > 0 && <AbsoluteFill style={{ background: `rgba(2,5,15,${suppressionOpacity})` }} />}
      <Vignette />
      <Grain frame={frame} />
    </AbsoluteFill>
  );
};

export default CosmicBackground;
