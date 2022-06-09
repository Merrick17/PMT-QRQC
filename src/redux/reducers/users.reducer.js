import {EDIT_USER_INFO, GET_ALL_USERS, GET_ALL_USERS_SUCCESS} from '../actionTypes';

const usersInitState = {
  loading: false,
  userList: [],
  selectedUser: null,
};
const userReducer = (state = usersInitState, action) => {
  let {type, payload} = action;
  switch (type) {
    case GET_ALL_USERS:
      return {...state, loading: true};
    case GET_ALL_USERS_SUCCESS:
      return {...state, loading: false, userList: payload};
    case EDIT_USER_INFO:
      return {...state, selectedUser: payload};
    default:
      return state;
  }
};

export default userReducer;
