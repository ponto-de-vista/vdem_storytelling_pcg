import BrazilPolyarchyChart from '@/components/plotly/BrazilPolyarchyChart';
import ChoroplethMap from '@/components/plotly/ChoroplethMap';
import RegimeDistributionChart from '@/components/plotly/RegimeDistributionChart';
import RegionalPolyarchyChart from '@/components/plotly/RegionalPolyarchyChart';

import { Link } from 'react-router-dom';

function Home() {
  return (
    // Main container with a light gray background and padding
    <main className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Dashboard de Análise Democrática
          </h1>
          <p className="text-md sm:text-lg text-gray-600 mt-2">
            Visualizações interativas baseadas nos dados do V-Dem Institute.
          </p>
          <div className="mt-6">
            <Link
              to="/storytelling"
              className="inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition-transform transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Iniciar Experiência 3D
            </Link>
          </div>
        </header>

        {/* Responsive Grid for the Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1: Choropleth Map (takes up more space) */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-4 flex flex-col h-[80vh]">
            <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
              Índices de Tipo de Governo por Ano
            </h2>
            <div className="flex-grow w-full h-full">
              <ChoroplethMap />
            </div>
          </div>

          {/* Card 2: Regional Polyarchy Chart */}
          <div className="bg-white rounded-xl shadow-md p-4 flex flex-col">
            <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
              Média e Mediana de Poliarquia por Região
            </h2>
            <div className="flex-grow w-full h-full">
              <RegionalPolyarchyChart />
            </div>
          </div>

          {/* Card 3: Regime Distribution Chart */}
          <div className="bg-white rounded-xl shadow-md p-4 flex flex-col">
            <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
              Distribuição de Regimes no Mundo
            </h2>
            <div className="flex-grow w-full h-full">
              <RegimeDistributionChart />
            </div>
          </div>

          {/* Card 4: Brazil Polyarchy Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-4 flex flex-col h-[60vh]">
            <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
              Poliarquia do Brasil ao Longo do Tempo
            </h2>
            <div className="flex-grow w-full h-full">
              <BrazilPolyarchyChart />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
