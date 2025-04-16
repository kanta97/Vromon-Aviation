import axios from 'axios';

import * as actionTypes from './index';

export const addFixedPackage = async(fixed_package) =>{
  try {

   /* let data = new FormData();
    data.append('files', fixed_package.files);
    data.append('origin', fixed_package.origin);
    data.append('destination', fixed_package.destination);
    data.append('description', fixed_package.description);
    data.append('start_date', fixed_package.start_date);
    data.append('end_date', fixed_package.end_date);
    data.append('status', fixed_package.status);
    data.append('exclusions', fixed_package.exclusions);
    data.append('itinerary', fixed_package.itinerary);
    data.append('inclusions', fixed_package.inclusions);
    data.append('minimum_number_people', fixed_package.minimum_number_people);
    data.append('isFeatured', fixed_package.isFeatured);
    data.append('price', fixed_package.price);*/
  //  console.log(data)
   /* return (dispatch) => {
      axios.post('/files', data)
        .then(response => dispatch(uploadSuccess(response))
          .catch(error => dispatch(uploadFail(error))
    }*/

    // axios.defaults.headers.common['app_key'] = actionTypes.app_key
    //axios.defaults.headers.common['session_token'] = localStorage.getItem('shunka_admin_token')
    return await axios.post(actionTypes.FIXED_PACKAGE_URL, fixed_package);
  } catch (err) {
    return err;
  }
}

export const deleteFixedPackage  = async(id) =>{
  try {
    //  axios.defaults.headers.common['app_key'] = actionTypes.app_key
    // axios.defaults.headers.common['session_token'] = localStorage.getItem('shunka_admin_token')
    return await axios.delete(actionTypes.FIXED_PACKAGE_URL+'/'+id);
  } catch (err) {
    return err;
  }
}

export const getFixedPackage  = async(id) =>{
  try {
    //  axios.defaults.headers.common['app_key'] = actionTypes.app_key
    // axios.defaults.headers.common['session_token'] = localStorage.getItem('shunka_admin_token')
    return await axios.get(actionTypes.FIXED_PACKAGE_URL+'/'+id);
  } catch (err) {
    return err;
  }
}

export const editFixedPackage = async(data) =>{
  try {
    return await axios.put(actionTypes.FIXED_PACKAGE_URL+'/update', data);
  }
  catch (err) {
    return err;
  }
}

