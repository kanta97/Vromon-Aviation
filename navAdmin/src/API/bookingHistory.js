import axios from 'axios';

import * as actionTypes from './index';

export const changeStatus = async(change) =>{
  try {
    // axios.defaults.headers.common['app_key'] = actionTypes.app_key
    //axios.defaults.headers.common['session_token'] = localStorage.getItem('shunka_admin_token')
    return await axios.put(actionTypes.BOOKED_PACKAGE_STATUS_CHANGE, change);
  } catch (err) {
    return err;
  }
}

export const viewLog  = async(log) =>{
  try {
    //  axios.defaults.headers.common['app_key'] = actionTypes.app_key
    // axios.defaults.headers.common['session_token'] = localStorage.getItem('shunka_admin_token')
    return await axios.get(actionTypes.HOTEL_URL+'/'+log);
  } catch (err) {
    return err;
  }
}
