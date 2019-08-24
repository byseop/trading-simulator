import React, { useState } from 'react';
import Orderbook from './Orderbook'
import '../css/Order.css';

const Order = () => {
  const [orderType, setOrderType] = useState('ASK');
  return (
    <div className="Order__Box Section">
      <div className="Order__Head">
        <div className="Order__Type">
          <p className={orderType === 'ASK' ? 'on' : null} onClick={() => setOrderType('ASK')}>매수</p>
        </div>
        <div className="Order__Type">
          <p className={orderType === 'BID' ? 'on' : null} onClick={() => setOrderType('BID')}>매도</p>
        </div>
      </div>
      <Orderbook orderType={orderType} />
    </div>
  );
};

export default Order;
