import React, { useState } from 'react';
import Orderbook from './Orderbook';
import Trade from './Trade';
import '../css/Order.css';

const Order = ({ code }) => {
  const [orderbookData, setOrderbookData] = useState(0);

  return (
    <>
      <div className="Order__Box Section">
        <div className="Order__Inner">
          <Orderbook setOrderbookData={setOrderbookData} code={code} />
          <Trade orderbookData={orderbookData} code={code} />
        </div>
      </div>
    </>
  );
};

export default Order;
