import _ from "lodash"
import axios from 'axios'
import * as actionTypes from '../../../API'

export const requestActivityData = (pageSize, page, sorted, filtered,filter) => {
  return new Promise((resolve, reject) => {

    let offset = pageSize*page;
    /*if(filter.hasOwnProperty('offset')){
      filter['offset'] = offset;
    } else {
      filter['offset'] = '';
    }
    if(filter.hasOwnProperty('limit')){
      filter['limit'] = pageSize;
    } else {
      filter['limit'] = '';
    }*/
    //console.log(filter)

    /*filter = JSON.stringify(filter);
    axios.defaults.headers.common['app_key'] = actionTypes.app_key
    axios.defaults.headers.common['session_token'] = localStorage.getItem('shunka_admin_token')*/

    //axios.get('http://localhost:8085/auth/billboard/3/'+filter.user_id+'/'+filter.client_id+'/'+filter.stand_start_date+'/'+filter.stand_end_date+'/'+filter.is_active+'/'+filter.division+'/'+filter.district+'/'+filter.missing_image+'/'+filter.thana+'/'+pageSize+'/'+offset).then(res => {
    let filter = '/'+pageSize+ '/'+offset
    //console.log(actionTypes.GET_ALL_ACTIVITY_URL)
    axios.get(actionTypes.GET_ALL_ACTIVITY_URL+filter).then(res => {

      let records = 0
      let filteredData = ''
      if(res.data.body.length > 0 && res.data.body.length !== undefined && res.data.body.length !== null && res.data.body.length !== ''){
        records = res.data.body.length;
        filteredData = res.data.body;
      }

     // console.log(filteredData);
      // You can use the filters in your request, but you are responsible for applying them.
      if (filtered.length) {
        filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
          return filteredSoFar.filter(row => {
            return (row[nextFilter.id] + "").includes(nextFilter.value);
          });
        }, filteredData);
      }
      // You can also use the sorting in your request, but again, you are responsible for applying it.
      const sortedData = _.orderBy(
        filteredData,
        sorted.map(sort => {
          return row => {
            /*if (row[sort.id] === null || row[sort.id] === undefined) {
                return -Infinity;
            }*/
            return typeof row[sort.id] === "string"
              ? row[sort.id].toLowerCase()
              : row[sort.id];
          };
        }),
        sorted.map(d => (d.desc ? "desc" : "asc"))
      );
      //console.log(sortedData)
      // You must return an object containing the rows of the current page, and optionally the total pages number.
      let resss = {
        rows: sortedData,//.slice(pageSize * page, pageSize * page + pageSize),
        pages: Math.ceil(records / pageSize)
      };
      // Here we'll simulate a server response with 500ms of delay.
      // setTimeout(() => resolve(resss), 500);
      resolve(resss)
    });
  });
};


