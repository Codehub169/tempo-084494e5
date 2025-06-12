import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Global styles, including Tailwind base, components, and utilities

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element. The React app will not be mounted.');
}
