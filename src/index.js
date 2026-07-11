import { applyConvolution } from './filters.js';
import { rgbToHsv, hsvToRgb } from './color.js';
import { calculateHistogram } from './analytics.js';
import { KERNELS } from './kernels.js';

export class ImgStry {
  constructor(canvasElement) {
    if (!canvasElement) throw new Error('Canvas element is required');
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext('2d');
    this.history = [];
  }

  loadImage(img) {
    this.canvas.width = img.naturalWidth || img.width;
    this.canvas.height = img.naturalHeight || img.height;
    this.ctx.drawImage(img, 0, 0);
    const data = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.history = [data];
  }

  getHistogram() {
    const current = this.getCurrentData();
    return current ? calculateHistogram(current) : null;
  }

  getCurrentData() {
    return this.history[this.history.length - 1] || null;
  }

  applyKernel(name) {
    const current = this.getCurrentData();
    if (!current) return;
    const kernel = KERNELS[name];
    if (!kernel) throw new Error('Kernel preset not found: ' + name);

    const processed = applyConvolution(current, kernel);
    this.history.push(processed);
    this.ctx.putImageData(processed, 0, 0);
  }

  adjustSaturation(amount) {
    const current = this.getCurrentData();
    if (!current) return;
    const data = current.data;
    const output = new Uint8ClampedArray(data.length);

    for (let i = 0; i < data.length; i += 4) {
      const hsv = rgbToHsv(data[i], data[i+1], data[i+2]);
      hsv.s = Math.max(0, Math.min(1, hsv.s * amount));
      const rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);

      output[i] = rgb.r;
      output[i+1] = rgb.g;
      output[i+2] = rgb.b;
      output[i+3] = data[i+3];
    }

    const next = new ImageData(output, current.width, current.height);
    this.history.push(next);
    this.ctx.putImageData(next, 0, 0);
  }

  undo() {
    if (this.history.length > 1) {
      this.history.pop();
      const prev = this.getCurrentData();
      this.ctx.putImageData(prev, 0, 0);
    }
  }
}