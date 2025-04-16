import axios from 'axios';

import * as actionTypes from './index';

export const addCoupon  = async(coupon) =>{
  try {
   // axios.defaults.headers.common['app_key'] = actionTypes.app_key
    //axios.defaults.headers.common['session_token'] = localStorage.getItem('shunka_admin_token')
    return await axios.post(actionTypes.COUPON_URL, coupon);
  } catch (err) {
    return err;
  }
}

export const deleteCoupon  = async(id) =>{
  try {
  //  axios.defaults.headers.common['app_key'] = actionTypes.app_key
   // axios.defaults.headers.common['session_token'] = localStorage.getItem('shunka_admin_token')
    return await axios.delete(actionTypes.COUPON_URL+'/'+id);
  } catch (err) {
    return err;
  }
}

export const getCoupon  = async(id) =>{
  try {
  //  axios.defaults.headers.common['app_key'] = actionTypes.app_key
   // axios.defaults.headers.common['session_token'] = localStorage.getItem('shunka_admin_token')

    //http://localhost:3000/promo/search?criteria=status&value=ACTIVE&limit=10&offset=0
    let flt = 'criteria=id&value='+ id;
    return await axios.get(actionTypes.COUPON_URL+'/search?'+flt);
  } catch (err) {
    return err;
  }
}

export const editCoupon  = async(data,id) =>{
  try {
        return await axios.put(actionTypes.COUPON_URL+'/'+id, data);
    }
   catch (err) {
    return err;
  }
}

export const statusCoupon = async (coupon) =>{
  try {
    return await axios.post(actionTypes.COUPON_URL+'/user', coupon);
  } catch (err) {
    return err;
  }
}
