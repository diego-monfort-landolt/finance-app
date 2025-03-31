import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './VisitorCounter.css';

const VisitorCounter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    // Abrufen des gespeicherten Zählerwerts aus LocalStorage
    const storedCount = localStorage.getItem('visitorCount');
    const currentCount = storedCount ? parseInt(storedCount, 10) : 0;
    // Neuer Zählerwert: bestehender Wert + 1
    const newCount = currentCount + 1;
    // Speichern des neuen Zählerwerts in LocalStorage
    localStorage.setItem('visitorCount', newCount.toString());
    // Setzen des Zählerwerts im Zustand (State)
    setCount(newCount);
  }, []); // Wird nur einmal beim Laden der Komponente ausgeführt

  return (
    <div className="visitor-counter">
      <FontAwesomeIcon icon={faUser} className="icon" />
      <span>{count}</span>
    </div>
  );
};
export default VisitorCounter;