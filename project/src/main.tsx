import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { ExcelDataProvider } from './contexts/ExcelDataContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ExcelDataProvider>
        <App />
      </ExcelDataProvider>
    </BrowserRouter>
  </StrictMode>
);