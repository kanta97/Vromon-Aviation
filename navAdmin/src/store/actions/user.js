/**
 * Created by Shohanur on 3/17/2019.
 */
import * as actionTypes from "./actionTypes";
import axios from 'axios';

import {toastr} from 'react-redux-toastr';
let toastrOptions = {
    timeOut: 40,
    closeOnToastrClick: true,
};




export const signInActionCreator = (mobileNoOrEmail, password) => {
    return (dispatch) => {



        const userData = {
            usernm: mobileNoOrEmail,
            password: password
        };

        let url = '/auth/user/login';

        axios.post(url,userData, {headers: {'app_key': '123456','Content-Type':'application/json'}} )
            .then(response => {
                console.log(response);
                dispatch(signInIsLoading(false));
                if (response.status === 200) {
                    if (response.data.success){
                        toastr.success("Login Successful", toastrOptions);
                        dispatch(userinfo(response.data));
                        let token = response.data.auth_token;
                        localStorage.setItem("_token", token);
                        localStorage.setItem("usnm",response.data.display_name);
                        localStorage.setItem("email",response.data.email);
                        localStorage.setItem("phn",response.data.phone_no);
                        localStorage.setItem("number",response.data.userId);
                        localStorage.setItem("userRole",response.data.userRole);



                        dispatch(signInSuccess(token));
                    }
                    else{
                        toastr.error("Invalid user credentials", toastrOptions);

                        dispatch(signInHasErrored(true));
                    }

                   /* dispatch(getUserInfoByTokenActionCreator(token));*/
                } else {
                    toastr.error("Something went wrong. Try again later", toastrOptions);

                    dispatch(signInHasErrored(true));
                  /*  dispatch(signUpErrors(response.data.message));*/
                }

               /* dispatch(checkAuthenticationActionCreator());*/


            })
            .catch(err => {
                toastr.error("Something went wrong. Try again later", toastrOptions);

                dispatch(signInIsLoading(false));
                dispatch(signInHasErrored(true));
                //dispatch(signUpErrors("Could not connect to the network"));
               /* dispatch(signUpErrors(err.response.data.message));
                toastr.error(err.response.data.message, toastrOptions);
                dispatch(checkAuthenticationActionCreator());*!/*/
            });


    };
};

export const forgotPasswordActionCreator = (mobileNoOrUsername)=>{
    return (dispatch) => {



        const userData = {
            mobile: mobileNoOrUsername,

        };
        let url = '/auth/forgot/get-otp';
        localStorage.setItem("otp_mobile_number",userData.mobile);
        axios.post(url,userData, {headers: {'app_key': '123456','Content-Type':'application/json'}} )
            .then(response => {

                if (response.status === 200) {

                    if (response.data.success){
                        toastr.success("Otp has been sent to your mobile nuumber", toastrOptions);

                        dispatch(otp_sent(true));


                    }
                    else{
                        toastr.success("Otp doesn't sent ", toastrOptions);


                        dispatch(otp_sent_error(true));
                        localStorage.removeItem('otp_mobile_number')
                    }

                    /* dispatch(getUserInfoByTokenActionCreator(token));*/
                } else {
                    toastr.error("Something went wrong", toastrOptions);

                    dispatch(otp_sent_error(true));
                    /*  dispatch(signUpErrors(response.data.message));*/
                }

                /* dispatch(checkAuthenticationActionCreator());*/


            })
            .catch(err => {
                toastr.error("Something went wrong", toastrOptions);


                //dispatch(signUpErrors("Could not connect to the network"));
                /* dispatch(signUpErrors(err.response.data.message));
                 toastr.error(err.response.data.message, toastrOptions);
                 dispatch(checkAuthenticationActionCreator());*!/*/
            });


    };

};
export const otp_matchActionCreator = (otp)=>{
    return (dispatch) => {

      const userData = {
            mobile: localStorage.getItem('otp_mobile_number'),
            v_code:otp

        };
      console.log(userData);
        let url = '/auth/forgot/match-otp';

        axios.post(url,userData, {headers: {'app_key': '123456','Content-Type':'application/json'}} )
            .then(response => {

                if (response.status === 200) {

                    if (!response.data.success){
                        let token = response.data.auth_token;
                        if(token !==''){
                            localStorage.setItem("_token", token);
                        }

                        dispatch(otp_match_sent(true));

      }
                    else{
                        dispatch(otp_match_sent(false));

                        localStorage.removeItem('otp_mobile_number')
                    }

                } else {
                    dispatch(otp_match_sent(false));
                    /*  dispatch(signUpErrors(response.data.message));*/
                }

                /* dispatch(checkAuthenticationActionCreator());*/


            })
            .catch(err => {


            });


    };

};


