import axios from 'axios';

import * as actionTypes from './index';
let fs = require('fs');
var path = require('path');
export const addActivity  = async(activity) =>{
  try {
   // axios.defaults.headers.common['app_key'] = actionTypes.app_key
    //axios.defaults.headers.common['session_token'] = localStorage.getItem('shunka_admin_token')
    return await axios.post(actionTypes.ACTIVITY_URL, activity);
  } catch (err) {
    return err;
  }
}

export const deleteActivity  = async(id) =>{
  try {
  //  axios.defaults.headers.common['app_key'] = actionTypes.app_key
   // axios.defaults.headers.common['session_token'] = localStorage.getItem('shunka_admin_token')
    return await axios.delete(actionTypes.ACTIVITY_URL+'/'+id);
  } catch (err) {
    return err;
  }
}

export const getActivity  = async(id) =>{
  try {
  //  axios.defaults.headers.common['app_key'] = actionTypes.app_key
   // axios.defaults.headers.common['session_token'] = localStorage.getItem('shunka_admin_token')
    return await axios.get(actionTypes.ACTIVITY_URL+'/'+id);
  } catch (err) {
    return err;
  }
}

export const editActivity  = async(data,id) =>{
  try {
        return await axios.put(actionTypes.ACTIVITY_URL+'/'+id, data);
    }
   catch (err) {
    return err;
  }
}
