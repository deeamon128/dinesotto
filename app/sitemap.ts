import { MetadataRoute } from "next";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("restaurants")
    .select("slug, updated_at");

  const restaurantPages = (data ?? []).map((r) => ({
    url: `https://dinesotto.com/restaurant/${r.slug}`,
    lastModified: new Date(r.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://dinesotto.com",
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: "https://dinesotto.com/explore",
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: "https://dinesotto.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: "https://dinesotto.com/noise",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: "https://dinesotto.com/rate",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: "https://dinesotto.com/suggest",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    ...restaurantPages,
  ];
}