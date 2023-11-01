import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './index.css';
import ErrorBoundary from './errorBoundary/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
