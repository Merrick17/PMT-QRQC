import {
  GET_TRS_GLOBALE_INFO,
  GET_TRS_GLOBALE_INFO_SUCCESS,
  GET_TRS_INFO,
  GET_TRS_INFO_SUCCESS,
  GET_TEMPS_EFFICIENT,
  GET_TEMPS_EFFICIENT_SUCCESS,
  GET_OTD_INFO,
  GET_OTD_INFO_SUCCESS,
} from '../actionTypes';

const TRSInitState = {
  loading: false,
  data: [],
  tempsEfficient: [],
  otdInfo: [],
};

const trsGlobalReducer = (state = TRSInitState, action) => {
  let {type, payload} = action;
  console.log('Paaylooad', type);
  switch (type) {
    case GET_TRS_GLOBALE_INFO:
      return {...state, loading: true};
    case GET_TRS_GLOBALE_INFO_SUCCESS:
      return {...state, loading: false, data: payload};
    case GET_TEMPS_EFFICIENT:
      return {...state, loading: true};
    case GET_TEMPS_EFFICIENT_SUCCESS:
      return {...state, loading: false, tempsEfficient: payload};
    case GET_OTD_INFO:
      return {...state, loading: true};
    case GET_OTD_INFO_SUCCESS:
      return {...state, loading: false, otdInfo: payload};
    default:
      return state;
  }
};

export default trsGlobalReducer;
