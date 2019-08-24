import React, { useEffect } from 'react';
import Order from './Order';
import { useOrderbookDispatch, getOrderbook } from '../context/ExchangeContext';

const OrderContainer = ({ code }) => {
  const dispatch = useOrderbookDispatch();
  useEffect(() => {
    getOrderbook.wsopen(dispatch, code)
  }, [code, dispatch])

  return <Order />
}

export default OrderContainer;