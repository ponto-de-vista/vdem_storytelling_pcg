import { useEffect, useState } from 'react';

import * as Papa from 'papaparse';

export interface CsvRow {
  country_name: string;
  year: number;
  v2x_regime: number;
  v2x_polyarchy: number;
}

interface VdemData {
  data: CsvRow[];
  loading: boolean;
  years: number[];
}

export const useVdemData = (): VdemData => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<CsvRow[]>([]);
  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./ert.csv');
        const csvText = await response.text();

        const parsedResult = Papa.parse<CsvRow>(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });

        const cleanedData = parsedResult.data.filter(
          row =>
            row.country_name &&
            row.year != null &&
            row.v2x_regime != null &&
            row.v2x_polyarchy != null
        );

        setData(cleanedData);

        const uniqueYears = [...new Set(cleanedData.map(row => row.year))].sort(
          (a, b) => a - b
        );
        setYears(uniqueYears);
      } catch (error) {
        console.error('Failed to load or parse CSV data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, years };
};
