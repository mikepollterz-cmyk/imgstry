import { applyConvolution } from './filters.js';
import { KERNELS } from './kernels.js';

export class ImgStryProcessor {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.originalData = null;
  }

  setImage(imageElement) {
    this.canvas.width = imageElement.naturalWidth;
    this.canvas.height = imageElement.naturalHeight;
    this.ctx.drawImage(imageElement, 0, 0);
    this.originalData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }

  filter(kernelType) {
    if (!this.originalData) return;
    const kernel = KERNELS[kernelType];
    if (!kernel) throw new Error('Unknown kernel type: ' + kernelType);
    
    const output = applyConvolution(this.originalData, kernel);
    this.ctx.putImageData(output, 0, 0);
  }
}