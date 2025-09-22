import { useEffect, useState } from 'react';

import * as Papa from 'papaparse';

// The complete interface for a row in your CSV, needed for all charts
export interface CsvRow {
  country_name: string;
  year: number;
  v2x_regime: number;
  v2x_polyarchy: number;
}

// The data structure returned by our custom hook
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
        // Path is relative to the public folder
        const response = await fetch('./ert.csv');
        const csvText = await response.text();

        const parsedResult = Papa.parse<CsvRow>(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });

        // Filter out any rows with incomplete essential data
        const cleanedData = parsedResult.data.filter(
          row =>
            row.country_name &&
            row.year != null &&
            row.v2x_regime != null &&
            row.v2x_polyarchy != null
        );

        setData(cleanedData);

        // Get a sorted list of unique years from the data
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
  }, []); // Empty dependency array means this runs only once

  return { data, loading, years };
};
