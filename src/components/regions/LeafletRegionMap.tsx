"use client";

import { divIcon, latLngBounds } from "leaflet";
import { useEffect, useMemo, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import type { Region, RegionId } from "@/content/regions";

type LeafletRegionMapProps = {
  regions: Region[];
  activeId: RegionId;
  onSelect: (id: RegionId) => void;
  counts?: Partial<Record<RegionId, number>>;
  focusId: RegionId | null;
  focusRequest: number;
};

const initialBounds = latLngBounds([7.7, 76.1], [13.5, 81]);

function MapController({
  activeId,
  regions,
  focusId,
  focusRequest,
}: Pick<LeafletRegionMapProps, "activeId" | "regions" | "focusId" | "focusRequest">) {
  const map = useMap();
  const previous = useRef({ activeId, focusRequest });

  useEffect(() => {
    const activeChanged = previous.current.activeId !== activeId;
    const focusRequested = previous.current.focusRequest !== focusRequest;
    const targetId = activeChanged ? activeId : focusRequested ? focusId : null;
    if (targetId) {
      const region = regions.find((item) => item.slug === targetId);
      if (region) map.flyTo(region.coordinates, Math.max(map.getZoom(), 8), { duration: 0.6 });
    }
    previous.current = { activeId, focusRequest };
  }, [activeId, focusId, focusRequest, map, regions]);

  useEffect(() => {
    const container = map.getContainer();
    const observer = new ResizeObserver(() => map.invalidateSize({ pan: false }));
    observer.observe(container);
    return () => observer.disconnect();
  }, [map]);

  return null;
}

function HubMarker({
  region,
  activeId,
  onSelect,
  count,
}: {
  region: Region;
  activeId: RegionId;
  onSelect: (id: RegionId) => void;
  count?: number;
}) {
  const selected = region.slug === activeId;
  const icon = useMemo(
    () =>
      divIcon({
        className: `regional-hub-marker${selected ? " regional-hub-marker--selected" : ""}`,
        html: '<span aria-hidden="true"></span>',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -13],
      }),
    [selected],
  );

  return (
    <Marker
      position={region.coordinates}
      icon={icon}
      title={`${region.name} regional hub`}
      alt={`${region.name} hub marker`}
      eventHandlers={{ click: () => onSelect(region.slug) }}
    >
      <Popup>
        <div className="min-w-40">
          <strong className="font-display text-base text-ink">{region.name}</strong>
          <p className="mt-1 text-xs text-muted">
            Regional hub{count !== undefined ? ` · ${count} ${count === 1 ? "event" : "events"}` : ""}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-charcoal">
            {region.districts.join(", ")}
          </p>
        </div>
      </Popup>
    </Marker>
  );
}

export default function LeafletRegionMap({
  regions,
  activeId,
  onSelect,
  counts,
  focusId,
  focusRequest,
}: LeafletRegionMapProps) {
  const bounds = useMemo(
    () => latLngBounds(regions.map((region) => region.coordinates)),
    [regions],
  );

  return (
    <MapContainer
      bounds={bounds.isValid() ? bounds : initialBounds}
      boundsOptions={{ padding: [20, 20] }}
      minZoom={6}
      maxZoom={18}
      scrollWheelZoom
      zoomControl
      className="h-full w-full"
      aria-label="Map showing all eight regional hubs"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
      />
      <MapController activeId={activeId} regions={regions} focusId={focusId} focusRequest={focusRequest} />
      {regions.map((region) => (
        <HubMarker
          key={region.slug}
          region={region}
          activeId={activeId}
          onSelect={onSelect}
          count={counts?.[region.slug]}
        />
      ))}
    </MapContainer>
  );
}
