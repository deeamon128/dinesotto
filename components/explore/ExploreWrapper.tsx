"use client";

import { useState } from "react";
import FilterBar from "./FilterBar";
import ExploreLayout from "./ExploreLayout";
import { MappedRestaurant } from "@/lib/supabase/mappers";

interface Props {
  restaurants: MappedRestaurant[];
}

export default function ExploreWrapper({ restaurants }: Props) {
  const [activeNoise, setActiveNoise] = useState("all");
  const [activeCuisine, setActiveCuisine] = useState("");
  const [activeOccasion, setActiveOccasion] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const filtered = restaurants.filter((r) => {
    if (activeNoise === "library" && r.noise !== "Library Quiet") return false;
    if (activeNoise === "pleasant" && r.noise !== "Pleasantly Quiet")
      return false;
    if (activeNoise === "moderate" && r.noise !== "Moderate") return false;
    if (activeCuisine && r.cuisine !== activeCuisine) return false;
    if (activeOccasion && !r.occasions.includes(activeOccasion)) return false;
    if (verifiedOnly && !r.verified) return false;
    return true;
  });

  return (
    <>
      <FilterBar
        activeNoise={activeNoise}
        setActiveNoise={setActiveNoise}
        activeCuisine={activeCuisine}
        setActiveCuisine={setActiveCuisine}
        activeOccasion={activeOccasion}
        setActiveOccasion={setActiveOccasion}
        verifiedOnly={verifiedOnly}
        setVerifiedOnly={setVerifiedOnly}
      />
      <ExploreLayout restaurants={filtered} />
    </>
  );
}
