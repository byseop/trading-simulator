import React, { useCallback } from 'react';

const OrderbookList = ({
  ask_price,
  bid_price,
  ask_size,
  bid_size,
  code,
  setOrderbookData,
}) => {
  const splitCode = code.split('-');
  const fixPrice = useCallback((price, fixLevel) => {
    // 가격 단위 조정 함수
    if (price > 999) {
      return parseInt(price.toFixed(fixLevel)).toLocaleString();
    }
    return price.toFixed(fixLevel);
  }, []);

  return (
    <div
      className="Orderbook__List"
      onClick={() => setOrderbookData({ ask_price, bid_price })}
    >
      <div className="Orderbook__Size">
        {ask_size ? (
          <p>
            {fixPrice(ask_size, 4)} <span>{splitCode[1]}</span>
          </p>
        ) : null}
      </div>
      <div className="Orderbook__Price">
        {ask_price ? (
          <p>
            {ask_price.toLocaleString()} <span>{splitCode[0]}</span>
          </p>
        ) : null}
        {bid_price ? (
          <p>
            {bid_price.toLocaleString()} <span>{splitCode[0]}</span>
          </p>
        ) : null}
      </div>
      <div className="Orderbook__Size">
        {bid_size ? (
          <p>
            {fixPrice(bid_size, 4)} <span>{splitCode[1]}</span>
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default React.memo(OrderbookList);
