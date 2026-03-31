"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FilterBar from "./FilterBar";
import ExploreLayout from "./ExploreLayout";
import { MappedRestaurant } from "@/lib/supabase/mappers";

interface Props {
  restaurants: MappedRestaurant[];
}

export default function ExploreWrapper({ restaurants }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeNoise, setActiveNoise] = useState("all");
  const [activeCuisine, setActiveCuisine] = useState("");
  const [activeOccasion, setActiveOccasion] = useState("");
  const [activeArea, setActiveArea] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [view, setView] = useState<"cards" | "map">("cards");
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const area = searchParams.get("area");
    const filter = searchParams.get("filter");
    const search = searchParams.get("search");

    if (area) {
      const decoded = decodeURIComponent(area.replace(/\+/g, " "))
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      setActiveArea(decoded);
    }
    if (filter === "verified") setVerifiedOnly(true);
    if (search) setSearchQuery(decodeURIComponent(search));
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

  function clearArea() {
    setActiveArea("");
    router.replace("/explore");
  }

  const filtered = restaurants.filter((r) => {
    if (activeNoise === "library" && r.noise !== "Library Quiet") return false;
    if (activeNoise === "pleasant" && r.noise !== "Pleasantly Quiet")
      return false;
    if (activeNoise === "moderate" && r.noise !== "Moderate") return false;
    if (activeCuisine && r.cuisine !== activeCuisine) return false;
    if (activeOccasion && !r.occasions?.includes(activeOccasion)) return false;
    if (activeArea && r.area !== activeArea) return false;
    if (verifiedOnly && !r.verified) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (
        !r.name.toLowerCase().includes(q) &&
        !r.area.toLowerCase().includes(q) &&
        !r.cuisine.toLowerCase().includes(q)
      )
        return false;
    }
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
        clearArea={clearArea}
        verifiedOnly={verifiedOnly}
        setVerifiedOnly={setVerifiedOnly}
        view={view}
        setView={setView}
        isMobile={isMobile}
      />
      <ExploreLayout
        restaurants={filtered}
        view={isMobile ? "cards" : view}
        initialSearch={searchQuery}
      />
    </>
  );
}
