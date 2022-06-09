import {
  GET_AUDIT_DETAILS_ACTION,
  GET_AUDIT_LIST,
  GET_AUDIT_LIST_SUCCESS,
  SELECTED_AUDIT_TO_EDIT,
} from '../actionTypes';
const initList = {
  auditList: [],
  detailsList: [],
  loading: false,
  selectedAudit: null,
};
const auditReducer = (state = initList, action) => {
  let {type, payload} = action;
  switch (type) {
    case GET_AUDIT_LIST:
      return {...state, loading: true};
    case GET_AUDIT_LIST_SUCCESS:
      return {...state, loading: false, auditList: payload};
    case GET_AUDIT_DETAILS_ACTION:
      return {...state, loading: false, detailsList: payload};
    case SELECTED_AUDIT_TO_EDIT:
      return {...state, selectedAudit: payload};
    default:
      return state;
  }
};

export default auditReducer;
