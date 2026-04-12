import { notFound } from "next/navigation";
import {
  getRestaurantBySlug,
  getHeatmapData,
  getRatingsByRestaurant,
} from "@/lib/supabase/queries";
import RestaurantHero from "@/components/restaurant/RestaurantHero";
import NoiseHeatmap from "@/components/restaurant/NoiseHeatmap";
import Reviews from "@/components/restaurant/Reviews";
import RatingForm from "@/components/restaurant/RatingForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);

  if (!restaurant) return {};

  return {
    title: `${restaurant.name} — Quiet Dining in ${restaurant.area}`,
    description: `Is ${restaurant.name} quiet? Rated ${restaurant.score}/10 for noise by the DineSotto community. ${restaurant.cuisine} restaurant in ${restaurant.area}, London. See noise heatmap by time and day.`,
    alternates: {
      canonical: `https://dinesotto.com/restaurant/${slug}`,
    },
    openGraph: {
      title: `${restaurant.name} — Noise Rating & Quiet Dining Guide`,
      description: `Community noise rating for ${restaurant.name} in ${restaurant.area}. ${restaurant.cuisine} · ${restaurant.price} · See when it's quietest.`,
      url: `https://dinesotto.com/restaurant/${slug}`,
      images: restaurant.photo
        ? [
            {
              url: restaurant.photo,
              width: 1200,
              height: 630,
              alt: restaurant.name,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${restaurant.name} — Noise Rating`,
      description: `Is ${restaurant.name} quiet? See community noise ratings by time and day.`,
    },
  };
}

export default async function RestaurantPage({ params }: Props) {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);

  if (!restaurant) notFound();

  const [heatmapData, reviews] = await Promise.all([
    getHeatmapData(restaurant.id),
    getRatingsByRestaurant(restaurant.id),
  ]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurant.name,
    url: `https://dinesotto.com/restaurant/${restaurant.slug}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: restaurant.address,
      addressLocality: restaurant.area,
      postalCode: restaurant.postcode,
      addressCountry: "GB",
    },
    geo:
      restaurant.lat && restaurant.lng
        ? {
            "@type": "GeoCoordinates",
            latitude: restaurant.lat,
            longitude: restaurant.lng,
          }
        : undefined,
    servesCuisine: restaurant.cuisine,
    priceRange: restaurant.price,
    image: restaurant.photo ?? undefined,
    aggregateRating:
      restaurant.ratings > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: restaurant.score,
            ratingCount: restaurant.ratings,
            bestRating: 10,
            worstRating: 0,
          }
        : undefined,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <RestaurantHero
        photo={restaurant.photo ?? undefined}
        name={restaurant.name}
        cuisine={restaurant.cuisine}
        area={restaurant.area}
        address={restaurant.address}
        price={restaurant.price}
        verified={restaurant.verified}
        overallScore={restaurant.score}
        musicScore={restaurant.musicScore}
        crowdScore={restaurant.crowdScore}
        spacingScore={restaurant.spacingScore}
        bestTime={restaurant.bestTime}
        noise={restaurant.noise}
        bookingUrl={restaurant.bookingUrl}
      />
      <NoiseHeatmap data={heatmapData} />
      <Reviews reviews={reviews} />
      <RatingForm restaurantId={restaurant.id} />
    </main>
  );
}
