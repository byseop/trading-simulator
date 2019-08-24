import React from 'react';
import { useOrderbookState } from '../context/ExchangeContext';

const Order = () => {
  const state = useOrderbookState();
  console.log(state);
  return <div />;
};

export default Order;
