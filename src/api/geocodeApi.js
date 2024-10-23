import axios from 'axios';

export const fetchGeocode = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          latlng: `${latitude},${longitude}`,
          key: process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY,
          enable_address_descriptor: true,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching geocode:', error);
    throw error;
  }
};
