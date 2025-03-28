import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './VisitorCounter.css';

const VisitorCounter: React.FC = () => {
  const [count, setCount] = useState<number>(10);

  useEffect(() => {
    // Abrufen des aktuellen Zählerwerts aus dem lokalen Speicher oder Server (Beispiel)
    const storedCount = localStorage.getItem('visitorCount');
    setCount(storedCount ? parseInt(storedCount, 20) : 0);

    // Erhöhen des Zählerwerts und Speichern
    const newCount = count + 1;
    localStorage.setItem('visitorCount', newCount.toString());
    setCount(newCount);
  }, []); // Läuft nur einmal, wenn die Komponente geladen wird

  return (
    <div className="visitor-counter">
      <FontAwesomeIcon icon={faUser} className="icon" />
      <span>{count}</span>
    </div>
  );
};

export default VisitorCounter;
