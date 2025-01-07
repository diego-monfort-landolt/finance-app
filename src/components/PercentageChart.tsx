import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

// Definiert ein Interface für eine Transaktion
interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

// Definiert die Props für die PercentageChart-Komponente
interface PercentageChartProps {
  transactions: Transaction[]; // Array von Transaktionen
}

// Funktionale Komponente, die ein Kreisdiagramm anzeigt
const PercentageChart: React.FC<PercentageChartProps> = ({ transactions }) => {
  const incomeTransactions = transactions.filter(t => t.type === 'income');
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  const totalIncome = incomeTransactions.reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = expenseTransactions.reduce((acc, t) => acc + t.amount, 0);
  const total = totalIncome + Math.abs(totalExpenses);

  // Erstellt die Daten für das Kreisdiagramm
  const data = [
    ...incomeTransactions.map(t => ({
      name: `${t.description} (${((t.amount / total) * 100).toFixed(2)}%)`,
      value: t.amount,
      type: 'income'
    })),
    ...expenseTransactions.map(t => ({
      name: `${t.description} (${((Math.abs(t.amount) / total) * 100).toFixed(2)}%)`,
      value: Math.abs(t.amount),
      type: 'expense'
    }))
  ];

  // Definiert die Farben für die Einnahmen und Ausgab
  const COLORS = ['#28a745', '#dc3545'];

  return (
    <div className="chart-container">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8" // Füllfarbe des Kreisdiagramms
          paddingAngle={5} // Abstand zwischen den Segmenten
          dataKey="value" // Schlüssel für die Datenwerte
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.type === 'income' ? COLORS[0] : COLORS[1]} />
          ))}
        </Pie>
        <Tooltip /> {/* Tooltip für das Kreisdiagramm */}
      </PieChart>
    </div>
  );
};
export default PercentageChart;