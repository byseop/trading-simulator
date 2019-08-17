import React from 'react';
import { Route } from 'react-router-dom';
import TradingSimulator from '../components/TradingSimulator';

const Exchange = () => {
  return (
    <div>
      <Route path="/" exact component={TradingSimulator} />
    </div>
  )
}

export default Exchange;