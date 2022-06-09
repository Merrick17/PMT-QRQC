import {getApi} from '../../utils/apiHelpers';
import {GET_ABSENT_INFO, GET_ABSENT_INFO_SUCCESS} from '../actionTypes';

export const absentAction = () => {
  return {
    type: GET_ABSENT_INFO,
  };
};
export const absentActionSuccess = data => {
  return {
    type: GET_ABSENT_INFO_SUCCESS,
    payload: data,
  };
};

export const getAbsentInfoApi = () => async dispatch => {
  try {
    dispatch(absentAction());
    let result = await getApi('absent');
    console.log('Result', result);
    dispatch(absentActionSuccess(result.result));
  } catch (error) {
    console.log('error', error.message);
  }
};
