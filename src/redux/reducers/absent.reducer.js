import {GET_ABSENT_INFO, GET_ABSENT_INFO_SUCCESS} from '../actionTypes';

const absentInitState = {
  loading: false,
  data: null,
};

const absentReducer = (state = absentInitState, action) => {
  let {type, payload} = action;
  switch (type) {
    case GET_ABSENT_INFO:
      return {...state, loading: true};
    case GET_ABSENT_INFO_SUCCESS:
      return {...state, loading: false, data: payload};

    default:
      return state;
  }
};

export default absentReducer;
