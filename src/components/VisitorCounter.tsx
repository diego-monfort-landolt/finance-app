import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './VisitorCounter.css';

const VisitorCounter: React.FC = () => {
  const [count, setCount] = useState<number>(10);

  useEffect(() => {
    // Erhöhe den Besucherzähler nur während der Komponenteninitalisierung
    setCount(prevCount => prevCount + 1);
  }, []);

  return (
    <div className="visitor-counter">
      <FontAwesomeIcon icon={faUser} className="icon" />
      <span>{count}</span>
    </div>
  );
};

export default VisitorCounter;
