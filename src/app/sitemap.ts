import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { SITE_URL } from "@/lib/seo";

/**
 * One page, so one entry — but it carries the images with it, which is how the
 * project screenshots become eligible for Google Images.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const images = [
    `${SITE_URL}/opengraph-image`,
    ...projects.flatMap((p) => (p.shot ? [`${SITE_URL}${p.shot.src}`] : [])),
  ];

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images,
    },
  ];
}
