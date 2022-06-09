import {getApi, postApi, putApi} from '../../utils/apiHelpers';
import {
  ADD_ALERT,
  GET_ALL_ALERTS,
  GET_ALL_ALERTS_SUCCESS,
} from '../actionTypes';
import Toast from 'react-native-toast-message';
const addAlert = () => {
  return {
    type: ADD_ALERT,
  };
};

export const getAllAlerts = () => {
  return {
    type: GET_ALL_ALERTS,
  };
};
export const getAllAlertsSuccess = data => {
  return {
    type: GET_ALL_ALERTS_SUCCESS,
    payload: data,
  };
};

export const getAlertsBySenderApi = id => async dispatch => {
  try {
    dispatch(getAllAlerts());
    let result = await getApi('alerts/sender/' + id);
   // console.log('Result', result);
    if (result.success) {
      dispatch(getAllAlertsSuccess(result.result));
    }
  } catch (error) {
    console.log('Error', error.message);
  }
};
export const getAlertsByReceiverApi = id => async dispatch => {
  try {
    //console.log('RECEIVER', id);
    dispatch(getAllAlerts());
    let result = await getApi('alerts/receiver/' + id);
    //console.log('Result', result);
    if (result.success) {
      dispatch(getAllAlertsSuccess(result.result));
    }
  } catch (error) {
    console.log('Error', error.message);
  }
};
export const addAlertApi = (data, selected, toast) => async dispatch => {
  try {
    console.log('SELECTED', selected);
    dispatch(addAlert());
    let result = await postApi('alerts/add', data);
    console.log('ADD RESULT', result);
    toast.show('Alert ajouter avec a success', {
      type: 'success',
      placement: 'bottom',
      duration: 4000,
      offset: 30,
      animationType: 'zoom-in',
    });
    if (result) {
      if (selected) {
        dispatch(getAlertsBySenderApi(result.result.sender_mat));
      } else {
        dispatch(getAlertsByReceiverApi(result.result.sender_mat));
      }
    }
  } catch (error) {}
};

export const fixAlert =
  (alertId, selected, body, receiverId, senderId, toast) => async dispatch => {
    try {
      let result = await putApi('alerts/fix/' + alertId, body);
      console.log('FIXED RESULT', result);
      toast.show('Votre réponse à été envoyer', {
        type: 'success',
        placement: 'bottom',
        duration: 4000,
        offset: 30,
        animationType: 'zoom-in',
      });
      if (result) {
        if (result) {
          if (selected) {
            dispatch(getAlertsBySenderApi(senderId));
          } else {
            dispatch(getAlertsByReceiverApi(receiverId));
          }
        }
      }
    } catch (error) {}
  };
