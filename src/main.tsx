import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// Erstelle das Root-Element und rendere die App
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);