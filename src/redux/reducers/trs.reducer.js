import {
  GET_TEMPS_EFFICIENT,
  GET_TEMPS_EFFICIENT_SUCCESS,
  GET_TRS_INFO,
  GET_TRS_INFO_SUCCESS,
} from '../actionTypes';

const TRSInitState = {
  loading: false,
  data: [],
};
const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
const trsReducer = (state = TRSInitState, action) => {
  let {type, payload} = action;
  switch (type) {
    case GET_TRS_INFO:
      return {...state, loading: true};
    case GET_TRS_INFO_SUCCESS:
      return {...state, loading: false, data: payload};
   
    default:
      return state;
  }
};

export default trsReducer;
