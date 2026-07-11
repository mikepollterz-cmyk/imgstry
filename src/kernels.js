// Convolution kernel presets for image filtering
export const KERNELS = {
  sharpen: [
     0, -1,  0,
    -1,  5, -1,
     0, -1,  0
  ],
  boxBlur: [
    1/9, 1/9, 1/9,
    1/9, 1/9, 1/9,
    1/9, 1/9, 1/9
  ],
  gaussianBlur: [
    1/16, 2/16, 1/16,
    2/16, 4/16, 2/16,
    1/16, 2/16, 1/16
  ],
  sobelHorizontal: [
    -1,  0,  1,
    -2,  0,  2,
    -1,  0,  1
  ],
  sobelVertical: [
    -1, -2, -1,
     0,  0,  0,
     1,  2,  1
  ],
  laplacian: [
    0,  1, 0,
    1, -4, 1,
    0,  1, 0
  ]
};