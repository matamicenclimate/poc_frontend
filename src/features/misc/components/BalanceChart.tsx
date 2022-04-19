import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  Filler,
  ScriptableContext,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Filler,
  Legend
);
export function BalanceChart({ width, labels, data: chartData }: any) {
  const data = () => ({
    labels,
    datasets: [
      {
        label: 'Climatecoin Balance',
        data: chartData,
        borderColor: '#00db7d',
        fill: 'start',
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, '#45b26b');
          gradient.addColorStop(1, 'rgba(69, 178, 107, 0)');
          return gradient;
        },
        tension: 0.2,
      },
    ],
  });
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        min: 0,
      },
    },
    elements: {
      line: {
        tension: 0.35,
      },
    },
    plugins: {
      filler: {
        propagate: false,
      },
      legend: {
        display: false,
      },
    },
    interaction: {
      intersect: true,
    },
  };
  return (
    <>
      <Line options={options} data={data()} width={width} />
    </>
  );
}
