import { useState } from 'react';
import Layout from './components/Layout.jsx';
import TripForm from './components/TripForm.jsx';
import ResultCard from './components/ResultCard.jsx';

function App() {
  const [result, setResult] = useState(null);

  return (
    <Layout>
      <div className="app-container">
        <div className="left-panel">
          <h1>Calculadora EcoTrip</h1>
          <p className="subtitle">
            Simule o impacto ambiental da sua viagem.
          </p>
          <TripForm onResult={setResult} />
        </div>
        <div className="right-panel">
          <ResultCard result={result} />
        </div>
      </div>
    </Layout>
  );
}

export default App;
