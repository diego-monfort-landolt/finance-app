import { Transaction } from '../App'; // Importiere das Transaction-Interface

export const exportToCSV = (transactions: Transaction[]) => {
  const csvRows = [];
  const headers = ['ID', 'Beschreibung', 'Betrag', 'Typ', 'Kommentar'];
  csvRows.push(headers.join(','));

  transactions.forEach(transaction => {
    const values = [
      transaction.id,
      transaction.description,
      transaction.amount,
      transaction.type,
      transaction.comment
    ];
    csvRows.push(values.join(','));
  });

  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', 'transactions.csv');
  a.click();
};
