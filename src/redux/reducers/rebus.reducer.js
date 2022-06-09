import {GET_REBUS_INFO, GET_REBUS_INFO_SUCCESS} from '../actionTypes';

const RebusInitState = {
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
const rebusReducer = (state = RebusInitState, action) => {
  let {type, payload} = action;
  switch (type) {
    case GET_REBUS_INFO:
      return {...state, loading: true};
    case GET_REBUS_INFO_SUCCESS:
      return {...state, loading: false, data: payload};
    default:
      return state;
  }
};

export default rebusReducer;
