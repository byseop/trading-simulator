import React from 'react';
import { StockExchangeProvider } from './context/StockExchangeContext';
import StockExchange from './components/StockExchange';

function App() {
  return (
    <StockExchangeProvider>
      <StockExchange />
    </StockExchangeProvider>
  )
}

export default App;
