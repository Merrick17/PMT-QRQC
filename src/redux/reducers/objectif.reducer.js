import {GET_ALL_OBJECTIF, UPDATE_OBJECTIF} from '../actionTypes';

const objectifInitState = {
  loading: false,
  objectifList: [],
  selectedObjectif: null,
};
const objectifReducer = (state = objectifInitState, action) => {
  let {type, payload} = action;
  switch (type) {
    case GET_ALL_OBJECTIF:
      return {...state, objectifList: payload};
    case UPDATE_OBJECTIF:
      return {...state, selectedObjectif: payload};

    default:
      return state;
  }
};
export default objectifReducer;
