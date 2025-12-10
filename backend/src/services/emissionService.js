const factors = require('../data/emissionFactors.json');

function getFactor(transportMode, fuelType) {
  if (transportMode === 'car') {
    const key = `car_${fuelType}`;
    return factors[key];
  }
  return factors[transportMode];
}

function calculateEmissions({ distanceKm, transportMode, passengers, roundTrip, fuelType }) {
  const factor = getFactor(transportMode, fuelType);
  const totalDistance = roundTrip ? distanceKm * 2 : distanceKm;

  const totalEmissionsKg = totalDistance * factor * passengers;
  const emissionsPerPassengerKg = totalEmissionsKg / passengers;

  const equivalents = {
    treesPerYear: Number((totalEmissionsKg / 63).toFixed(2)),
    carKm: Number((totalEmissionsKg / factors.car_petrol).toFixed(0))
  };

  return {
    totalEmissionsKg: Number(totalEmissionsKg.toFixed(2)),
    emissionsPerPassengerKg: Number(emissionsPerPassengerKg.toFixed(2)),
    equivalents
  };
}

module.exports = { calculateEmissions };
