"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import FilterBar from "./FilterBar";
import ExploreLayout from "./ExploreLayout";
import { MappedRestaurant } from "@/lib/supabase/mappers";

interface Props {
  restaurants: MappedRestaurant[];
}

export default function ExploreWrapper({ restaurants }: Props) {
  const searchParams = useSearchParams();
  const [activeNoise, setActiveNoise] = useState("all");
  const [activeCuisine, setActiveCuisine] = useState("");
  const [activeOccasion, setActiveOccasion] = useState("");
  const [activeArea, setActiveArea] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [view, setView] = useState<"cards" | "map">("cards");
  const [isMobile, setIsMobile] = useState(false);

  // Read URL params on load
  useEffect(() => {
    const area = searchParams.get("area");
    const filter = searchParams.get("filter");
    if (area)
      setActiveArea(
        area
          .split("+")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" "),
      );
    if (filter === "verified") setVerifiedOnly(true);
  }, [searchParams]);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setView("cards");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const filtered = restaurants.filter((r) => {
    if (activeNoise === "library" && r.noise !== "Library Quiet") return false;
    if (activeNoise === "pleasant" && r.noise !== "Pleasantly Quiet")
      return false;
    if (activeNoise === "moderate" && r.noise !== "Moderate") return false;
    if (activeCuisine && r.cuisine !== activeCuisine) return false;
    if (activeOccasion && !r.occasions?.includes(activeOccasion)) return false;
    if (activeArea && r.area !== activeArea) return false;
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
        activeArea={activeArea}
        setActiveArea={setActiveArea}
        verifiedOnly={verifiedOnly}
        setVerifiedOnly={setVerifiedOnly}
        view={view}
        setView={setView}
        isMobile={isMobile}
      />
      <ExploreLayout restaurants={filtered} view={isMobile ? "cards" : view} />
    </>
  );
}
