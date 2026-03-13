import { notFound } from "next/navigation";
import { RESTAURANTS } from "@/lib/data/restaurants";
import RestaurantHero from "@/components/restaurant/RestaurantHero";
import NoiseHeatmap from "@/components/restaurant/NoiseHeatmap";
import Reviews from "@/components/restaurant/Reviews";
import RatingForm from "@/components/restaurant/RatingForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function RestaurantPage({ params }: Props) {
  const { slug } = await params;
  const restaurant = RESTAURANTS.find((r) => r.slug === slug);

  if (!restaurant) notFound();

  return (
    <main>
      <RestaurantHero
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
      />
      <NoiseHeatmap />
      <Reviews />
      <RatingForm />
    </main>
  );
}

export async function generateStaticParams() {
  return RESTAURANTS.map((r) => ({ slug: r.slug }));
}
