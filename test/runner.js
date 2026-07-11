import { rgbToHsv, hsvToRgb } from '../src/color.js';
import { calculateHistogram } from '../src/analytics.js';

console.log('--- Initializing Test Runner ---');
const redHsv = rgbToHsv(255, 0, 0);
console.log('RGB to HSV conversion test: ', redHsv.h === 0 && redHsv.s === 1 && redHsv.v === 1 ? 'PASSED' : 'FAILED');

const backRgb = hsvToRgb(redHsv.h, redHsv.s, redHsv.v);
console.log('HSV to RGB conversion test: ', backRgb.r === 255 && backRgb.g === 0 && backRgb.b === 0 ? 'PASSED' : 'FAILED');

const mockImg = {
  width: 2,
  height: 2,
  data: new Uint8Array([
    255, 0, 0, 255,  0, 255, 0, 255,
    0, 0, 255, 255,  255, 255, 255, 255
  ])
};
const hist = calculateHistogram(mockImg);
console.log('Histogram length checks: ', hist.red.length === 256 && hist.luminance[255] === 1 ? 'PASSED' : 'FAILED');
console.log('--- Test Runner Finished ---');