import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

// StockExchange 에서 사용 할 기본상태
const initialState = {
  market: {
    isLoad: false,
    data: null,
    error: null,
  },
  realtimeData: {
    isLoad: false,
    data: null,
    error: null,
  },
};

// 로딩중 상태
const loadingState = {
  isLoad: true,
  data: null,
  error: null,
};

// 성공시 상태
const success = data => ({
  isLoad: false,
  data,
  error: null,
});

// 실패시 상태
const error = error => ({
  isLoad: false,
  data: null,
  error: error,
});

// 실시간 정보 저장
const saveRealtimeData = (realtimeData, data) => ({
  isLoad: false,
  data: (function() {
    // console.log(realtimeData.data)
    if (realtimeData.data) {
      if (!realtimeData.data.map(list => list.code).includes(data.code)) {
        return realtimeData.data.concat(data);
      } else {
        return realtimeData.data
          .filter(list => list.code !== data.code)
          .concat(data);
      }
    } else {
      const tempArr = [];
      realtimeData.data = tempArr.concat(data);
      return realtimeData.data;
    }
  })(),
  error: null,
});

// 리듀서
function stockExchangeReducer(state, action) {
  switch (action.type) {
    case 'GET_MARKET':
      return {
        ...state,
        market: loadingState,
      };
    case 'GET_MARKET_SUCCESS':
      return {
        ...state,
        market: success(action.data),
      };
    case 'GET_MARKET_ERROR':
      return {
        ...state,
        market: error(action.error),
      };
    case 'GET_REALTIME_DATA':
      return {
        ...state,
        realtimeData: loadingState,
      };
    case 'GET_REALTIME_DATA_SUCCESS':
      return {
        ...state,
        realtimeData: saveRealtimeData(state.realtimeData, action.data),
      };
    case 'GET_REALTIME_DATA_ERROR':
      return {
        ...state,
        realtimeData: error(action.error),
      };
    default:
      throw new Error(`Unhandled action type ${action.type}`);
  }
}

// 컨텍스트 분리
const StockExchangeStateContext = createContext(null);
const StockExchangeDispatchContext = createContext(null);

// 위에서 선언한 두가지 컨텍스트를 Provider로 감싸준다.
export function StockExchangeProvider({ children }) {
  const [state, dispatch] = useReducer(stockExchangeReducer, initialState);
  return (
    <StockExchangeStateContext.Provider value={state}>
      <StockExchangeDispatchContext.Provider value={dispatch}>
        {children}
      </StockExchangeDispatchContext.Provider>
    </StockExchangeStateContext.Provider>
  );
}

// Hook: 조회를 쉽게
export function useStockState() {
  const state = useContext(StockExchangeStateContext);
  if (!state) {
    throw new Error('Cannot find Stock Provider');
  }
  return state;
}

export function useStockDispatch() {
  const dispatch = useContext(StockExchangeDispatchContext);
  if (!dispatch) {
    throw new Error('Cannot find Stock Provider');
  }
  return dispatch;
}

export async function getMarket(dispatch) {
  // 마켓 목록을 가져오는 함수
  dispatch({
    // 마켓 가져오기 시작
    type: 'GET_MARKET',
  });
  try {
    // 마켓 가져오기 중
    const response = await axios.get('https://api.upbit.com/v1/market/all');
    dispatch({
      type: 'GET_MARKET_SUCCESS',
      data: response.data,
    });

    // 마켓 리스트를 추출하여 웹소켓 실행
    const marketList = response.data.map(list => list.market);
    const ws = new WebSocket('wss://api.upbit.com/websocket/v1');
    ws.onopen = () => {
      // 웹소켓 연결
      dispatch({
        type: 'GET_REALTIME_DATA',
      });
      ws.send(
        `[{"ticket":"test"},{"type":"ticker","codes": ${JSON.stringify(
          marketList,
        )}}]`,
      );
    };
    ws.onmessage = async e => {
      // 실시간 데이터 수신
      const { data } = e;
      const text = await new Response(data).text();
      // console.log(JSON.parse(text));
      dispatch({
        type: 'GET_REALTIME_DATA_SUCCESS',
        data: JSON.parse(text),
      });
    };
    ws.onerror = e => {
      // 실시간 데이터 수신 에러
      dispatch({
        type: 'GET_REALTIME_DATA_ERROR',
        error: e,
      });
    };
  } catch (e) {
    // 마켓 가져오기 실패
    dispatch({
      type: 'GET_MARKET_ERROR',
      error: e,
    });
  }
}
