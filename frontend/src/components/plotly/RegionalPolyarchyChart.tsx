import { type CsvRow, useVdemData } from '@/hooks/useVdemData';

import { type JSX, useMemo } from 'react';
import Plot from 'react-plotly.js';

// Import the necessary types from Plotly
import { type Data, type Frame, type Layout } from 'plotly.js-dist-min';

// Helper functions (unchanged)
const getMean = (arr: number[]) =>
  arr.length > 0 ? arr.reduce((acc, val) => acc + val, 0) / arr.length : 0;
const getMedian = (arr: number[]) => {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
};

// Regions definition (unchanged)
const REGIONS: { [key: string]: string[] } = {
  América: [
    'Mexico',
    'United States of America',
    'Canada',
    'Suriname',
    'Colombia',
    'Brazil',
    'Argentina',
    'Bolivia',
    'Chile',
    'Ecuador',
    'Peru',
    'Venezuela',
    'Uruguay',
    'Guyana',
    'Paraguay',
    'El Salvador',
    'Nicaragua',
    'Costa Rica',
    'Guatemala',
    'Panama',
    'Haiti',
    'Honduras',
    'Jamaica',
    'Trinidad and Tobago',
    'Barbados',
    'Cuba',
    'Dominican Republic',
    'Bahamas',
  ],
  Europa: [
    'Sweden',
    'Switzerland',
    'Albania',
    'Poland',
    'Portugal',
    'Finland',
    'Ireland',
    'Italy',
    'Spain',
    'France',
    'Germany',
    'Netherlands',
    'Latvia',
    'Lithuania',
    'Luxembourg',
    'United Kingdom',
    'Austria',
    'Belgium',
    'Bosnia and Herzegovina',
    'Bulgaria',
    'Croatia',
    'Cyprus',
    'Czechia',
    'Denmark',
    'Estonia',
    'Greece',
    'Hungary',
    'Iceland',
    'Kosovo',
    'Malta',
    'Moldova',
    'Montenegro',
    'North Macedonia',
    'Norway',
    'Romania',
    'Serbia',
    'Slovakia',
    'Slovenia',
    'Russia',
    'Ukraine',
    'Belarus',
    'Georgia',
    'German Democratic Republic',
  ],
  África: [
    'Ghana',
    'South Africa',
    'Egypt',
    'Mali',
    'Senegal',
    'South Sudan',
    'Sudan',
    'Ethiopia',
    'Kenya',
    'Nigeria',
    'Tanzania',
    'Uganda',
    'Benin',
    'Burkina Faso',
    'Mozambique',
    'Niger',
    'Zambia',
    'Zimbabwe',
    'Guinea',
    'Ivory Coast',
    'Mauritania',
    'Botswana',
    'Burundi',
    'Cape Verde',
    'Central African Republic',
    'Cameroon',
    'Chad',
    'Democratic Republic of the Congo',
    'Republic of the Congo',
    'Djibouti',
    'Eritrea',
    'Gabon',
    'The Gambia',
    'Guinea-Bissau',
    'Liberia',
    'Malawi',
    'Morocco',
    'Rwanda',
    'Somalia',
    'Eswatini',
    'Togo',
    'Lesotho',
    'Sierra Leone',
    'Algeria',
    'Angola',
    'Comoros',
    'Equatorial Guinea',
    'Madagascar',
    'Mauritius',
    'Namibia',
    'Sao Tome and Principe',
    'Seychelles',
    'Libya',
    'Tunisia',
    'Somaliland',
  ],
  Ásia: [
    'Japan',
    'Burma/Myanmar',
    'Afghanistan',
    'Bangladesh',
    'Pakistan',
    'India',
    'North Korea',
    'South Korea',
    'Vietnam',
    'Taiwan',
    'Thailand',
    'Philippines',
    'Malaysia',
    'Indonesia',
    'Nepal',
    'Cambodia',
    'Laos',
    'Mongolia',
    'Maldives',
    'Sri Lanka',
    'Timor-Leste',
    'Palestine/West Bank',
    'Palestine/Gaza',
    'Tajikistan',
    'Turkmenistan',
    'Uzbekistan',
    'Kazakhstan',
    'Kyrgyzstan',
    'Armenia',
    'Azerbaijan',
    'China',
    'Hong Kong',
    'Israel',
    'Kuwait',
    'Qatar',
    'Bahrain',
    'Oman',
    'Bhutan',
    'Singapore',
    'Saudi Arabia',
    'Iran',
    'Iraq',
    'Jordan',
    'Lebanon',
    'Syria',
    'United Arab Emirates',
    'Yemen',
    'Turkey',
    'Republic of Vietnam',
    'South Yemen',
    'Palestine/British Mandate',
  ],
  Oceania: [
    'Australia',
    'Papua New Guinea',
    'New Zealand',
    'Fiji',
    'Solomon Islands',
    'Vanuatu',
  ],
};

