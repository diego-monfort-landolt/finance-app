import React from 'react';
// Definiere die Eigenschaften für das Balance-Props
interface BalanceProps {
  transactions: { amount: number }[];
}
// Komponente für die Anzeige der Gesamtbilanz
const Balance: React.FC<BalanceProps> = ({ transactions }) => {
  const total = transactions.reduce((acc, transaction) => acc + transaction.amount, 0); // Gesamtbilanz berechnen
  return (
    <div>
      <h2>Gesamtbilanz: {total} €</h2>
    </div>
  );
};
export default Balance;