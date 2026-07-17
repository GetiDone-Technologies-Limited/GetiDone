const { Jimp } = require('jimp');
const path = require('path');

async function processLogo() {
  const inputPath = path.join(__dirname, 'public', 'logo.png');
  const outputPath = path.join(__dirname, 'public', 'logo.png'); // overwrite
  const faviconPath = path.join(__dirname, 'src', 'app', 'favicon.ico');

  try {
    const image = await Jimp.read(inputPath);
    
    // We assume the background is Navy (#1A2530 or similar) or Black, and it's around the edges.
    // However, the user said "remove the logo background".
    // A simple way with Jimp is to make a specific color transparent, but anti-aliasing can make it messy.
    // Instead, let's use Jimp's opaque background removal (flood fill with transparency from 0,0).
    const targetColor = image.getPixelColor(0, 0); // Get top-left pixel
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      const color = image.getPixelColor(x, y);
      // If color is very close to targetColor, make it transparent
      if (color === targetColor) {
        this.bitmap.data[idx + 3] = 0; // alpha = 0
      }
    });

    // Write the transparent logo
    await image.write(outputPath);
    console.log('Processed transparent logo.png');
    console.log('Processed transparent logo.png');

    // Make favicon
    const favImage = await Jimp.read(inputPath);
    favImage.resize({ w: 32, h: 32 });
    // write to favicon.ico (Jimp doesn't natively do .ico, but PNG with .ico extension often works in modern browsers, 
    // or we can write to icon.png which Next.js App router prefers)
    await favImage.write(path.join(__dirname, 'src', 'app', 'icon.png'));
    console.log('Created icon.png');
    console.log('Created icon.png');

  } catch (err) {
    console.error('Error processing logo:', err);
  }
}

processLogo();
