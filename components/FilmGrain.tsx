"use client";

import { useEffect, useRef } from "react";

/**
 * FilmGrain — animated canvas-based film grain overlay.
 *
 * Visual specs:
 *   - opacity: 0.055
 *   - mix-blend-mode: soft-light
 *   - z-index: 9999
 *   - frame rate: 15 FPS
 *   - target pixel count: 2,000,000 (canvas scales down for performance)
 *
 * Required CSS (add to globals.css / globals.scss):
 *   .filmGrain {
 *     position: fixed;
 *     inset: 0;
 *     width: 100%;
 *     height: 100%;
 *     pointer-events: none;
 *     opacity: 0.055;
 *     mix-blend-mode: soft-light;
 *     z-index: 9999;
 *   }
 *
 * Respects prefers-reduced-motion — pauses animation when enabled.
 * Place as the last child of <body> (or layout root) so it sits above all content.
 * The parent element needs `isolation: isolate` on body for blend mode to work correctly.
 */

const FRAME_RATE = 15;
const TARGET_PIXEL_COUNT = 2_000_000;

export function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
    });
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
      for (let index = 0; index < pixels.length; index += 4) {
        const gray = (Math.random() * 255) | 0;
        pixels[index] = gray;
        pixels[index + 1] = gray;
        pixels[index + 2] = gray;
        pixels[index + 3] = 255;
      }
      context.putImageData(imageData, 0, 0);
    };

    const resizeCanvas = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const scale = Math.max(
        1,
        Math.sqrt((viewportWidth * viewportHeight) / TARGET_PIXEL_COUNT),
      );
      canvas.width = Math.ceil(viewportWidth / scale);
      canvas.height = Math.ceil(viewportHeight / scale);
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
