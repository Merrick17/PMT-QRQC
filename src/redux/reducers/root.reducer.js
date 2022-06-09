import {combineReducers} from 'redux';

import trsReducer from './trs.reducer';
import rebusReducer from './rebus.reducer';
import modalReducer from './modal.reducer';
import trsGlobalReducer from './trsglobal.reducer';
import absentReducer from './absent.reducer';
import userReducer from './users.reducer';
import QrQcReducer from './qrqc.reducer';
import auditReducer from './audit.reducer';
import authReducer from './auth.reducer';
import alertReducer from './alert.reducer';
import objectifReducer from './objectif.reducer';
const rootReducer = combineReducers({
  trs: trsReducer,
  rebus: rebusReducer,
  modal: modalReducer,
  trsGlobal: trsGlobalReducer,
  absent: absentReducer,
  users: userReducer,
  qrqc: QrQcReducer,
  audit: auditReducer,
  auth: authReducer,
  alert: alertReducer,
  objectif: objectifReducer,
});

export default rootReducer;
