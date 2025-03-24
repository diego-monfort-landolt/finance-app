import React, { useState, useEffect } from 'react';
import './App.css';
import PercentageChart from './components/PercentageChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faFileExport } from '@fortawesome/free-solid-svg-icons';
import { exportToCSV } from './components/ExportCSV';
import Notification from './components/Notification';

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  comment: string;
}
const App: React.FC = () => {
  // Zustand für Transaktionen, initialisiert mit gespeicherten Daten aus dem lokalen Speicher
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [comment, setComment] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [analysis, setAnalysis] = useState<string>('');
  const [improvements, setImprovements] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  // Berechnung der Gesamteinnahmen, Gesamtausgaben und des Saldos
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const balance = totalIncome - totalExpenses;
  // Effekt, um Transaktionen im lokalen Speicher zu speichern, wenn sich die Transaktionen ändern
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);
  // Effekt zur Anzeige von Vorschlägen basierend auf dem Saldo
  useEffect(() => {
    if (balance > 0) {
      setSuggestion('Super! Du bist im Plus. Überlege, wie du dein Geld weiter investieren kannst.');
    } else if (balance < 0) {
      setSuggestion('Achtung! Du bist im Minus. Überlege, wie du deine Ausgaben reduzieren kannst.');
    } else {
      setSuggestion('');
    }
  }, [balance]);
  // Funktion zum Hinzufügen einer neuen Transaktion
  const [notifications, setNotifications] = useState<string[]>([]);

  const addTransaction = () => {
     if (!description || amount === undefined || amount === 0) {
        // Fehlerfall: Eingaben sind ungültig
        alert('Bitte füllen Sie alle Pflichtfelder aus.');
        return; // Abbrechen, um keine Benachrichtigung hinzuzufügen
    }
    // Erfolgreiche Transaktion hinzufügen
    const newTransaction = { id: Date.now(), description, amount, type, comment };
    setTransactions([newTransaction, ...transactions]);
    // Benachrichtigung hinzufügen
    setNotifications([...notifications, `Transaktion hinzugefügt: ${description}`]);
    // Eingabefelder zurücksetzen
    setDescription('');
    setAmount(undefined);
    setType('income');
    setComment('');
  };
  // Funktion zum Löschen einer Transaktion
  const deleteTransaction = (id: number) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };
  // Funktion zum Zurücksetzen aller Transaktionen
  const resetTransactions = () => {
    setTransactions([]);
    localStorage.removeItem('transactions');
  };
  // Funktion zur Analyse der Finanzen und Generierung von Finanztipps
  const analyzeFinances = () => {
    if (transactions.length === 0) {
      setAnalysis('Keine Transaktionen vorhanden. Bitte fügen Sie Transaktionen hinzu, um eine Analyse durchzuführen.');
      return;
    }
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    const balance = totalIncome - totalExpenses;
    let advice = 'Hier sind einige Finanztipps basierend auf deinen Transaktionen:\n';

    if (totalIncome > totalExpenses) {
      advice += 'Gut gemacht! Deine Einnahmen übersteigen deine Ausgaben. Versuche, einen Teil deiner Einnahmen zu sparen.\n';
    } else if (totalIncome < totalExpenses) {
      advice += 'Achtung! Deine Ausgaben übersteigen deine Einnahmen. Versuche, deine Ausgaben zu reduzieren.\n';
    } else {
      advice += 'Deine Einnahmen und Ausgaben sind ausgeglichen. Versuche, deine Ausgaben zu reduzieren, um etwas zu sparen.\n';
    }
    if (balance < 0) {
      advice += 'Du hast ein negatives Guthaben. Überlege, wie du deine Ausgaben reduzieren oder deine Einnahmen erhöhen kannst.\n';
    } else if (balance > 0 && balance < 100) {
      advice += 'Du hast ein kleines Guthaben. Versuche, es weiter zu erhöhen.\n';
    } else if (balance >= 100) {
      advice += 'Du hast ein gutes Guthaben. Überlege, wie du es investieren kannst.\n';
    }
    setAnalysis(advice);
  };
  // Funktion zum Entfernen einer Verbesserung
  const removeImprovement = (index: number) => {
    setImprovements(improvements.filter((_, i) => i !== index));
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <div className="dark-mode-toggle-container">
        <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} className="icon" />
        </button>
      </div>
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
            <option disabled value="wish list">Wunsch Liste</option>
          </select>
          <button onClick={addTransaction}>Transaktion hinzufügen</button>
          {notifications.map((message, index) => (
                <Notification
                    key={index}
                    message={message}
                    onClose={() => setNotifications((prev) => prev.slice(1))}
                />
            ))}
          <button 
          onClick={resetTransactions} 
          style={{ 
            marginTop: '10px', 
            backgroundColor: 'red' 
            }}
            >
          Alle Transaktionen zurücksetzen
          </button>
          <button 
          onClick={analyzeFinances} 
          style={{ 
            marginTop: '10px', 
            backgroundColor: 'green' 
            }}
            >
            Finanzen analysieren
            </button>
          <button 
          className="export-button"
          onClick={() => exportToCSV(transactions)} 
          style={{ 
            marginTop: '10px', 
            marginLeft: 'auto', 
            padding: '10px',
            borderRadius: '8px', 
            backgroundColor: 'blue', 
            color: 'white' 
            }}> 
          <FontAwesomeIcon icon={faFileExport} /> 
          Exportieren        
          </button>
        </div>
        <div className="summary">
          <h2>Zusammenfassung</h2>
          <p>Einnahmen: <span className="amount income">{totalIncome.toFixed(2)} €</span></p>
          <p>Ausgaben: <span className="amount expense">{totalExpenses.toFixed(2)} €</span></p>
          <p>Saldo: <span className="amount">{balance.toFixed(2)} €</span></p>
        </div>
        {analysis && (
          <div className={`analysis ${balance >= 0 ? 'positive' : 'negative'}`}>
            <h2>Finanzanalyse</h2>
            <p>{analysis}</p>
          </div>
        )}
        <PercentageChart transactions={transactions} />
        {improvements.length > 0 && (
          <div className={`improvements ${balance >= 0 ? 'positive' : 'negative'}`}>
            <h3>Verbesserungen</h3>
            {improvements.map((improvement, index) => (
              <div key={index} className="improvement">
                <p>{improvement}</p>
                <button onClick={() => removeImprovement(index)}>X</button>
              </div>
            ))}
          </div>
        )}    
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowModal(false)}>&times;</span>
              <p>{suggestion}</p>
            </div>
          </div>
        )}
        {/* Hier wird die wunschliste freigeschaltet */}
        {/* <div className="wishlist-notification"> */}
          {/* <p>Wunschliste hinzugefügt - wird demnächst freigeschaltet</p> */}
          {/* <Wishlist balance={balance} /> Wishlist-Komponente hinzugefügt */}
        {/* </div>  */}  
        </div>
    </div>
  );
};
export default App;