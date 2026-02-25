'use client';

import { Button } from '@/components/ui/button';
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MarkerLabel,
  MapRoute,
  MapControls,
  MapClusterLayer,
  MarkerTooltip,
  MapPopup,
} from '@/components/ui/map';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { Star, Clock, Navigation, ExternalLink } from 'lucide-react';
import type { LocationType } from '@/types/locations.types';
import LOCATIONS from '@/data/locations.json';

const NORTH_VENEZUELA_COORDINATES = [-66.88, 10.49] as [number, number];

export default function MapCNPage() {
  const [selectedPoint, setSelectedPoint] = useState<{
    coordinates: [number, number];
    properties: LocationType;
  } | null>(null);

  const geojsonData = useMemo(
    () =>
      ({
        type: 'FeatureCollection',
        features: LOCATIONS.map((location) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [location.lng, location.lat],
          },
          properties: location,
        })),
      }) as GeoJSON.FeatureCollection<GeoJSON.Point, LocationType>,
    [],
  );

  return (
    <div className="relative flex flex-col gap-8">
      <h1 className="text-2xl font-bold">MapCN</h1>
      <div className="h-screen w-full space-y-4 mb-16">
        <h2 className="text-xl font-semibold">Map with Cluster</h2>
        <Map
          center={NORTH_VENEZUELA_COORDINATES}
          zoom={6}
          className="w-full h-full"
        >
          <MapClusterLayer
            data={geojsonData}
            clusterRadius={50}
            clusterMaxZoom={14}
            // Yellow, Red, Green
            clusterColors={['#FFFF00', '#FF0000', '#00FF00']}
            clusterThresholds={[3, 6]}
            onPointClick={(feature, coordinates) => {
              setSelectedPoint({
                coordinates,
                properties: feature.properties as LocationType,
              });
            }}
          />

          {/* Markers with ClusterLayer */}
          {selectedPoint && (
            <MapPopup
              key={`${selectedPoint.coordinates[0]}-${selectedPoint.coordinates[1]}`}
              longitude={selectedPoint.coordinates[0]}
              latitude={selectedPoint.coordinates[1]}
              onClose={() => setSelectedPoint(null)}
              closeOnClick={false}
              focusAfterOpen={false}
              closeButton
              className="p-0 w-62"
            >
              {/* Card */}
              <div className="relative h-32 overflow-hidden rounded-t-md">
                <Image
                  fill
                  src={selectedPoint.properties.image}
                  alt={selectedPoint.properties.name}
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 p-3">
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {selectedPoint.properties.category}
                  </span>
                  <h3 className="font-semibold text-foreground leading-tight">
                    {selectedPoint.properties.name}
                  </h3>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="size-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-medium">
                      {selectedPoint.properties.rating}
                    </span>
                    <span className="text-muted-foreground">
                      ({selectedPoint.properties.reviews.toLocaleString()})
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="size-3.5" />
                  <span>{selectedPoint.properties.hours}</span>
                </div>
                <div className="flex gap-2 pt-1">
                  <Button size="sm" className="flex-1 h-8">
                    <Navigation className="size-3.5 mr-1.5" />
                    Directions
                  </Button>
                  <Button size="sm" variant="outline" className="h-8">
                    <ExternalLink className="size-3.5" />
                  </Button>
                </div>
              </div>
            </MapPopup>
          )}

          {/* Controls */}
          <MapControls
            position="bottom-right"
            showZoom
            showCompass
            showLocate
            showFullscreen
          />
        </Map>
      </div>
      <div className="h-screen w-full space-y-4">
        <h2 className="text-xl font-semibold">Map with Markers</h2>
        <Map
          center={NORTH_VENEZUELA_COORDINATES}
          zoom={6}
          className="w-full h-full"
        >
          {/* Normal markers */}
          {LOCATIONS.map((location) => (
            <MapMarker
              key={location.id}
              longitude={location.lng}
              latitude={location.lat}
            >
              <MarkerContent>
                <div className="size-10 border-2 border-white cursor-pointer hover:scale-110 transition-transform after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-transparent after:border-t-rose-500">
                  <Image
                    src="/xana-icon.jpg"
                    alt="Xana Icon"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <MarkerLabel position="bottom">{location.label}</MarkerLabel>
              </MarkerContent>
              <MarkerPopup className="p-0 w-62">
                <div className="relative h-32 overflow-hidden rounded-t-md">
                  <Image
                    fill
                    src={location.image}
                    alt={location.name}
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2 p-3">
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {location.category}
                    </span>
                    <h3 className="font-semibold text-foreground leading-tight">
                      {location.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="size-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-medium">{location.rating}</span>
                      <span className="text-muted-foreground">
                        ({location.reviews.toLocaleString()})
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="size-3.5" />
                    <span>{location.hours}</span>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <Button size="sm" className="flex-1 h-8">
                      <Navigation className="size-3.5 mr-1.5" />
                      Directions
                    </Button>
                    <Button size="sm" variant="outline" className="h-8">
                      <ExternalLink className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </MarkerPopup>
            </MapMarker>
          ))}

          {/* Controls */}
          <MapControls
            position="bottom-right"
            showZoom
            showCompass
            showLocate
            showFullscreen
          />
        </Map>
      </div>
    </div>
  );
}
