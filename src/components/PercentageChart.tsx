import React, { useState, useEffect } from 'react';
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
  const [transactionList, setTransactionList] = useState(transactions);

  useEffect(() => {
    setTransactionList(transactions);
  }, [transactions]);

  const incomeTransactions = transactionList.filter(t => t.type === 'income');
  const expenseTransactions = transactionList.filter(t => t.type === 'expense');
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

  // Definiert die Farben für die Einnahmen und Ausgaben
  const COLORS = data.map(entry => entry.type === 'income' ? '#28a745' : '#dc3545');

  // Funktion zum Entfernen einer Transaktion
  const removeTransaction = (id: number) => {
    setTransactionList(transactionList.filter(t => t.id !== id));
  };

  return (
    <div className="chart-container" style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
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
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value} €`} /> {/* Tooltip für das Kreisdiagramm */}
      </PieChart>
      <div className="transaction-list" style={{ marginTop: '20px', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '10px', borderRadius: '5px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)' }}>
        <h3>Transaktionen</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {transactionList.map(t => (
            <li key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', wordWrap: 'break-word',textTransform: 'capitalize' }}>
              <span style={{ flex: 1, textAlign: 'left',padding: '3px',borderRadius:'5px', borderBottom: t.type === 'income' ? '1px solid green' : '1px solid red', backgroundColor: t.type === 'income' ? 'rgba(40, 167, 69, 0.1)' : 'rgba(220, 53, 69, 0.1)' }}>{t.description} - {t.amount} €</span>
              <button onClick={() => removeTransaction(t.id)} style={{ marginLeft: '10px', padding:'5px', backgroundColor: t.type === 'income' ? '#28a745' : '#dc3545', color: '#fff', borderRadius: '3px', cursor: 'pointer', border: 'none' }}>Entfernen</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PercentageChart;
