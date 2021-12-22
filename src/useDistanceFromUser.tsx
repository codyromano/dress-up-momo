// @ts-ignore
import HaversineGeolocation from "haversine-geolocation";
import { useState } from "react";
import useInterval from "use-interval";

/**
 * Find the distance in feet from a given location to the user's
 * current location.
 */
export default function useDistanceFromUser(
  lat: number,
  long: number
): null | number {
  const [distance, setDistance] = useState<null | number>(null);

  useInterval(() => {
    const onGeolocationAvailable = ({
      coords: { latitude, longitude, accuracy }
    }: {
      coords: {
        latitude: number;
        longitude: number;
        accuracy: number;
      };
    }) => {
      const {
        haversine: { distance }
      } = HaversineGeolocation.getClosestPosition(
        {
          latitude,
          longitude,
          accuracy
        },
        [
          {
            latitude: lat,
            longitude: long
          }
        ],
        "m"
      );
      setDistance(distance);
    };

    HaversineGeolocation.isGeolocationAvailable().then(onGeolocationAvailable);
  }, 5000);

  // Convert meters to feet
  return distance === null ? null : distance * 3.28084;
}