export const NewPasswordActionCreator = (new_password)=>{
    return (dispatch) => {

        let token = localStorage.getItem('_token');
        const userData = {
            password: new_password


        };
        console.log(userData);
        let url = '/auth/forgot/reset-pass';

        axios.post(url,userData, {headers: {'app_key': '123456','Content-Type':'application/json','auth_token':token}} )
            .then(response => {

                if (response.status === 200) {

                    if (response.data.success){
                        toastr.success("Password has been Changed", toastrOptions);

                        dispatch(password_changed(true));

                    }
                    else{
                        toastr.error("Password has not been Changed", toastrOptions);

                        dispatch(password_changed_fail(true));

                        localStorage.removeItem('auth_token')
                    }

                } else {
                    toastr.error("Something went wrong", toastrOptions);

                    dispatch(password_changed(false));
                    /*  dispatch(signUpErrors(response.data.message));*/
                }

                /* dispatch(checkAuthenticationActionCreator());*/


            })
            .catch(err => {
                toastr.error("Something went wrong", toastrOptions);



            });


    };

};
export const ChangepasswordActionCreator = (old_password, new_password) => {
    return (dispatch) => {

        const userData = {
            old_password: old_password,
            new_password: new_password
        };

        let url = '/auth/user/change-password';

        axios.post(url,userData, {headers: {'app_key': '123456','Content-Type':'application/json','auth_token':localStorage.getItem("_token")}} )
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data);
                    if (response.data.success){
                        toastr.success("Password has been changed", toastrOptions);


                        dispatch(ChangePasswordSuccess(true));
                    }
                    else{
                        toastr.error("Password has not been changed", toastrOptions);

                        dispatch(ChangePasswordSuccess(false));
                    }

                    /* dispatch(getUserInfoByTokenActionCreator(token));*/
                } else {
                    toastr.error("Something went wrong", toastrOptions);

                    dispatch(ChangePasswordSuccess(false));
                    /*  dispatch(signUpErrors(response.data.message));*/
                }

                /* dispatch(checkAuthenticationActionCreator());*/


            })
            .catch(err => {
                toastr.error("Something went wrong", toastrOptions);

                dispatch(signInIsLoading(false));
                dispatch(signInHasErrored(true));
                //dispatch(signUpErrors("Could not connect to the network"));
                /* dispatch(signUpErrors(err.response.data.message));
                 toastr.error(err.response.data.message, toastrOptions);
                 dispatch(checkAuthenticationActionCreator());*!/*/
            });


    };
};

export function ChangePasswordSuccess(bool) {

    return {
        type: actionTypes.PASSWORD_CHANGE_SUCCESS,
        change_password_req_sent:bool
    };
};

export function password_changed(bool) {

    return {
        type: actionTypes.PASSWORD_RESET_REQUEST_SENT,
        password_reset_req_sent:bool
    };
};
export function password_changed_fail(bool) {

    return {
        type: actionTypes.PASSWORD_RESET_FAIL,
        password_reset_req_fail:bool
    };
};


export function otp_match_sent(bool) {

    return {
        type: actionTypes.OTP_MATCH_ERROR,
        opt_match_sent:bool
    };
};
export function otp_sent_error(bool) {

    return {
        type: actionTypes.OTP_SENT_ERROR,
        otp_sent_error:bool
    };
};
export const logout = () => {
    localStorage.removeItem('_token')

    return {
        type: actionTypes.AUTH_LOGOUT
    }
}
export function signInSuccess(token) {

    return {
        type: actionTypes.IS_AUTHENTICATED,
        token
    };
};
export function otp_sent(bool) {

    return {
        type: actionTypes.OTP_SENT,
        otp_sent:bool
    };
};
export function userinfo(user) {

    return {
        type: actionTypes.USER_INFO,
        userinfo:user
    };
};
export const signInHasErrored = (bool) => {
    return {
        type: actionTypes.USER_SIGN_IN_HAS_ERROR,
        hasErrored: bool
    };
};
export const signInIsLoading = (bool) => {
    return {
        type: actionTypes.USER_SIGN_IN_IS_LOADING,
        isLoading: bool
    };


};




