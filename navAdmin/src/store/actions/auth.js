import axios from 'axios'


import { history } from '../history'
/*import { Route, Switch, withRouter, Redirect } from 'react-router-dom'*/
import * as apiTypes from '../../API/index'
import * as actionTypes from './actionTypes'


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId, userRole, userInfo, insertPermission, bulkInsertPermission, searchPermission, editPermission, deletePermission) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId,
        userRole: userRole,
        userInfo: userInfo,
        insertPermission: insertPermission,
        bulkInsertPermission: bulkInsertPermission,
        searchPermission: searchPermission,
        editPermission: editPermission,
        deletePermission: deletePermission
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
  localStorage.removeItem('shunka_admin_token')
  localStorage.removeItem('shunka_admin_userId')
  localStorage.removeItem('shunka_admin_userInfo')
  localStorage.removeItem('shunka_admin_userRole')
  localStorage.removeItem('S_CLIENTS')
  localStorage.removeItem('S_DISTRICT')
  localStorage.removeItem('S_DIVISION')
  localStorage.removeItem('S_UPAZILA')
  localStorage.removeItem('USERS')
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}


export const  auth = (usernm, password) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            usernm: usernm,
            password: password
        }
      axios.defaults.headers.common['app_key'] = '123456'
      axios.defaults.headers.common['Content-Type'] = 'application/json'
      axios.post(apiTypes.ADMIN_LOGIN,authData)
        .then(response => {
          if(response.data.success){
             // let flag = false;
             // let flag1 = false;
              let flag3 = false;
              let i = 0;
              let j = 0;
              let menu_array = [];
              let child_menu_array = [];
              let sub = {};
              let child_sub = {};
              for(i=0; i < response.data.menu.length; i++){
                child_menu_array = [];
                flag3 = false;
                for(j=0; j < response.data.menu.length; j++){
                  if(response.data.menu[i].id === response.data.menu[j].parent_id){
                    flag3 = true;
                    child_sub = {
                      'name': response.data.menu[j].display_menu,
                      'url': '/admin'+response.data.menu[j].menu_path,
                      'icon': response.data.menu[j].menu_icon
                    }
                    child_menu_array.push(child_sub);
                  }
                }

                if(response.data.menu[i].parent_id === 0){
                  if(flag3){
                    sub = {
                      'name': response.data.menu[i].display_menu,
                      'url': '/admin'+response.data.menu[i].menu_path,
                      'icon': response.data.menu[i].menu_icon,
                      'children':child_menu_array
                    }
                    menu_array.push(sub);
                  }
                  else {
                    sub = {
                      'name': response.data.menu[i].display_menu,
                      'url': '/admin'+response.data.menu[i].menu_path,
                      'icon': response.data.menu[i].menu_icon,
                    }
                    menu_array.push(sub);
                  }
                }
              }
            console.log(menu_array)
            let userInfo = {
              usernm: response.data.usernm,
              phone_no: response.data.phone_no,
              display_name: response.data.display_name,
              email: response.data.email,
              user_type: response.data.user_type,
              service_id:response.data.service_id,
              menu_name: response.data.menu,
              menu: menu_array,
              permission:response.data.permission,
            }
            let insertPermission = null;
            let bulkInsertPermission = null;
            let searchPermission = null;
            let editPermission = null;
            let deletePermission = null;
            for(i=0; i < response.data.permission.length; i++){
              if(response.data.permission[i].action_permission === 'insert') {
                insertPermission = response.data.permission[i].action_permission;
              } else if(response.data.permission[i].action_permission === 'search'){
                searchPermission = response.data.permission[i].action_permission;
              } else if(response.data.permission[i].action_permission === 'bulk_insert'){
                bulkInsertPermission = response.data.permission[i].action_permission;
              } else if(response.data.permission[i].action_permission === 'edit'){
                editPermission = response.data.permission[i].action_permission;
              } else if(response.data.permission[i].action_permission === 'delete'){
                deletePermission = response.data.permission[i].action_permission;
              } else {

              }
            }

            localStorage.setItem('shunka_admin_token', response.data.session_token)
            localStorage.setItem('shunka_admin_userId', response.data.userId)
            localStorage.setItem('shunka_admin_userRole', response.data.userRole)
            localStorage.setItem('shunka_admin_userInfo', JSON.stringify(userInfo))
             dispatch(authSuccess(
              response.data.session_token,
              response.data.userId,
              response.data.userRole,
              userInfo,
              insertPermission,
              bulkInsertPermission,
              searchPermission,
              editPermission,
              deletePermission
            ))
            history.push('/admin')
          } else {
            dispatch(authFail(response.data.message))
          }
        })
        .catch(err => {
          dispatch(authFail(err.response))
         })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('shunka_admin_token')
        if (!token) {
            dispatch(logout())
        } else {
          const userId = localStorage.getItem('shunka_admin_userId')
          const userRole = localStorage.getItem('shunka_admin_userRole')
          const userInfo = localStorage.getItem('shunka_admin_userInfo')
          let data = JSON.parse(userInfo);
          let insertPermission = null;
          let bulkInsertPermission = null;
          let searchPermission = null;
          let editPermission = null;
          let deletePermission = null;
          let i = 0;
          for(i=0; i < data.permission.length; i++){
            //console.log(data.permission[i])
            if(data.permission[i].action_permission === 'insert') {
              insertPermission = data.permission[i].action_permission;
            } else if(data.permission[i].action_permission === 'search'){
              searchPermission = data.permission[i].action_permission;
            } else if(data.permission[i].action_permission === 'bulk_insert'){
              bulkInsertPermission = data.permission[i].action_permission;
            } else if(data.permission[i].action_permission === 'edit'){
              editPermission = data.permission[i].action_permission;
            } else if(data.permission[i].action_permission === 'delete'){
              deletePermission = data.permission[i].action_permission;
            } else {

            }
          }
          dispatch(authSuccess(token, userId, userRole, userInfo, insertPermission, bulkInsertPermission, searchPermission, editPermission, deletePermission))
        }
    }
}
