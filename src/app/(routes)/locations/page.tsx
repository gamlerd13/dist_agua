"use client";

import { HeaderLocations } from "./components/HeaderLocations";
import { ListLocations } from "./components/ListLocations";

import useLocations from "./components/Hooks/useLocations";
import useDistricts from "./Hooks/useDistricts";

export default function LocationsPage() {
  const { location, getLocation, createLocation } = useLocations();
  const { district } = useDistricts();

  return (
    <div>
      <HeaderLocations createLocation={createLocation} districts={district} />
      <ListLocations location={location} />
    </div>
  );
}
