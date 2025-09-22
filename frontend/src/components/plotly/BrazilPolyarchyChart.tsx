import { useVdemData } from '@/hooks/useVdemData';

import { type JSX } from 'react';
import Plot from 'react-plotly.js';

import { type Data } from 'plotly.js-dist-min';

// Import the main Data type

const BrazilPolyarchyChart = (): JSX.Element => {
  const { data, loading } = useVdemData();

  if (loading) {
    return <p>Loading chart data...</p>;
  }

  // Filter data to only include Brazil and sort by year for the line chart
  const brazilData = data
    .filter(row => row.country_name === 'Brazil')
    .sort((a, b) => a.year - b.year);

  // FIX 1: Explicitly type the 'trace' object as Plotly's 'Data' type
  const trace: Data = {
    x: brazilData.map(row => row.year),
    y: brazilData.map(row => row.v2x_polyarchy),
    mode: 'lines',
    type: 'scatter', // This is now correctly validated
    name: 'Poliarquia do Brasil',
  };

  return (
    <Plot
      data={[trace]}
      layout={{
        // FIX 2: All title properties are now objects with a 'text' key
        title: { text: 'Poliarquia do Brasil ao longo do tempo' },
        xaxis: {
          title: { text: 'Ano' },
          dtick: 10, // Show a tick every 10 years
        },
        yaxis: {
          title: { text: 'Poliarquia' },
          range: [0, 1], // Keep y-axis range consistent
        },
      }}
      style={{ width: '100%', height: '100%' }}
      useResizeHandler
    />
  );
};

export default BrazilPolyarchyChart;
