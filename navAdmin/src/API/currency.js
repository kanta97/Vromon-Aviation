import axios from 'axios';
import {toastr} from 'react-redux-toastr';


import * as actionTypes from './index';
let fs = require('fs');
var path = require('path');
export const addCurrency  = async(currency) =>{

  try {
    currency.updatedBy="bene";
   // axios.defaults.headers.common['app_key'] = actionTypes.app_key
    //axios.defaults.headers.common['session_token'] = localStorage.getItem('shunka_admin_token')
    return await axios.post(actionTypes.CURRENCY_URL, currency);
  } catch (err) {
    return err;
  }
}

export const deleteCurrency  = async(id) =>{
  try {
  //  axios.defaults.headers.common['app_key'] = actionTypes.app_key
   // axios.defaults.headers.common['session_token'] = localStorage.getItem('shunka_admin_token')
    return await axios.delete(actionTypes.CURRENCY_URL+'/'+id);
  } catch (err) {
    return err;
  }
}

export const getCurrency  = async(id) =>{
  try {
  //  axios.defaults.headers.common['app_key'] = actionTypes.app_key
   // axios.defaults.headers.common['session_token'] = localStorage.getItem('shunka_admin_token')
    return await axios.get(actionTypes.CURRENCY_URL+'/'+id);
  } catch (err) {
    return err;
  }
}

export const editCurrency  = async(data,id) =>{
    let toastrOptions = {
        timeOut: 5,
        closeOnToastrClick: true,
    };
    var config = {
        headers: {'app_key':  '123456','Content-Type':'application/json','auth_token':localStorage.getItem('_token')}
    };
    try {

        toastr.success("Currency has been updated",toastrOptions);


        return await axios.patch('/auth/admin/currency'+'/'+id, data,config);

    }
    catch (err) {
        toastr.error("Something Went Wrong",toastrOptions);

        return err;
    }
}
