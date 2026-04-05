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

export default async function RestaurantPage({ params }: Props) {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);

  if (!restaurant) notFound();

  const [heatmapData, reviews] = await Promise.all([
    getHeatmapData(restaurant.id),
    getRatingsByRestaurant(restaurant.id),
  ]);

  return (
    <main>
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
