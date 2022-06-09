import {LOGIN_USER, LOGIN_USER_SUCCESS} from '../actionTypes';
import {ToastAndroid} from 'react-native';
import {postApi} from '../../utils/apiHelpers';
const loginUser = () => {
  return {
    type: LOGIN_USER,
  };
};

const loginUserSuccess = (token, user) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token: token,
      user: user,
    },
  };
};
export const loginUserApi = (data, navigation, toast) => async dispatch => {
  try {
    console.log('DAAATAAA', data);
    dispatch(loginUser());
    let result = await postApi('user/login', data);
    console.log('Result', result);
    if (result.success) {
      dispatch(loginUserSuccess(result.result.token, result.result.user));
      navigation.replace('Main');
    } else {
      toast.show('Matricule ou mot de passe incorect', {
        type: 'danger',
        placement: 'bottom',
        duration: 4000,
        offset: 30,
        animationType: 'zoom-in',
      });
      // ToastAndroid.showWithGravityAndOffset(
      //   'Matricule ou mot de passe incorect!',
      //   ToastAndroid.LONG,
      //   ToastAndroid.BOTTOM,
      //   25,
      //   50,
      // );
    }
  } catch (error) {
    console.log('Error', error.message);
  }
};
