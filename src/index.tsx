import React from 'react';
import ReactDOM from 'react-dom/client';
import 'css/global.css';
import MrtNoteGenerator from './MrtNoteGenerator';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MrtNoteGenerator />
  </React.StrictMode>
);