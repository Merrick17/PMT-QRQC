import {getApi, postApi} from '../../utils/apiHelpers';
import {
  GET_OTD_INFO,
  GET_OTD_INFO_SUCCESS,
  GET_TEMPS_EFFICIENT,
  GET_TEMPS_EFFICIENT_SUCCESS,
  GET_TRS_GLOBALE_INFO,
  GET_TRS_GLOBALE_INFO_FAILED,
  GET_TRS_GLOBALE_INFO_SUCCESS,
  GET_TRS_INFO,
  GET_TRS_INFO_FAILED,
  GET_TRS_INFO_SUCCESS,
} from '../actionTypes';

const getTrsInfo = () => {
  return {
    type: GET_TRS_INFO,
  };
};

const getTrsInfoSuccess = payload => {
  return {
    type: GET_TRS_INFO_SUCCESS,
    payload: payload,
  };
};

const getTrsInfoError = () => {
  return {
    type: GET_TRS_INFO_FAILED,
  };
};
const getTrsInfoGlobal = () => {
  return {
    type: GET_TRS_GLOBALE_INFO,
  };
};

const getTrsInfoGlobalSuccess = payload => {
  return {
    type: GET_TRS_GLOBALE_INFO_SUCCESS,
    payload: payload,
  };
};

const getTrsInfoGlobalError = () => {
  return {
    type: GET_TRS_GLOBALE_INFO_FAILED,
  };
};
export const getTrsGlobalApi = () => async dispatch => {
  try {
    dispatch(getTrsInfoGlobal());
    let res = await getApi('prod/trs/global');
    if (res) {
      dispatch(getTrsInfoGlobalSuccess(res.trsGlobal));
    }
  } catch (error) {
    dispatch(getTrsInfoGlobalSuccess());
  }
};

export const getTrsInfoApi = type => async dispatch => {
  try {
    dispatch(getTrsInfo());
    let res;
    if (type == 'day') {
      res = await postApi(`prod/trs/${type}`, {selectedDate: '2022-03-14'});
    } else {
      res = await postApi(`prod/trs/${type}`, {
        startDate: '2022-03-14',
        endDate: '2022-03-27',
      });
    }
    console.log('TRS INFO', res);
    if (res) {
      
      dispatch(getTrsInfoSuccess(res.trs));
    }
  } catch (error) {
    console.log('err', error);
    dispatch(getTrsInfoError());
  }
};

export const getTempsEfficentApi = () => async dispatch => {
  try {
    dispatch({
      type: GET_TEMPS_EFFICIENT,
    });
    let result = await postApi('prod/temps/efficient', {
      startDate: '2022-01-01',
      endDate: '2022-12-31',
    });
    dispatch({
      type: GET_TEMPS_EFFICIENT_SUCCESS,
      payload: result.result,
    });
  } catch (error) {}
};
export const getOtdApi = () => async dispatch => {
  try {
    dispatch({
      type: GET_OTD_INFO,
    });
    let result = await getApi('prod/otd/count');
    console.log('OTD', result);
    dispatch({
      type: GET_OTD_INFO_SUCCESS,
      payload: result.result,
    });
  } catch (error) {
    console.log('OTD ERR', error);
  }
};
