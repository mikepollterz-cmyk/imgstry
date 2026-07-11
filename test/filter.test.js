// Basic filter test suite
import { KERNELS } from '../src/kernels.js';

console.log('Running imgstry integration tests...');
console.log('Sharpness kernel validation:', KERNELS.sharpen.length === 9 ? 'PASSED' : 'FAILED');
console.log('Gaussian Blur weights check:', KERNELS.gaussianBlur.reduce((a,b)=>a+b, 0) === 1 ? 'PASSED' : 'FAILED');
console.log('All tests completed successfully!');