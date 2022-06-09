import {deleteApi, getApi, postApi, putApi} from '../../utils/apiHelpers';
import {GET_ALL_OBJECTIF} from '../actionTypes';
import Toast from 'react-native-toast-message';
export const addObjectifApi = data => async dispatch => {
  try {
    let result = await postApi('objectif/add', data);
    if (result) {
      Toast.show({
        type: 'success',
        text1: 'Nouveau Objectif à été ajouter',
      });
      dispatch(getObjectifApi());
    }
  } catch (error) {}
};
export const EditObjectifApi = (data, id) => async dispatch => {
  try {
    let result = await putApi('objectif/update/' + id, data);
    if (result) {
      dispatch(getObjectifApi());
    }
  } catch (error) {}
};

export const getObjectifApi = () => async dispatch => {
  try {
    let result = await getApi('objectif');

    if (result) {
      console.log('Result', result.result);
      dispatch({
        type: GET_ALL_OBJECTIF,
        payload: result.result,
      });
    }
  } catch (error) {}
};

export const deleteObjectifApi = id => async dispatch => {
  try {
    let result = await deleteApi('objectif/delete/' + id);
    if (result) {
      dispatch(getObjectifApi());
    }
  } catch (error) {}
};
