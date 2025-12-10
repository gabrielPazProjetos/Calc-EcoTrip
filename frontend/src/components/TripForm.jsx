import { useState } from 'react';
import axios from 'axios';

export default function TripForm({ onResult }) {
  const [form, setForm] = useState({
    distanceKm: '',
    transportMode: 'car',
    passengers: 1,
    roundTrip: true,
    fuelType: 'petrol'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    onResult(null);
    setLoading(true);

    try {
      const payload = {
        distanceKm: Number(form.distanceKm),
        transportMode: form.transportMode,
        passengers: Number(form.passengers),
        roundTrip: form.roundTrip,
        fuelType: form.transportMode === 'car' ? form.fuelType : null
      };

      const { data } = await axios.post('http://localhost:3000/api/trips/calculate', payload);
      onResult(data);
    } catch (err) {
      setError('Erro ao calcular.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="trip-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Distância (km)</label>
        <input
          name="distanceKm"
          type="number"
          value={form.distanceKm}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Transporte</label>
        <select name="transportMode" value={form.transportMode} onChange={handleChange}>
          <option value="car">Carro</option>
          <option value="bus">Ônibus</option>
          <option value="train">Trem</option>
          <option value="plane">Avião</option>
          <option value="bike">Bicicleta</option>
          <option value="walk">Caminhada</option>
        </select>
      </div>

      {form.transportMode === 'car' && (
        <div className="form-group">
          <label>Combustível</label>
          <select name="fuelType" value={form.fuelType} onChange={handleChange}>
            <option value="petrol">Gasolina</option>
            <option value="diesel">Diesel</option>
          </select>
        </div>
      )}

      <div className="form-group">
        <label>Passageiros</label>
        <input
          name="passengers"
          type="number"
          value={form.passengers}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group form-group-inline">
        <input
          name="roundTrip"
          type="checkbox"
          checked={form.roundTrip}
          onChange={handleChange}
        />
        <label>Ida e volta</label>
      </div>

      {error && <p className="error-message">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Calculando...' : 'Calcular impacto'}
      </button>
    </form>
  );
}
