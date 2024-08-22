import { LocationInformationProps } from "./LocationInformation.types";
import { LocationForm } from "../LocationForm";

export function LocationInformation(props: LocationInformationProps) {
  const { location } = props;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 mt-2">
      <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4">
        <div>
          <LocationForm location={location} />
        </div>
      </div>
    </div>
  );
}
