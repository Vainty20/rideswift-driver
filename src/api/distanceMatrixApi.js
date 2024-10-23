import axios from 'axios';

export const fetchDistanceMatrix = async (originCoords, destinationCoords) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json`, 
      {
        params: {
          origins: `${originCoords[0]},${originCoords[1]}`,
          destinations: `${destinationCoords[0]},${destinationCoords[1]}`,
          key: process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY, 
        },
      }
    );

    if (response.data.rows[0].elements[0].status === "OK") {
      return response.data;
    } else {
      throw new Error("No results found for the given locations.");
    }
  } catch (error) {
    console.error('Error fetching distance matrix:', error);
    throw error;
  }
};
