export default function ResultCard({ result }) {
  if (!result) {
    return (
      <div className="result-card empty">
        <h2>Veja o impacto da sua viagem</h2>
        <p>Preencha os dados ao lado.</p>
      </div>
    );
  }

  return (
    <div className="result-card">
      <h2>Resultado</h2>

      <p><strong>Total:</strong> {result.totalEmissionsKg} kg CO₂</p>
      <p><strong>Por passageiro:</strong> {result.emissionsPerPassengerKg} kg CO₂</p>

      <h3>Equivalentes</h3>
      <ul>
        <li>{result.equivalents.treesPerYear} árvores/ano</li>
        <li>{result.equivalents.carKm} km de carro</li>
      </ul>

      <h3>Dicas</h3>
      <p>{result.aiAdvice}</p>
    </div>
  );
}
