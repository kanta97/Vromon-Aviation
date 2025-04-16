/**
 * Created by Shohanur on 3/21/2019.
 */

/**
 * Created by Shohanur on 3/20/2019.
 */
import axios from 'axios';

import * as actionTypes from './index';

export const addRole  = async(role) =>{
    try {
        var config = {
            headers: {'app_key':  '123456','Content-Type':'application/json','auth_token':localStorage.getItem('_token')}
        };
        // axios.defaults.headers.common['app_key'] = actionTypes.app_key
        //axios.defaults.headers.common['session_token'] = localStorage.getItem('shunka_admin_token')
        return await axios.post('/auth/role/', role,config);
    } catch (err) {
        return err;
    }
}

export const deleteRole  = async(id) =>{
    try {
        var config = {
            headers: {'app_key':  '123456','Content-Type':'application/json','auth_token':localStorage.getItem('_token')},
            data:{'updatedBy':localStorage.getItem('number')}
        };
        //  axios.defaults.headers.common['app_key'] = actionTypes.app_key
        // axios.defaults.headers.common['session_token'] = localStorage.getItem('shunka_admin_token')
        return await axios.delete('/auth/role'+'/'+id,config);
    } catch (err) {
        return err;
    }
}

export const getRole  = async(id) =>{
    try {
        var config = {
            headers: {'app_key':  '123456','Content-Type':'application/json','auth_token':localStorage.getItem('_token')}
        };
        //  axios.defaults.headers.common['app_key'] = actionTypes.app_key
        // axios.defaults.headers.common['session_token'] = localStorage.getItem('shunka_admin_token')
        return await axios.get('/auth/role'+'/'+id,config);
    } catch (err) {
        return err;
    }
}

export const editRole  = async(data,id) =>{
    var config = {
        headers: {'app_key':  '123456','Content-Type':'application/json','auth_token':localStorage.getItem('_token')}
    };
    try {
        console.log('here');
        return await axios.patch('/auth/role'+'/'+id, data,config);
    }
    catch (err) {
        return err;
    }
}
