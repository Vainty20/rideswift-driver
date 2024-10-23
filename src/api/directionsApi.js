import axios from 'axios';

export const fetchDirections = async (originCoords, destinationCoords) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json`, {
        params: {
          origin: `${originCoords[0]},${originCoords[1]}`,
          destination: `${destinationCoords[0]},${destinationCoords[1]}`,
          key: process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching directions:', error);
    throw error;
  }
};
