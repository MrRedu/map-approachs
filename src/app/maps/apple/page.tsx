'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface MapKitCoordinate {
  latitude: number;
  longitude: number;
}

interface MapKitAnnotation {
  coordinate: MapKitCoordinate;
  title?: string;
  subtitle?: string;
}

export default function AppleMapPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMapKit = async () => {
      if (typeof window !== 'undefined' && (window as any).mapkit) {
        setMapLoaded(true);
        return;
      }

      (window as any).initMapKit = () => {
        setMapLoaded(true);
      };

      const script = document.createElement('script');
      script.src = 'https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.core.js';
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.setAttribute('data-callback', 'initMapKit');
      script.setAttribute('data-libraries', 'map');

      script.setAttribute(
        'data-initial-token',
        process.env.NEXT_PUBLIC_MAPKIT_TOKEN || 'YOUR_TOKEN_HERE',
      );

      script.onerror = () => {
        setError('Failed to load MapKit JS');
      };

      document.head.appendChild(script);
    };

    loadMapKit();
  }, []);

  useEffect(() => {
    if (!mapLoaded || !mapContainerRef.current) return;

    const mapkit = (window as any).mapkit;
    if (!mapkit) return;

    const initMap = () => {
      const mapView = new mapkit.Map(mapContainerRef.current!, {
        center: new mapkit.Coordinate(37.7749, -122.4194),
        zoomLevel: 12,
        showsCompass: true,
        showsZoomControls: true,
      });

      const locations: MapKitAnnotation[] = [
        {
          coordinate: { latitude: 37.7749, longitude: -122.4194 },
          title: 'San Francisco',
          subtitle: 'City Center',
        },
        {
          coordinate: { latitude: 37.8044, longitude: -122.2712 },
          title: 'Oakland',
          subtitle: 'East Bay',
        },
        {
          coordinate: { latitude: 37.6879, longitude: -122.4702 },
          title: 'Daly City',
          subtitle: 'South of SF',
        },
      ];

      locations.forEach((loc) => {
        const annotation = new mapkit.MarkerAnnotation(
          new mapkit.Coordinate(
            loc.coordinate.latitude,
            loc.coordinate.longitude,
          ),
          {
            title: loc.title,
            subtitle: loc.subtitle,
          },
        );
        mapView.addAnnotation(annotation);
      });

      const routeCoordinates = [
        new mapkit.Coordinate(37.7749, -122.4194),
        new mapkit.Coordinate(37.8044, -122.2712),
        new mapkit.Coordinate(37.6879, -122.4702),
      ];

      const polyline = new mapkit.Polyline(routeCoordinates, {
        strokeColor: '#007AFF',
        lineWidth: 4,
      });

      mapView.addOverlay(polyline);
    };

    if (mapkit.loadedLibraries) {
      initMap();
    } else {
      const checkMapkit = setInterval(() => {
        if ((window as any).mapkit) {
          clearInterval(checkMapkit);
          initMap();
        }
      }, 100);
    }
  }, [mapLoaded]);

  return (
    <div className="flex-1 relative">
      <div className="absolute top-4 left-16 z-10">
        <Button variant="secondary" size="sm" asChild>
          <Link href="/">← Back</Link>
        </Button>
      </div>
      <div className="absolute top-4 right-4 z-10">
        <span className="text-sm text-muted-foreground bg-background/80 px-2 py-1 rounded">
          {mapLoaded ? '🟢 MapKit Loaded' : '🔴 Loading...'}
        </span>
      </div>
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted z-20">
          <div className="text-center space-y-4 p-8">
            <p className="text-red-500 font-medium">{error}</p>
            <p className="text-sm text-muted-foreground">
              Get your MapKit token at:{' '}
              <a
                href="https://maps.developer.apple.com/token-maker"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                https://maps.developer.apple.com/token-maker
              </a>
            </p>
          </div>
        </div>
      )}
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
}
