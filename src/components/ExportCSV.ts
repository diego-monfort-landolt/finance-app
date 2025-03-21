import { Transaction } from '../App'; // Importiere das Transaction-Interface

// Funktion zum Exportieren von Transaktionen als CSV-Datei
export const exportToCSV = (transactions: Transaction[], fileName: string = 'transactions.csv') => {
  try {
    const csvRows = []; // Array zum Speichern der CSV-Zeilen
    const headers = ['ID', 'Beschreibung', 'Betrag', 'Typ', 'Kommentar']; // Kopfzeilen der CSV-Datei
    csvRows.push(headers.join(',')); // Füge die Kopfzeilen zur ersten Zeile hinzu
    // Iteriere über jede Transaktion und erstelle eine CSV-Zeile
    transactions.forEach(transaction => {
      const values = [
        transaction.id, // ID der Transaktion
        transaction.description, // Beschreibung der Transaktion
        transaction.amount, // Betrag der Transaktion
        transaction.type, // Typ der Transaktion (Einnahme oder Ausgabe)
        transaction.comment // Kommentar zur Transaktion
      ];
      csvRows.push(values.join(',')); // Füge die CSV-Zeile zum Array hinzu
    });
    const csvContent = csvRows.join('\n'); // Verbinde alle Zeilen zu einem CSV-String
    const blob = new Blob([csvContent], { type: 'text/csv' }); // Erstelle ein Blob-Objekt mit dem CSV-String
    const url = window.URL.createObjectURL(blob); // Erstelle eine URL für das Blob-Objekt
    const a = document.createElement('a'); // Erstelle ein unsichtbares Link-Element
    a.setAttribute('href', url); // Setze die URL als href-Attribut des Links
    a.setAttribute('download', fileName); // Setze den Dateinamen für den Download
    a.click(); // Simuliere einen Klick auf den Link, um den Download zu starten
    window.URL.revokeObjectURL(url); // Gib die URL frei, um Speicherlecks zu vermeiden
  } catch (error) {
    console.error('Fehler beim Exportieren der CSV-Datei:'); // Fehlerbehandlung
  }
};