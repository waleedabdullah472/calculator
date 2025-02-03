import React, { useState, useEffect } from 'react';
import './App.css';

const app = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [animate, setAnimate] = useState(false);

  const buttons = [
    'C', 'DEL', '%', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
     '0', '.', '='
  ];

  const handleButtonClick = (value) => {
    setAnimate(true);
    
    if (value === 'C') {
      setDisplay('0');
      setExpression('');
      return;
    }

    if (value === 'DEL') {
      setDisplay(display.length === 1 ? '0' : display.slice(0, -1));
      return;
    }

    if (value === '=') {
      try {
        const result = eval(expression + display);
        setDisplay(result.toString());
        setExpression('');
      } catch (error) {
        setDisplay('Error');
      }
      return;
    }

    if ('+-*/%'.includes(value)) {
      setExpression(display + value);
      setDisplay('0');
      return;
    }

    if (display === '0' && value !== '.') {
      setDisplay(value);
    } else {
      setDisplay(display + value);
    }
  };

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setAnimate(false), 100);
      return () => clearTimeout(timer);
    }
  }, [animate]);

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className={`display ${animate ? 'pop' : ''}`}>
          <div className="expression">{expression}</div>
          <div className="current">{display}</div>
        </div>
        <div className="buttons">
          {buttons.map((btn) => (
            <button
              key={btn}
              className={`btn ${isNaN(btn) ? 'operator' : ''} ${btn === '=' ? 'equals' : ''}`}
              onClick={() => handleButtonClick(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default app;