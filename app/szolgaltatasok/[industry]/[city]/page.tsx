import { notFound } from "next/navigation";

// The ~200 industry x city SEO pages are retired (Péter 2026-10-05, 6328): they answer with a
// proper 404. They returned 500 before, because the page read `params` synchronously, which is
// a Promise in Next 16. The target list stays in lib/data/seo_targets.json.
export const dynamicParams = true;

export default function IndustryCityPage(): never {
  notFound();
}
