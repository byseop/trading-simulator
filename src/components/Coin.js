import React from 'react';

const Coin = ({ data }) => {
  const { code: name, trade_price: price } = data;
  return (
    <div className="Coin">
      <div className="Coin__Name">{name}</div>
      <div className="Coin__Price">{price}</div>
    </div>
  );
};

export default React.memo(Coin);
