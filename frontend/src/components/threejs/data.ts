import BrazilPolyarchyChart from '@/components/plotly/BrazilPolyarchyChart';
import ChoroplethMap from '@/components/plotly/ChoroplethMap';
import RegimeDistributionChart from '@/components/plotly/RegimeDistributionChart';
import RegionalPolyarchyChart from '@/components/plotly/RegionalPolyarchyChart';

import * as THREE from 'three';

export const storyPoints = [
  {
    position: new THREE.Vector3(-10, 1.5, 0),
    title: 'Visão Global',
    description: 'Índices de Tipo de Governo por Ano.',
    GraphComponent: ChoroplethMap,
  },
  {
    position: new THREE.Vector3(0, 1.5, 10),
    title: 'Análise Regional',
    description: 'Média e Mediana de Poliarquia por Região.',
    GraphComponent: RegionalPolyarchyChart,
  },
  {
    position: new THREE.Vector3(10, 1.5, 0),
    title: 'Distribuição Mundial',
    description: 'Contagem de Regimes no Mundo.',
    GraphComponent: RegimeDistributionChart,
  },
  {
    position: new THREE.Vector3(0, 1.5, -10),
    title: 'Foco: Brasil',
    description: 'Poliarquia do Brasil ao Longo do Tempo.',
    GraphComponent: BrazilPolyarchyChart,
  },
];
