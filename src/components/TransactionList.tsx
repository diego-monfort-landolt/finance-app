import React from 'react';
// Definiere die Eigenschaften für das TransactionList-Props
interface TransactionListProps {
  transactions: { id: number; description: string; amount: number }[];
  deleteTransaction: (id: number) => void;
}
// Komponente für die Liste der Transaktionen
const TransactionList: React.FC<TransactionListProps> = ({ transactions, deleteTransaction }) => {
  return (
    <ul>
      {transactions.map((transaction) => (
        <li key={transaction.id} style={{ boxShadow: '0 4px 8px rgba(255, 0, 0, 0.2)' }}>
          {transaction.description}: {transaction.amount} €
          <button onClick={() => deleteTransaction(transaction.id)}>Löschen</button>
        </li>
      ))}
    </ul>
  );
};
export default TransactionList;