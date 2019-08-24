import React from 'react';
import {
  ExchangeProvider,
  SummaryProvider,
  UserProvider,
  OrderbookProvider,
} from './context/ExchangeContext';
import Exchange from './pages/Exchange';

function App() {
  return (
    <ExchangeProvider>
      <SummaryProvider>
        <UserProvider>
          <OrderbookProvider>
            <Exchange />
          </OrderbookProvider>
        </UserProvider>
      </SummaryProvider>
    </ExchangeProvider>
  );
}

export default App;
