import _ from "lodash"
import axios from 'axios'
import * as actionTypes from '../../../API'

export const requestCouponData = (pageSize, page, sorted, filtered, criteria, value) => {
  return new Promise((resolve, reject) => {
    let flt = ''
    let offset = pageSize*page;
    if(criteria !== '' && value !== ''){
      flt = 'criteria='+criteria+'&value='+ value+'&limit='+pageSize+'&offset='+ offset;
    } else {
      flt = 'limit='+pageSize+'&offset='+ offset;
    }


    axios.get(actionTypes.COUPON_URL+'/search?'+flt).then(res => {

      let record = res.data.records;
      //console.log(records);
      let records = 0
      let filteredData = ''
      if(record > 0 && record !== undefined && record !== null && record !== ''){
        records = record;
        filteredData = res.data.body;
      }
      //console.log(filteredData);
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


