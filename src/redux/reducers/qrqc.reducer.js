import {
  ADD_NEW_QRQC,
  ADD_NEW_QRQC_SUCCESS,
  GET_QRQC_LIST,
  GET_QRQC_LIST_SUCCESS,
} from '../actionTypes';
const QrQcInitState = {
  loading: false,
  list: [],
  newQrQc: {},
};
const QrQcReducer = (state = QrQcInitState, action) => {
  let {payload, type} = action;
  switch (type) {
    case ADD_NEW_QRQC:
      return {...state, loading: true};
    case ADD_NEW_QRQC_SUCCESS:
      return {
        ...state,
        loading: false,
        newQrQc: payload,
      };
    case GET_QRQC_LIST:
      return {...state, loading: true};
    case GET_QRQC_LIST_SUCCESS:
      return {...state, loading: false, list: payload};

    default:
      return state;
  }
};

export default QrQcReducer;
