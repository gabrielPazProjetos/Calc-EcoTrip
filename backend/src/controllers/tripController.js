const { calculateEmissions } = require('../services/emissionService');
const { generateAdvice } = require('../services/aiService');

async function calculateTrip(req, res) {
  try {
    const {
      distanceKm,
      transportMode,
      passengers,
      roundTrip,
      fuelType
    } = req.body;

    const parsedInput = {
      distanceKm: Number(distanceKm),
      transportMode,
      passengers: Number(passengers),
      roundTrip: Boolean(roundTrip),
      fuelType: fuelType || null
    };

    const result = calculateEmissions(parsedInput);

    const aiAdvice = await generateAdvice({
      ...result,
      distanceKm: parsedInput.distanceKm * (parsedInput.roundTrip ? 2 : 1),
      transportMode: parsedInput.transportMode
    });

    res.json({ ...result, aiAdvice });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { calculateTrip };
