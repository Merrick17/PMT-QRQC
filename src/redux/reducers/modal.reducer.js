import {HIDE_MODAL, SHOW_MODAL} from '../actionTypes';

const modalInitState = {
  showModal: false,
  selectedModal: '',
  data: [],
};
const modalReducer = (state = modalInitState, action) => {
  let {type, payload} = action;
  switch (type) {
    case SHOW_MODAL:
      return {
        ...state,
        showModal: true,
        selectedModal: payload.poste,
        data: payload.data,
      };
    case HIDE_MODAL:
      return {
        ...state,
        showModal: false,
        selectedModal: '',
        data: [],
      };
    default:
      return state;
  }
};
export default modalReducer;
