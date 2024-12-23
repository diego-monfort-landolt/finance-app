import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

// Definiere die Eigenschaften für das PercentageChart-Props
interface PercentageChartProps {
  transactions: { amount: number }[];
}

// Komponente für das Prozent-Diagramm
const PercentageChart: React.FC<PercentageChartProps> = ({ transactions }) => {
  const income = transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0); // Einnahmen berechnen
  const expenses = transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0); // Ausgaben berechnen

  const data = [
    { name: 'Einnahmen', value: income },
    { name: 'Ausgaben', value: Math.abs(expenses) },
  ];

  const COLORS = ['#28a745', '#dc3545'];

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default PercentageChart;
