// filepath: /C:/Users/lando/Desktop/WorkSpace/finance-app/src/components/PercentageChart.tsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

interface PercentageChartProps {
  transactions: Transaction[];
}

const PercentageChart: React.FC<PercentageChartProps> = ({ transactions }) => {
  const incomeTransactions = transactions.filter(t => t.type === 'income');
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  const totalIncome = incomeTransactions.reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = expenseTransactions.reduce((acc, t) => acc + t.amount, 0);
  const total = totalIncome + Math.abs(totalExpenses);

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
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.type === 'income' ? COLORS[0] : COLORS[1]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default PercentageChart;