import {getApi} from '../../utils/apiHelpers';
import {SHOW_MODAL} from '../actionTypes';

export const getPosteHistoryApi = poste => async dispatch => {
  try {
    let result = await getApi(`prod/trs/month/${poste}`);
    console.log('result', result);
    if (result) {
      dispatch({
        type: SHOW_MODAL,
        payload: {
          poste: poste,
          data: result.trs,
        },
      });
    }
  } catch (error) {
    console.log('error', error.message);
  }
};
