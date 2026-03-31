"use client";

import {
  APIProvider,
  Map as GoogleMapComponent,
  InfoWindow,
  useMap,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MappedRestaurant } from "@/lib/supabase/mappers";

const NOISE_COLOURS: Record<string, string> = {
  "Library Quiet": "#2c4a2c",
  "Pleasantly Quiet": "#4e6e4e",
  Moderate: "#c8883a",
  Loud: "#b85c20",
  "Very Loud": "#8b3a1a",
};

const MAP_STYLES = [
  { elementType: "geometry", stylers: [{ color: "#e8f0e8" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#4a6741" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f5f0e8" }] },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#c8dcc8" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#3d5a3d" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#f5f0e8" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#d8d0c0" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#e8e0d0" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#d0c8b8" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#ddeadd" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#c8dcc8" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#3d5a3d" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#ddeadd" }],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ color: "#8aaa8a" }],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#eaf2ea" }],
  },
];

interface Props {
  restaurants: MappedRestaurant[];
  hoveredSlug?: string | null;
  selectedSlug?: string | null;
  onSelectSlug?: (slug: string | null) => void;
}

function MapContent({
  restaurants,
  hoveredSlug,
  selectedSlug,
  onSelectSlug,
}: Props) {
  const map = useMap();
  const selected = restaurants.find((r) => r.slug === selectedSlug);
  const [markers, setMarkers] = useState<Map<string, google.maps.Marker>>(
    new Map(),
  );

  // Create markers once map is ready
  useEffect(() => {
    if (!map) return;

    const newMarkers = new Map<string, google.maps.Marker>();

    restaurants.forEach((restaurant) => {
      const colour = NOISE_COLOURS[restaurant.noise] ?? "#2c4a2c";

      const marker = new google.maps.Marker({
        position: { lat: restaurant.lat, lng: restaurant.lng },
        map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: colour,
          fillOpacity: 1,
          strokeColor: "white",
          strokeWeight: 2,
        },
        title: restaurant.name,
      });

      marker.addListener("click", () => {
        onSelectSlug?.(
          selectedSlug === restaurant.slug ? null : restaurant.slug,
        );
      });

      newMarkers.set(restaurant.slug, marker);
    });

    setMarkers(newMarkers);

    return () => {
      newMarkers.forEach((marker) => marker.setMap(null));
    };
  }, [map]);

  // Update marker styles on hover/select
  useEffect(() => {
    markers.forEach((marker, slug) => {
      const restaurant = restaurants.find((r) => r.slug === slug);
      if (!restaurant) return;

      const colour = NOISE_COLOURS[restaurant.noise] ?? "#2c4a2c";
      const isHovered = hoveredSlug === slug;
      const isSelected = selectedSlug === slug;

      marker.setIcon({
        path: google.maps.SymbolPath.CIRCLE,
        scale: isSelected ? 12 : isHovered ? 10 : 8,
        fillColor: isSelected ? "#c8883a" : colour,
        fillOpacity: 1,
        strokeColor: "white",
        strokeWeight: isSelected ? 3 : 2,
      });

      marker.setZIndex(isSelected ? 100 : isHovered ? 50 : 1);
    });
  }, [markers, hoveredSlug, selectedSlug]);

  // Pan on hover
  useEffect(() => {
    if (!map || !hoveredSlug) return;
    const r = restaurants.find((r) => r.slug === hoveredSlug);
    if (r) map.panTo({ lat: r.lat, lng: r.lng });
  }, [map, hoveredSlug]);

  // Fly to selected
  useEffect(() => {
    if (!map || !selectedSlug) return;
    const r = restaurants.find((r) => r.slug === selectedSlug);
    if (r) {
      map.panTo({ lat: r.lat, lng: r.lng });
      map.setZoom(14);
    }
  }, [map, selectedSlug]);

  return (
    <>
      {selected && (
        <InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => onSelectSlug?.(null)}
          pixelOffset={[0, -20]}
        >
          <div className="min-w-[220px] p-1">
            <div
              className="h-0.5 w-full rounded mb-3"
              style={{ background: NOISE_COLOURS[selected.noise] ?? "#2c4a2c" }}
            />
            <p
              className="font-sans text-[0.58rem] tracking-[0.12em] uppercase mb-1"
              style={{ color: NOISE_COLOURS[selected.noise] }}
            >
              {selected.noise}
            </p>
            <p className="font-display text-base font-medium text-green-800 mb-0.5">
              {selected.name}
            </p>
            <p className="font-sans text-xs text-muted mb-3">
              {selected.cuisine} · {selected.area} · {selected.price}
            </p>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-sans text-[0.52rem] uppercase tracking-wide text-muted/50 mb-0.5">
                  Score
                </p>
                <p className="font-display text-2xl font-light text-green-600">
                  {selected.score}
                </p>
              </div>
              <div className="text-right">
                <p className="font-sans text-[0.52rem] uppercase tracking-wide text-muted/50 mb-0.5">
                  Best time
                </p>
                <p className="font-display text-xs italic text-amber">
                  {selected.bestTime}
                </p>
              </div>
            </div>
            <div className="flex gap-1.5 mb-4">
              {selected.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="font-sans text-[0.58rem] px-2 py-0.5 rounded border border-warm-border text-muted/70"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href={`/restaurant/${selected.slug}`}
              className="block w-full text-center bg-green-600 hover:bg-green-500 text-white font-sans text-[0.72rem] font-medium tracking-wide py-2.5 rounded transition-colors"
            >
              View Restaurant →
            </Link>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

export default function GoogleMap({
  restaurants,
  hoveredSlug,
  selectedSlug,
  onSelectSlug,
}: Props) {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMapComponent
        defaultCenter={{ lat: 51.505, lng: -0.118 }}
        defaultZoom={12}
        gestureHandling="greedy"
        mapTypeControl={false}
        streetViewControl={false}
        fullscreenControl={false}
        styles={MAP_STYLES}
        style={{ width: "100%", height: "100%" }}
      >
        <MapContent
          restaurants={restaurants}
          hoveredSlug={hoveredSlug}
          selectedSlug={selectedSlug}
          onSelectSlug={onSelectSlug}
        />
      </GoogleMapComponent>
    </APIProvider>
  );
}
