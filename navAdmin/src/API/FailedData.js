import axios from 'axios';

import * as actionTypes from './index';

export const loadHotelData  = async() =>{
    try {
        // axios.defaults.headers.common['app_key'] = actionTypes.app_key
        //axios.defaults.headers.common['session_token'] = localStorage.getItem('shunka_admin_token')
        return await axios.get(actionTypes.FAILED_HOTEL_URL);
    } catch (err) {
        return err;
    }
}

export const refreshActivityHotel  = async() =>{
    try {
        // axios.defaults.headers.common['app_key'] = actionTypes.app_key
        //axios.defaults.headers.common['session_token'] = localStorage.getItem('shunka_admin_token')
        return await axios.get(actionTypes.FAILED_HOTEL_DETAIL_URL);
    } catch (err) {
        return err;
    }
}

export const loadDestinationData  = async() =>{
    try {
        // axios.defaults.headers.common['app_key'] = actionTypes.app_key
        //axios.defaults.headers.common['session_token'] = localStorage.getItem('shunka_admin_token')
        return await axios.get(actionTypes.FAILED_DESTINATION_URL);
    } catch (err) {
        return err;
    }
}

export const refreshActivityDestination  = async() =>{
    try {
        // axios.defaults.headers.common['app_key'] = actionTypes.app_key
        //axios.defaults.headers.common['session_token'] = localStorage.getItem('shunka_admin_token')
        return await axios.get(actionTypes.FAILED_DESTINATION_DETAIL_URL);
    } catch (err) {
        return err;
    }
}

export const loadCountryData  = async() =>{
    try {
        // axios.defaults.headers.common['app_key'] = actionTypes.app_key
        //axios.defaults.headers.common['session_token'] = localStorage.getItem('shunka_admin_token')
        return await axios.get(actionTypes.FAILED_COUNTRY_URL);
    } catch (err) {
        return err;
    }
}

export const refreshActivityCountry  = async() =>{
    try {
        // axios.defaults.headers.common['app_key'] = actionTypes.app_key
        //axios.defaults.headers.common['session_token'] = localStorage.getItem('shunka_admin_token')
        return await axios.get(actionTypes.FAILED_COUNTRY_DETAIL_URL);
    } catch (err) {
        return err;
    }
}



