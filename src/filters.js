import { KERNELS } from './kernels.js';

export function applyConvolution(imageData, kernel) {
  const w = imageData.width;
  const h = imageData.height;
  const src = imageData.data;
  const dst = new Uint8ClampedArray(src.length);
  const side = Math.round(Math.sqrt(kernel.length));
  const halfSide = Math.floor(side / 2);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const dstIdx = (y * w + x) * 4;
      let r = 0, g = 0, b = 0;

      for (let cy = 0; cy < side; cy++) {
        for (let cx = 0; cx < side; cx++) {
          const scy = Math.min(h - 1, Math.max(0, y + cy - halfSide));
          const scx = Math.min(w - 1, Math.max(0, x + cx - halfSide));
          const srcIdx = (scy * w + scx) * 4;
          const wt = kernel[cy * side + cx];

          r += src[srcIdx] * wt;
          g += src[srcIdx + 1] * wt;
          b += src[srcIdx + 2] * wt;
        }
      }

      dst[dstIdx] = Math.min(255, Math.max(0, r));
      dst[dstIdx + 1] = Math.min(255, Math.max(0, g));
      dst[dstIdx + 2] = Math.min(255, Math.max(0, b));
      dst[dstIdx + 3] = src[dstIdx + 3]; // Alpha channel unchanged
    }
  }
  return new ImageData(dst, w, h);
}