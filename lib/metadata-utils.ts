/**
 * Constructs the dynamic Open Graph image URL
 */
export function buildOGImageUrl({
  title,
  locale = "en",
  type = "default",
}: {
  title: string;
  locale?: string;
  type?: "default" | "blog" | "resource";
}): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const params = new URLSearchParams({
    title: title.substring(0, 100), // Limit length
    locale,
    type,
  });

  return `${baseUrl}/api/og?${params.toString()}`;
}

/**
 * Generates complete metadata for a page
 */
export function generatePageMetadata({
  title,
  description,
  locale = "en",
  path = "",
  type = "default",
}: {
  title: string;
  description: string;
  locale?: string;
  path?: string;
  type?: "default" | "blog" | "resource";
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const url = `${baseUrl}${path}`;
  const ogImage = buildOGImageUrl({ title, locale, type });

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: title,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/png",
        },
      ],
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
