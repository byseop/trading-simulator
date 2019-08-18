import React from 'react';
import { ExchangeProvider, SummaryProvider } from './context/ExchangeContext';
import Exchange from './pages/Exchange';

function App() {
  return (
    <ExchangeProvider>
      <SummaryProvider>
        <Exchange />
      </SummaryProvider>
    </ExchangeProvider>
  )
}

export default App;
