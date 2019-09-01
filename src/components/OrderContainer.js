import React, { useEffect } from 'react';
import Order from './Order';
import { useOrderbookDispatch, getOrderbook } from '../context/ExchangeContext';

const OrderContainer = ({ code }) => {
  const dispatch = useOrderbookDispatch();
  useEffect(() => {
    getOrderbook.wsopen(dispatch, code);
    return () => {
      getOrderbook.wsclose(dispatch);
    };
  }, [code, dispatch]);

  return <Order code={code} />;
};

export default OrderContainer;