const RegionalPolyarchyChart = (): JSX.Element => {
  const { data, loading, years } = useVdemData();

  // FIX 1: Rename `frames` to `plotFrames` to avoid conflict with `window.frames`
  // FIX 2: Correctly type the destructured return value from useMemo
  const { traces, layout, plotFrames } = useMemo(() => {
    if (loading || data.length === 0) {
      return { traces: [], layout: {}, plotFrames: [] };
    }

    const countryToRegionMap = new Map<string, string>();
    for (const region in REGIONS) {
      for (const country of REGIONS[region]) {
        countryToRegionMap.set(country, region);
      }
    }

    const dataByYear = new Map<number, CsvRow[]>();
    data.forEach(row => {
      if (!dataByYear.has(row.year)) dataByYear.set(row.year, []);
      dataByYear.get(row.year)?.push(row);
    });

    const plotFrames: Partial<Frame>[] = [];
    const firstYearData: { region: string; mean: number; median: number }[] =
      [];

    for (const year of years) {
      const yearlyData = dataByYear.get(year) || [];
      const polyarchyByRegion = new Map<string, number[]>();
      yearlyData.forEach(row => {
        const region = countryToRegionMap.get(row.country_name);
        if (region) {
          if (!polyarchyByRegion.has(region)) polyarchyByRegion.set(region, []);
          polyarchyByRegion.get(region)?.push(row.v2x_polyarchy);
        }
      });

      const yearlyStats = Array.from(polyarchyByRegion.entries()).map(
        ([region, values]) => ({
          region,
          mean: getMean(values),
          median: getMedian(values),
        })
      );

      if (year === years[0]) {
        firstYearData.push(...yearlyStats);
      }

      // Push to the renamed variable
      plotFrames.push({
        name: String(year),
        data: [
          {
            x: yearlyStats.map(s => s.region),
            y: yearlyStats.map(s => s.mean),
          },
          {
            x: yearlyStats.map(s => s.region),
            y: yearlyStats.map(s => s.median),
          },
        ],
      });
    }

    // FIX 2: Apply the specific `Data[]` type to remove the need for `as any`
    const initialTraces: Data[] = [
      {
        x: firstYearData.map(d => d.region),
        y: firstYearData.map(d => d.mean),
        type: 'bar',
        name: 'Média',
        yaxis: 'y1',
      },
      {
        x: firstYearData.map(d => d.region),
        y: firstYearData.map(d => d.median),
        type: 'bar',
        name: 'Mediana',
        yaxis: 'y2',
      },
    ];

    const layout: Partial<Layout> = {
      height: 500,
      title: { text: 'Média e Mediana de Poliarquia por Região' },
      grid: { rows: 2, columns: 1, pattern: 'coupled', ygap: 0.6 },
      yaxis: { title: { text: 'Média Poliarquia' }, range: [0, 1] },
      yaxis2: { title: { text: 'Mediana Poliarquia' }, range: [0, 1] },
      updatemenus: [
        {
          x: 0.1,
          y: -1,
          yanchor: 'top',
          xanchor: 'right',
          showactive: false,
          direction: 'left',
          type: 'buttons',
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
              args: [[null], { mode: 'immediate' }],
              label: 'Pause',
            },
          ],
        },
      ],
      sliders: [
        {
          currentvalue: { prefix: 'Ano: ', visible: true },
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

    // Return the renamed variable
    return { traces: initialTraces, layout, plotFrames };
  }, [loading, data, years]);

  if (loading) {
    return <p>Loading chart data...</p>;
  }

  return (
    <Plot
      data={traces}
      layout={layout}
      frames={plotFrames as Frame[]}
      style={{ width: '100%', height: '100%' }}
      useResizeHandler
    />
  );
};

export default RegionalPolyarchyChart;
