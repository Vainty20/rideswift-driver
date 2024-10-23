import { useEffect, useState } from "react";
import { fetchGeocode } from "../api/geocodeApi";
import * as Location from "expo-location";

export default function useCurrentLocation() {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [locationCoordinates, setLocationCoordinates] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          alert("Permission to access location was denied");
          setLoading(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
          maximumAge: 10000,
        });

        const geoResponse = await fetchGeocode(
          location.coords.latitude,
          location.coords.longitude
        );
        if (
          geoResponse &&
          geoResponse.results &&
          geoResponse.results.length > 0
        ) {
          const formattedAddress = geoResponse.results[0].formatted_address;
          setLocation(formattedAddress);
        } else {
          setLocation("");
        }
        setLocationCoordinates([
          location.coords.latitude,
          location.coords.longitude,
        ]);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  return { location, locationCoordinates, loading, error };
}
