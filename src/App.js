import React from 'react';
import { ExchangeProvider } from './context/ExchangeContext';
import Exchange from './pages/Exchange';

function App() {
  return (
    <ExchangeProvider>
      <Exchange />
    </ExchangeProvider>
  )
}

export default App;
