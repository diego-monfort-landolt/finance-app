import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// Interface für eine Transaktion
interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense' | 'wish list';
}

// Props für die PercentageChart-Komponente
interface PercentageChartProps {
  transactions: Transaction[];
}

const PercentageChart: React.FC<PercentageChartProps> = ({ transactions }) => {
  // Lokaler Zustand, synchronisiert mit den übergebenen Transaktionen
  const [transactionList, setTransactionList] = useState<Transaction[]>(transactions);

  useEffect(() => {
    setTransactionList(transactions);
  }, [transactions]);

  // Filtere nach Transaktionstyp
  const incomeTransactions = transactionList.filter(t => t.type === 'income');
  const expenseTransactions = transactionList.filter(t => t.type === 'expense');
  const wishlistTransactions = transactionList.filter(t => t.type === 'wish list');

  const totalIncome = incomeTransactions.reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = expenseTransactions.reduce((acc, t) => acc + t.amount, 0);
  const total = totalIncome + Math.abs(totalExpenses);
  const safeTotal = total === 0 ? 1 : total; // Zur Vermeidung einer Division durch 0

  // Daten für das Diagramm
  const data = [
    ...incomeTransactions.map(t => ({
      name: `${t.description} (${((t.amount / safeTotal) * 100).toFixed(2)}%)`,
      value: t.amount,
      type: 'income'
    })),
    ...expenseTransactions.map(t => ({
      name: `${t.description} (${((Math.abs(t.amount) / safeTotal) * 100).toFixed(2)}%)`,
      value: Math.abs(t.amount),
      type: 'expense'
    })),
    ...wishlistTransactions.map(t => ({
      name: `${t.description} (${((Math.abs(t.amount) / safeTotal) * 100).toFixed(2)}%)`,
      value: Math.abs(t.amount),
      type: 'wish list'
    }))
  ];

  // Definierte Farben: Einnahmen in Grün, sonst Rot
  const COLORS = data.map(entry => 
    entry.type === 'income' ? '#28a745' : '#dc3545'
  );

  // Entfernt eine Transaktion aus dem lokalen Zustand
  const removeTransaction = (id: number) => {
    setTransactionList(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div
      className="chart-container"
      style={{
        backgroundColor: '#f0f0f0',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '800px', // Erlaubt einen größeren Container, wenn der Bildschirm breit genug ist
        margin: '20px auto'
      }}
    >
      {/* ResponsiveContainer mit fester Höhe, sodass das Diagramm mehr Platz erhält */}
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="20%"
            outerRadius="40%"
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `${value} €`} />
        </PieChart>
      </ResponsiveContainer>
      <div
        className="transaction-list"
        style={{
          marginTop: '20px',
          backgroundColor: '#fff',
          color: '#000',
          padding: '10px',
          borderRadius: '5px',
          boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)'
        }}
      >
        <h3>Transaktionen</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {transactionList.map(t => (
            <li
              key={t.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
                wordWrap: 'break-word',
                textTransform: 'capitalize'
              }}
            >
              <span
                style={{
                  flex: 1,
                  textAlign: 'left',
                  padding: '3px',
                  borderRadius: '5px',
                  borderBottom: t.type === 'income' ? '1px solid green' : '1px solid red',
                  backgroundColor: t.type === 'income'
                    ? 'rgba(40, 167, 69, 0.1)'
                    : 'rgba(220, 53, 69, 0.1)'
                }}
              >
                {t.description} - {t.amount} €
              </span>
              <button
                onClick={() => removeTransaction(t.id)}
                style={{
                  marginLeft: '10px',
                  padding: '5px',
                  backgroundColor: t.type === 'income' ? '#28a745' : '#dc3545',
                  color: '#fff',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  border: 'none'
                }}
              >
                Entfernen
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PercentageChart;
