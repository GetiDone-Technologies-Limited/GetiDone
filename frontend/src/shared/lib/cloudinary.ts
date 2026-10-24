import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';

export const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'z6lzcwi8';

export const cld = new Cloudinary({
  cloud: {
    cloudName: CLOUDINARY_CLOUD_NAME,
  },
  url: {
    secure: true,
  },
});

export interface CloudinaryImageOptions {
  width?: number;
  height?: number;
  crop?: 'auto' | 'fill' | 'scale' | 'thumb';
  gravity?: 'auto' | string;
  format?: 'auto' | string;
  quality?: 'auto' | number | string;
}

/**
 * Creates an optimized Cloudinary image instance ready for AdvancedImage or .toURL()
 */
export function getCloudinaryImage(
  publicId: string,
  options: CloudinaryImageOptions = {}
) {
  const {
    width,
    height,
    gravity = 'auto',
    format = 'auto',
    quality = 'auto',
  } = options;

  let image = cld.image(publicId).format(format).quality(quality);

  if (width || height) {
    let resizeAction = auto();
    if (gravity === 'auto') {
      resizeAction = resizeAction.gravity(autoGravity());
    }
    if (width) resizeAction = resizeAction.width(width);
    if (height) resizeAction = resizeAction.height(height);

    image = image.resize(resizeAction);
  }

  return image;
}

/**
 * Convenience helper to return a transformed CDN URL string directly
 */
export function getCloudinaryUrl(
  publicId: string,
  options: CloudinaryImageOptions = {}
): string {
  return getCloudinaryImage(publicId, options).toURL();
}
