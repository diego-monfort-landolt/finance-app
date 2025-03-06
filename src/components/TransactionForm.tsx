import React, { useState } from 'react';
// Definiere die Eigenschaften für das TransactionForm-Props
interface TransactionFormProps {
  addTransaction: (transaction: { description: string; amount: number }) => void;
}
// Komponente für das Formular zum Hinzufügen von Transaktionen
const TransactionForm: React.FC<TransactionFormProps> = ({ addTransaction }) => {
  const [description, setDescription] = useState(''); // Zustand für die Beschreibung
  const [amount, setAmount] = useState(0); // Zustand für den Betrag
  // Funktion zum Verarbeiten des Formulars
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTransaction({ description, amount }); // Neue Transaktion hinzufügen
    setDescription(''); // Formular zurücksetzen
    setAmount(0); // Formular zurücksetzen
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Beschreibung"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Betrag"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        required
      />
      <button type="submit">Hinzufügen</button>
    </form>
  );
};
export default TransactionForm;