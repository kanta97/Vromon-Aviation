import axios from 'axios';

import * as actionTypes from './index';

export const addHotel = async(hotel) =>{
  try {
   // axios.defaults.headers.common['app_key'] = actionTypes.app_key
    //axios.defaults.headers.common['session_token'] = localStorage.getItem('shunka_admin_token')
    return await axios.post(actionTypes.HOTEL_URL, hotel);
  } catch (err) {
    return err;
  }
}

export const deleteHotel  = async(id) =>{
  try {
  //  axios.defaults.headers.common['app_key'] = actionTypes.app_key
   // axios.defaults.headers.common['session_token'] = localStorage.getItem('shunka_admin_token')
    return await axios.delete(actionTypes.HOTEL_URL+'/'+id);
  } catch (err) {
    return err;
  }
}

export const getHotel  = async(id) =>{
  try {
  //  axios.defaults.headers.common['app_key'] = actionTypes.app_key
   // axios.defaults.headers.common['session_token'] = localStorage.getItem('shunka_admin_token')
    return await axios.get(actionTypes.HOTEL_URL+'/'+id);
  } catch (err) {
    return err;
  }
}
export const getAllHotel  = async() =>{
  try {
    //  axios.defaults.headers.common['app_key'] = actionTypes.app_key
    // axios.defaults.headers.common['session_token'] = localStorage.getItem('shunka_admin_token')
    return await axios.get(actionTypes.HOTEL_URL_S);
  } catch (err) {
    return err;
  }
}

export const editHotel = async(data,id) =>{
  try {
        return await axios.put(actionTypes.HOTEL_URL+'/'+id, data);
    }
   catch (err) {
    return err;
  }
}

