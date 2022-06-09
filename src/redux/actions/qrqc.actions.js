import {deleteApi, getApi, postApi} from '../../utils/apiHelpers';
import {
  ADD_NEW_QRQC,
  ADD_NEW_QRQC_SUCCESS,
  GET_QRQC_LIST,
  GET_QRQC_LIST_SUCCESS,
} from '../actionTypes';

const addNewQRQC = () => {
  return {
    type: ADD_NEW_QRQC,
  };
};
const addNewQRQCSuccess = data => {
  return {
    type: ADD_NEW_QRQC_SUCCESS,
    payload: data,
  };
};
export const addNewQRQCApi = (data, navigation) => async dispatch => {
  try {
    dispatch(addNewQRQC());
    let result = await postApi('qrqc/new', data);
    dispatch(addNewQRQCSuccess(result.result));
    navigation.navigate('Reason');
  } catch (error) {
    console.log('Error', error.message);
  }
};
export const getAllQrQcApi = () => async dispatch => {
  let result = await getApi('qrqc/all');
  console.log('QR QC', result);
  dispatch({
    type: GET_QRQC_LIST_SUCCESS,
    payload: result.result,
  });
};
export const addNewReasonApi = (body, navigation, prev) => async dispatch => {
  try {
    let result = await postApi('qrqc/cause/add', body);
    if (result) {
      if (prev) {
        navigation.pop();
      } else {
        navigation.navigate('Action');
      }

      dispatch(getAllQrQcApi());
    }
  } catch (error) {}
};
export const addNewActionApi = (body, toast) => async dispatch => {
  try {
    console.log('BOODY', body);
    let result = await postApi('qrqc/action/add', body);
    console.log('Result', result);
    if (result) {
      dispatch(getAllQrQcApi());
      toast.show('Information Ajouter ! ', {
        type: 'success',
        placement: 'bottom',
        duration: 4000,
        offset: 30,
        animationType: 'zoom-in',
      });
    } else {
    }
  } catch (error) {
    console.log('ADD ERR', error.message);
  }
};

export const deleteQrQcApi = id => async dispatch => {
  try {
    let result = await deleteApi('qrqc/' + id);
    if (result.success) {
      dispatch(getAllQrQcApi());
    }
  } catch (error) {}
};
