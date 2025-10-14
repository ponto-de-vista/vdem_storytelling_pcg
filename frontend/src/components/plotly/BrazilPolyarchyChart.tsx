import { useVdemData } from '@/hooks/useVdemData';

import { type JSX } from 'react';
import Plot from 'react-plotly.js';

import { type Data } from 'plotly.js-dist-min';

const BrazilPolyarchyChart = (): JSX.Element => {
  const { data, loading } = useVdemData();

  if (loading) {
    return <p>Loading chart data...</p>;
  }

  const brazilData = data
    .filter(row => row.country_name === 'Brazil')
    .sort((a, b) => a.year - b.year);

  const trace: Data = {
    x: brazilData.map(row => row.year),
    y: brazilData.map(row => row.v2x_polyarchy),
    mode: 'lines',
    type: 'scatter',
    name: 'Poliarquia do Brasil',
  };

  return (
    <Plot
      data={[trace]}
      layout={{
        title: { text: 'Poliarquia do Brasil ao longo do tempo' },
        xaxis: {
          title: { text: 'Ano' },
          dtick: 10,
        },
        yaxis: {
          title: { text: 'Poliarquia' },
          range: [0, 1],
        },
      }}
      style={{ width: '100%', height: '100%' }}
      useResizeHandler
    />
  );
};

export default BrazilPolyarchyChart;
