export const calculatePrice = (distanceInMeters) => {
  let totalPrice;
  const minimumPrice = 50;
  const pricePerKilometer = 20;
  const distanceInKilometers = distanceInMeters / 1000;

  if (distanceInKilometers > 2) {
    totalPrice = distanceInKilometers * pricePerKilometer + minimumPrice;
  } else {
    totalPrice = 50;
  }

  return parseInt(totalPrice);
};