import React from 'react';
import Orderbook from './Orderbook'
import Trade from './Trade';
import '../css/Order.css';

const Order = () => {
  return (
    <>
      <div className="Order__Box Section">
        <div className="Order__Inner">
          <Orderbook />
          <Trade />
        </div>
      </div>
    </>
  );
};

export default Order;
