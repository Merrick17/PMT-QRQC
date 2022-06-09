import {deleteApi, getApi, postApi} from '../../utils/apiHelpers';
import {
  ADD_AUDIT_TASK,
  GET_AUDIT_DETAILS_ACTION,
  GET_AUDIT_LIST,
  GET_AUDIT_LIST_SUCCESS,
  SELECTED_AUDIT_TO_EDIT,
} from '../actionTypes';

const addNewAudit = () => {
  return {
    type: ADD_AUDIT_TASK,
  };
};
const getAuditList = () => {
  return {
    type: GET_AUDIT_LIST,
  };
};
const getAuditListSuccess = data => {
  return {
    type: GET_AUDIT_LIST_SUCCESS,
    payload: data,
  };
};
export const editDetails = data => {
  return {
    type: SELECTED_AUDIT_TO_EDIT,
    payload: data,
  };
};
export const getAuditDetailsApi = id => async dispatch => {
  try {
    let result = await getApi('tasks/details/' + id);
    dispatch({
      type: GET_AUDIT_DETAILS_ACTION,
      payload: result.result,
    });
  } catch (error) {}
};
export const addAuditApi = (data, toast) => async dispatch => {
  try {
    let result = await postApi('tasks/add', data);
    if (result) {
      toast.show('Votre Nouveau Audit à été ajouter', {
        type: 'success',
        placement: 'bottom',
        duration: 4000,
        offset: 30,
        animationType: 'zoom-in',
      });
      dispatch(getAuditListApi());
    }
  } catch (error) {}
};
export const addAuditDetailsApi = (data, toast) => async dispatch => {
  try {
    console.log('ADD', data);
    let result = await postApi('tasks/details/add', data);
    toast.show('Votre Nouvelle tache à été ajouter', {
      type: 'success',
      placement: 'bottom',
      duration: 4000,
      offset: 30,
      animationType: 'zoom-in',
    });
    if (result) {
      dispatch(getAuditDetailsApi(data.id_tache));
    }
  } catch (error) {}
};
export const deleteDetailsApi =
  (id_details, id_audit, toast) => async dispatch => {
    try {
     
      let result = await deleteApi('tasks/details/delete/' + id_details);
      toast.show('La tache à été supprimer', {
        type: 'success',
        placement: 'bottom',
        duration: 4000,
        offset: 30,
        animationType: 'zoom-in',
      });
      if (result) {
        dispatch(getAuditDetailsApi(id_audit));
      }
    } catch (error) {}
  };
export const getAuditListApi = () => async dispatch => {
  try {
    // dispatch(getAuditList());
    let result = await getApi('tasks');
    dispatch(getAuditListSuccess(result.result));
  } catch (error) {
    console.log('err', error);
  }
};
