import React from 'react';
import { ExchangeProvider, SummaryProvider, UserProvider } from './context/ExchangeContext';
import Exchange from './pages/Exchange';

function App() {
  return (
    <ExchangeProvider>
      <SummaryProvider>
        <UserProvider>
          <Exchange />
        </UserProvider>
      </SummaryProvider>
    </ExchangeProvider>
  )
}

export default App;
