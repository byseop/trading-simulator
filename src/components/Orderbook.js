import React from 'react';
import { useOrderbookState } from '../context/ExchangeContext';
import OrderbookList from './OrderbookList';
import '../css/Orderbook.css';

const Orderbook = ({ orderType }) => {
  const state = useOrderbookState();
  const { data } = state;
  const orderbook_units = data !== null && data.orderbook_units;
  return (
    <div className="Orderbook__Wrap">
      <div className="Orderbook">
        {orderbook_units &&
          orderbook_units.reverse().map(list => (
            <OrderbookList
              ask_price={list.ask_price}
              ask_size={list.ask_size}
              key={list.ask_price}
              code={data.code}
            />
          ))}
        {orderbook_units &&
          orderbook_units.reverse().map(list => (
            <OrderbookList
              bid_price={list.ask_price}
              bid_size={list.bid_size}
              key={list.bid_price}
              code={data.code}
            />
          ))}
      </div>
      <div className="Order__Form" />
    </div>
  );
};

export default React.memo(Orderbook);
