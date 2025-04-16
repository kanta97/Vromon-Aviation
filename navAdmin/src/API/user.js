/**
 * Created by Shohanur on 3/20/2019.
 */
import axios from 'axios';
import {toastr} from 'react-redux-toastr';


import * as actionTypes from './index';

export const addUser  = async(user) =>{
    try {var config = {
        headers: {'app_key':  '123456','Content-Type':'application/json','auth_token':localStorage.getItem('_token')}
    };
        // axios.defaults.headers.common['app_key'] = actionTypes.app_key
        //axios.defaults.headers.common['session_token'] = localStorage.getItem('shunka_admin_token')
        return await axios.post('/auth/user/create', user,config);
    } catch (err) {
        return err;
    }
}

export const deleteUser  = async(id) =>{
    try {
        var config = {
            headers: {'app_key':  '123456','Content-Type':'application/json','auth_token':localStorage.getItem('_token')},
            data:{
                'updated_by':localStorage.getItem('number')
            }
        };
        /*var data= {
            'updated_by':localStorage.getItem('number')
        };*/
        //  axios.defaults.headers.common['app_key'] = actionTypes.app_key
        // axios.defaults.headers.common['session_token'] = localStorage.getItem('shunka_admin_token')
        return await axios.delete('/auth/admin/users/'+id,config);
    } catch (err) {
        return err;
    }
}

export const getUser  = async(id) =>{
    try {
        var config = {
            headers: {'app_key':  '123456','Content-Type':'application/json','auth_token':localStorage.getItem('_token')}
        };
        //  axios.defaults.headers.common['app_key'] = actionTypes.app_key
        // axios.defaults.headers.common['session_token'] = localStorage.getItem('shunka_admin_token')
        return await axios.get('/auth/user'+'/'+id,config);
    } catch (err) {
        return err;
    }
}

export const editUser  = async(data,id) =>{
    let toastrOptions = {
        timeOut: 5,
        closeOnToastrClick: true,
    };
    var config = {
        headers: {'app_key':  '123456','Content-Type':'application/json','auth_token':localStorage.getItem('_token')}
    };
    try {

        toastr.success("Profile has been updated",toastrOptions);


        return await axios.patch('/auth/admin/users'+'/'+id, data,config);

    }
    catch (err) {
        toastr.error("Something Went Wrong",toastrOptions);

        return err;
    }
}

export const getAllUser  = async(data) =>{
  /*let config = {
    headers: {'app_key':  '123456','Content-Type':'application/json','auth_token':localStorage.getItem('_token')}
  };*/
  axios.defaults.headers.common['app_key'] = 123456
  axios.defaults.headers.common['auth_token'] = localStorage.getItem('_token')
  try {
    return await axios.get(actionTypes.GET_ALL_USER+'/search?'+ data);
  }
  catch (err) {
    return err;
  }
}

//http://auth.navigatortourism.com:8085/auth/admin/users/search?id=&usernm=debashis&display_name=Debashis Nag&phone_no&user_type&email&service_id=1&role&is_active=1&reference_one&reference_two&createdBy&updatedBy&createdAt=&updatedAt&limit=10&offset=0
