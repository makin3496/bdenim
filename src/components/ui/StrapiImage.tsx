import Image from "next/image";
import { getStrapiImageUrl } from "@/lib/strapi";
import type { StrapiMedia } from "@/lib/strapi";

interface Props {
  image: StrapiMedia | null | undefined;
  alt?: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
}

export default function StrapiImage({
  image,
  alt,
  className,
  fill = false,
  width,
  height,
  priority = false,
  sizes,
}: Props) {
  const url = getStrapiImageUrl(image?.url);
  const altText = alt || image?.alternativeText || "";

  if (fill) {
    return (
      <Image
        src={url}
        alt={altText}
        fill
        className={className}
        priority={priority}
        sizes={sizes || "100vw"}
        style={{ objectFit: "cover" }}
      />
    );
  }

  return (
    <Image
      src={url}
      alt={altText}
      width={width || image?.width || 800}
      height={height || image?.height || 600}
      className={className}
      priority={priority}
      sizes={sizes}
    />
  );
}
