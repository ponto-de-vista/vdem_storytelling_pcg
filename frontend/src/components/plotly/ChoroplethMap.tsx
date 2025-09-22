import { type CsvRow, useVdemData } from '@/hooks/useVdemData';

import { type JSX, useMemo } from 'react';
import Plot from 'react-plotly.js';

import { type Data, type Frame, type Layout } from 'plotly.js-dist-min';

interface YearData {
  locations: string[];
  z: number[];
  text: string[];
}

interface DataByYear {
  [year: number]: YearData;
}

const ChoroplethMap = (): JSX.Element => {
  const { data, loading, years } = useVdemData();

  // useMemo will prevent re-calculating the chart data on every render
  const { initialData, frames, layout } = useMemo(() => {
    if (loading || data.length === 0) {
      return { initialData: [], frames: [], layout: {} };
    }

    // Process data for Plotly animation
    const dataByYear = data.reduce((acc: DataByYear, row: CsvRow) => {
      const { country_name, year, v2x_regime } = row;
      if (!acc[year]) {
        acc[year] = { locations: [], z: [], text: [] };
      }
      acc[year].locations.push(country_name);
      acc[year].z.push(v2x_regime);
      acc[year].text.push(country_name);
      return acc;
    }, {});

    const firstYear = years[0];
    const firstYearData = dataByYear[firstYear];

    const initialData: Data[] = [
      {
        type: 'choropleth',
        locationmode: 'country names',
        locations: firstYearData.locations,
        z: firstYearData.z,
        text: firstYearData.text,
        colorscale: 'RdYlBu',
        zmin: 0,
        zmax: 3,
      },
    ];

    const frames: Partial<Frame>[] = years.map(year => ({
      name: String(year),
      data: [
        {
          locations: dataByYear[year].locations,
          z: dataByYear[year].z,
          text: dataByYear[year].text,
        },
      ],
    }));

    const layout: Partial<Layout> = {
      title: { text: 'Indices de Tipo de Governo por Ano' },
      geo: {
        showcoastlines: true,
        coastlinecolor: 'Black',
        showland: true,
        landcolor: 'lightgrey',
      },
      margin: { r: 0, t: 40, l: 0, b: 0 },
      updatemenus: [
        {
          x: 0.1,
          y: 0,
          yanchor: 'top',
          xanchor: 'right',
          showactive: false,
          direction: 'left',
          type: 'buttons',
          pad: { t: 87, r: 10 },
          buttons: [
            {
              method: 'animate',
              args: [
                null,
                {
                  fromcurrent: true,
                  transition: { duration: 200 },
                  frame: { duration: 500, redraw: true },
                },
              ],
              label: 'Play',
            },
            {
              method: 'animate',
              args: [
                [null],
                {
                  mode: 'immediate',
                  transition: { duration: 0 },
                  frame: { duration: 0, redraw: true },
                },
              ],
              label: 'Pause',
            },
          ],
        },
      ],
      sliders: [
        {
          pad: { l: 130, t: 55 },
          currentvalue: {
            visible: true,
            prefix: 'Ano: ',
            xanchor: 'right',
            font: { size: 20, color: '#666' },
          },
          steps: years.map(year => ({
            label: String(year),
            method: 'animate',
            args: [
              [String(year)],
              {
                mode: 'immediate',
                transition: { duration: 300 },
                frame: { duration: 300, redraw: true },
              },
            ],
          })),
        },
      ],
    };

    return { initialData, frames, layout };
  }, [loading, data, years]);

  if (loading) {
    return <p>Loading map data...</p>;
  }

  return (
    <Plot
      data={initialData}
      layout={layout}
      frames={frames as Frame[]}
      style={{ width: '100%', height: '100%' }}
      useResizeHandler
    />
  );
};

export default ChoroplethMap;
