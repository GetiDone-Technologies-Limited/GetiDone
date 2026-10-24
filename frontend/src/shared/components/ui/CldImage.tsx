'use client';

import * as React from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { getCloudinaryImage, CloudinaryImageOptions } from '@/shared/lib/cloudinary';

export interface CldImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'width' | 'height'>,
    CloudinaryImageOptions {
  publicId: string;
  fallbackSrc?: string;
}

export function CldImage({
  publicId,
  width,
  height,
  crop,
  gravity,
  format,
  quality,
  className = '',
  alt = '',
  fallbackSrc,
  ...props
}: CldImageProps) {
  const [error, setError] = React.useState(false);

  const img = React.useMemo(() => {
    return getCloudinaryImage(publicId, {
      width,
      height,
      crop,
      gravity,
      format,
      quality,
    });
  }, [publicId, width, height, crop, gravity, format, quality]);

  if (error && fallbackSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={fallbackSrc}
        alt={alt}
        className={className}
        {...props}
      />
    );
  }

  return (
    <AdvancedImage
      cldImg={img}
      className={className}
      alt={alt}
      onError={() => setError(true)}
      {...props}
    />
  );
}

/**
 * Sample component implementing the exact Cloudinary snippet requested
 */
export const SampleCloudinaryImage = () => {
  return (
    <CldImage
      publicId="cld-sample-5"
      width={500}
      height={500}
      alt="Cloudinary Sample"
      className="rounded-2xl shadow-lg border border-slate-200"
    />
  );
};
