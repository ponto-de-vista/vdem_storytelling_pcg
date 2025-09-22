import { useVdemData } from '@/hooks/useVdemData';

import { type JSX } from 'react';
import Plot from 'react-plotly.js';

import { type Data } from 'plotly.js-dist-min';

// Import the main Data type

// Mapping from regime code to a human-readable label
const REGIME_MAP: { [key: number]: string } = {
  0: 'Autocracia Fechada',
  1: 'Autocracia Eleitoral',
  2: 'Democracia Eleitoral',
  3: 'Democracia Liberal',
};

const RegimeDistributionChart = (): JSX.Element => {
  const { data, loading, years } = useVdemData();

  if (loading) {
    return <p>Loading chart data...</p>;
  }

  // Calculate the count of each regime type for each year
  const countsByYearAndRegime: {
    [year: number]: { [regime: number]: number };
  } = {};

  for (const row of data) {
    if (!countsByYearAndRegime[row.year]) {
      // Initialize counts for all possible regimes to ensure no gaps
      countsByYearAndRegime[row.year] = { 0: 0, 1: 0, 2: 0, 3: 0 };
    }
    countsByYearAndRegime[row.year][row.v2x_regime]++;
  }

  // FIX 1: Explicitly type the 'traces' array as Plotly's 'Data[]'
  const traces: Data[] = Object.keys(REGIME_MAP).map(regimeKey => {
    const key = Number(regimeKey);
    return {
      x: years,
      y: years.map(year => countsByYearAndRegime[year]?.[key] || 0),
      mode: 'lines',
      type: 'scatter', // This is now correctly checked against the Data type
      name: REGIME_MAP[key],
    };
  });

  return (
    <Plot
      data={traces}
      layout={{
        title: {
          text: 'Número de países por tipo de regime ao longo do tempo',
        },
        xaxis: { title: { text: 'Ano' } },
        yaxis: { title: { text: 'Número de países' } },
        legend: { title: { text: 'Tipo de Regime' } },
      }}
      style={{ width: '100%', height: '100%' }}
      useResizeHandler
    />
  );
};

export default RegimeDistributionChart;
