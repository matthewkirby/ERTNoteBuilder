import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ErtNoteGenerator from './ErtNoteGenerator';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErtNoteGenerator />
  </React.StrictMode>
);