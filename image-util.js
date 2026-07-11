const canvas = document.getElementById('canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let originalPixels = null;

function loadDemoImage(url) {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    originalPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
  };
  img.src = url;
}

function applyFilter(type) {
  if (!ctx || !originalPixels) return;
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const d = imgData.data;
  const o = originalPixels.data;
  
  for (let i = 0; i < d.length; i += 4) {
    const r = o[i], g = o[i+1], b = o[i+2];
    if (type === 'grayscale') {
      const v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      d[i] = d[i+1] = d[i+2] = v;
    } else if (type === 'sepia') {
      d[i] = (r * 0.393) + (g * 0.769) + (b * 0.189);
      d[i+1] = (r * 0.349) + (g * 0.686) + (b * 0.168);
      d[i+2] = (r * 0.272) + (g * 0.534) + (b * 0.131);
    } else if (type === 'invert') {
      d[i] = 255 - r;
      d[i+1] = 255 - g;
      d[i+2] = 255 - b;
    }
  }
  ctx.putImageData(imgData, 0, 0);
}

function reset() {
  if (ctx && originalPixels) ctx.putImageData(originalPixels, 0, 0);
}