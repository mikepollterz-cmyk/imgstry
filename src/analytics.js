// Generates image color channel distribution histograms
export function calculateHistogram(imageData) {
  const data = imageData.data;
  const histogram = {
    red: new Array(256).fill(0),
    green: new Array(256).fill(0),
    blue: new Array(256).fill(0),
    luminance: new Array(256).fill(0)
  };

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const l = Math.round(0.299 * r + 0.587 * g + 0.114 * b);

    histogram.red[r]++;
    histogram.green[g]++;
    histogram.blue[b]++;
    histogram.luminance[l]++;
  }

  return histogram;
}