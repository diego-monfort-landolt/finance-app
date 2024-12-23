import React, { useState } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Balance from './components/Balance';
import PercentageChart from './components/PercentageChart';
import './App.css';

// Definiere die Eigenschaften für die Transaktionen
interface Transaction {
  id: number;
  description: string;
  amount: number;
}

// Hauptkomponente der App
const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]); // Zustand für die Transaktionen

  // Funktion zum Hinzufügen einer Transaktion
  const addTransaction = (transaction: { description: string; amount: number }) => {
    const newTransaction = { ...transaction, id: Date.now() }; // Neue Transaktion erstellen
    setTransactions([newTransaction, ...transactions]); // Transaktion hinzufügen
  };

  // Funktion zum Löschen einer Transaktion
  const deleteTransaction = (id: number) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id)); // Transaktion löschen
  };

  return (
    <div className="App">
      <div className="content">
        <h1>Finanz-Tracker</h1>
        <TransactionForm addTransaction={addTransaction} />
        <Balance transactions={transactions} />
        <PercentageChart transactions={transactions} />
        <TransactionList transactions={transactions} deleteTransaction={deleteTransaction} />
      </div>
    </div>
  );
};

export default App;
