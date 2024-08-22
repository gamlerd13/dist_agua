import db from "@/lib/db";
import { redirect } from "next/navigation";

import { Header } from "./components/Header";
import { LocationInformation } from "./components/LocationInformation";
import { FooterLocation } from "./components/FooterLocation";

export default async function LocationIdPage({
  params,
}: {
  params: { locationId: string };
}) {
  const location = await db.rutas.findUnique({
    where: {
      id: parseInt(params.locationId),
    },
  });

  if (!location) {
    return redirect("/");
  }

  return (
    <div>
      <Header />
      <LocationInformation location={location} />
      <FooterLocation locationId={location.id} />
    </div>
  );
}
