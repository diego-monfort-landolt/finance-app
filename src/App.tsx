import React, { useState, useEffect } from 'react';
import './App.css';
import PercentageChart from './components/PercentageChart';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  comment: string;
}

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [comment, setComment] = useState('');

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = () => {
    if (amount !== undefined && type && amount !== 0) {
      const newTransaction = { id: Date.now(), description, amount, type, comment };
      setTransactions([newTransaction, ...transactions]);
      setDescription('');
      setAmount(undefined);
      setType('income');
      setComment('');
    } else {
      alert('Bitte füllen Sie alle Pflichtfelder aus.');
    }
  };

  const deleteTransaction = (id: number) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  const resetTransactions = () => {
    setTransactions([]);
    localStorage.removeItem('transactions');
  };

// Berechnung der Gesamtmenge und Prozentsätze inkl text der Beschreibung

const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
const balance = totalIncome - totalExpenses;

const totalAmount = totalIncome + totalExpenses;
const incomePercentage = totalAmount ? (totalIncome / totalAmount) * 100 : 0;
const expensesPercentage = totalAmount ? (totalExpenses / totalAmount) * 100 : 0;

  return (
    <div className="App">
      <div className="content">
        <h1>Finanz-Tracker</h1>
        <div className="input-group">
          <input
            type="text"
            placeholder="Beschreibung"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Betrag"
            value={amount !== undefined ? amount : ''}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <select value={type} onChange={(e) => setType(e.target.value as 'income' | 'expense')}>
            <option value="income">Einnahme</option>
            <option value="expense">Ausgabe</option>
          </select>
          <button onClick={addTransaction}>Transaktion hinzufügen</button>
          <button onClick={resetTransactions} style={{ marginTop: '10px', backgroundColor: 'red' }}>Alle Transaktionen zurücksetzen</button>
        </div>
        <div className="summary">
          <h2>Zusammenfassung</h2>
          <p>Einnahmen: <span className="amount income">{totalIncome.toFixed(2)} EUR</span></p>
          <p>Ausgaben: <span className="amount expense">{totalExpenses.toFixed(2)} EUR</span></p>
          <p>Saldo: <span className="amount">{balance.toFixed(2)} EUR</span></p>
        </div>
        <PercentageChart transactions={transactions} />
      </div>
    </div>
  );
};

export default App;