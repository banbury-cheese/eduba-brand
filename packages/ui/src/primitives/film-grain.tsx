"use client";

import * as React from "react";

/**
 * FilmGrain — animated canvas-based film grain overlay.
 *
 * Visual specs (eduba brand):
 *   - opacity: 0.055
 *   - mix-blend-mode: soft-light
 *   - frame rate: 15 FPS
 *   - target pixel count: 2,000,000 (canvas scales for performance)
 *
 * Place as the last child of <body> (or layout root) so it sits above all content.
 * The parent must have `isolation: isolate` for blend-mode to work — applied by
 * @eduba/ui's globals.css to `body`.
 *
 * Respects `prefers-reduced-motion` — pauses animation when enabled.
 */

const FRAME_RATE = 15;
const TARGET_PIXEL_COUNT = 2_000_000;

export function FilmGrain() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!context) return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let imageData: ImageData | null = null;
    let animationFrameId = 0;
    let lastFrameTime = 0;
    let isRunning = true;

    const frameDuration = 1000 / FRAME_RATE;

    const renderGrain = () => {
      if (!imageData) return;
      const pixels = imageData.data;
      for (let i = 0; i < pixels.length; i += 4) {
        const gray = (Math.random() * 255) | 0;
        pixels[i] = gray;
        pixels[i + 1] = gray;
        pixels[i + 2] = gray;
        pixels[i + 3] = 255;
      }
      context.putImageData(imageData, 0, 0);
    };

    const resizeCanvas = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // Guard against a zero-sized viewport (mounted while the window/tab is
      // hidden). createImageData(0, …) throws IndexSizeError, and since
      // FilmGrain lives in the layout root that would crash the whole app.
      // Bail until a resize delivers real dimensions.
      if (vw < 1 || vh < 1) {
        imageData = null;
        return;
      }
      const scale = Math.max(1, Math.sqrt((vw * vh) / TARGET_PIXEL_COUNT));
      canvas.width = Math.max(1, Math.ceil(vw / scale));
      canvas.height = Math.max(1, Math.ceil(vh / scale));
      imageData = context.createImageData(canvas.width, canvas.height);
      renderGrain();
    };

    const loop = (currentTime: number) => {
      if (!isRunning || reducedMotionQuery.matches) return;
      animationFrameId = window.requestAnimationFrame(loop);
      if (currentTime - lastFrameTime < frameDuration) return;
      lastFrameTime = currentTime;
      renderGrain();
    };

    const restartLoop = () => {
      window.cancelAnimationFrame(animationFrameId);
      lastFrameTime = 0;
      if (!reducedMotionQuery.matches) {
        animationFrameId = window.requestAnimationFrame(loop);
      }
    };

    resizeCanvas();
    restartLoop();

    window.addEventListener("resize", resizeCanvas);
    reducedMotionQuery.addEventListener("change", restartLoop);

    return () => {
      isRunning = false;
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      reducedMotionQuery.removeEventListener("change", restartLoop);
    };
  }, []);

  return <canvas ref={canvasRef} className="filmGrain" aria-hidden="true" />;
}
