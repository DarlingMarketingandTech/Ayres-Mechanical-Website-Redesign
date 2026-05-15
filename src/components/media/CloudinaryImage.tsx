import { CldImage, CldImageProps } from 'next-cloudinary';
import { cn } from '@/lib/utils'; // Assuming cn utility is at this path, will check

export interface CloudinaryImageProps extends Omit<CldImageProps, 'src'> {
  /**
   * The public ID of the image (or path relative to the root if not fully specified).
   * E.g. '07-team-trucks-office/van-mockup'
   */
  publicId: string;
  className?: string;
  alt: string;
}

export function CloudinaryImage({
  publicId,
  className,
  alt,
  ...props
}: CloudinaryImageProps) {
  return (
    <CldImage
      src={publicId}
      alt={alt}
      className={cn('object-cover', className)}
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" // simple transparent/grey blur as fallback
      // Default quality/formats for optimization
      format="auto"
      quality="auto"
      {...props}
    />
  );
}
