import {postApi} from '../../utils/apiHelpers';
import {
  GET_REBUS_INFO,
  GET_REBUS_INFO_SUCCESS,
  GET_TRS_INFO_FAILED,
} from '../actionTypes';

const getRebusInfo = () => {
  return {
    type: GET_REBUS_INFO,
  };
};

const getRebusInfoSuccess = payload => {
  return {
    type: GET_REBUS_INFO_SUCCESS,
    payload: payload,
  };
};

const getRebusInfoError = () => {
  return {
    type: GET_TRS_INFO_FAILED,
  };
};
export const getRebusInfoApi = type => async dispatch => {
  try {
    console.log('TYYYPE', type);
    dispatch(getRebusInfo());
    let res;

    if (type == 'day') {
      res = await postApi(`prod/rebus/${type}`, {startDate: '2022-03-14'});
      // console.log('Resssss', res);
    } else {
      res = await postApi(`prod/rebus/month`, {
        startDate: '2022-03-14',
        endDate: '2022-03-27',
      });
      console.log('Resssss', res);
    }
    console.log('Rebus Item', res);
    if (res && res.rebus) {
      dispatch(getRebusInfoSuccess(res.rebus));
    }
  } catch (error) {
    console.log('ERROR', error.message);
    // dispatch(getRebusInfoError());
  }
};
