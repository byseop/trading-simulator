import React from 'react';
import { useOrderbookState } from '../context/ExchangeContext';
import OrderbookList from './OrderbookList';
import '../css/Orderbook.css';

const Orderbook = ({ setOrderbookData, code }) => {
  const state = useOrderbookState();
  const { data } = state;
  const orderbook_units = data !== null && data.orderbook_units;
  if (orderbook_units) {
    return (
      <div className="Orderbook__Wrap">
        <div className="Orderbook__Head">
          <div className="Orderbook__Div">
            <p>매수량</p>
          </div>
          <div className="Orderbook__Div">
            <p>가격</p>
          </div>
          <div className="Orderbook__Div">
            <p>매도량</p>
          </div>
        </div>
        <div className="Orderbook">
          {orderbook_units.reverse().map(list => (
            <OrderbookList
              ask_price={list.ask_price}
              ask_size={list.ask_size}
              key={list.ask_price}
              code={code}
              setOrderbookData={setOrderbookData}
            />
          ))}
          {orderbook_units.reverse().map(list => (
            <OrderbookList
              bid_price={list.ask_price}
              bid_size={list.bid_size}
              key={list.bid_price}
              code={code}
              setOrderbookData={setOrderbookData}
            />
          ))}
        </div>
      </div>
    );
  }
  return <div className="Orderbook__Wrap">로딩중...</div>;
};

export default React.memo(Orderbook);
