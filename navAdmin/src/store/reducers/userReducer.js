/**
 * Created by Shohanur on 3/17/2019.
 */
import * as actionTypes from "../actions/actionTypes";
import {updateObject} from '../utility';


const initialState = {
    token: null,
    isAuthenticated: false,
    isLoading: false,
    hasErrored: false,
    userInfo:{},
    otp_sent:false,
    otp_sent_error:false,
    opt_match_sent:false,
    password_reset_req_fail:false,
    password_reset_req_sent:false,
    ChangePasswordSuccess:false,


};


const userReducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.PASSWORD_RESET_FAIL:
            return updateObject(state, {
                password_reset_req_fail: action.password_reset_req_fail,
            });

        case actionTypes.PASSWORD_CHANGE_SUCCESS:
            return updateObject(state, {
                ChangePasswordSuccess: action.change_password_req_sent,
            });
        case actionTypes.OTP_SENT_ERROR:
            return updateObject(state, {
                otp_sent_error: action.otp_sent_error,
            });
        case actionTypes.PASSWORD_RESET_REQUEST_SENT:
            return updateObject(state, {
                password_reset_req_sent: action.password_reset_req_sent,
            });
        case actionTypes.OTP_MATCH_ERROR:
            return updateObject(state, {
                opt_match_sent: action.opt_match_sent,
            });
        case actionTypes.IS_AUTHENTICATED:
            return updateObject(state, {
                token: action.token,
            });

        case actionTypes.OTP_SENT:
            return updateObject(state, {
                otp_sent: action.otp_sent,
            });
            return updateObject(state, {
                token: action.token,
            });
        case actionTypes.USER_INFO:
            return updateObject(state, {
                userInfo: action.userinfo,
            });

        case actionTypes.USER_SIGN_IN_HAS_ERROR:
            return updateObject(state, {
                hasErrored: action.hasErrored,

            });
        case actionTypes.USER_SIGN_IN_IS_LOADING:
            return updateObject(state, {
                isLoading: action.isLoading
            });

        case actionTypes.USER_LOGOUT:
            return updateObject(state, {
                token: null
            });
        case actionTypes.CHECK_AUTHENTICATION:
            return updateObject(state, {
                isAuthenticated: action.isAuthenticated
            });


        default:
            return state;
    }
};

export default userReducer;

