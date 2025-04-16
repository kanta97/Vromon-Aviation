/**
 * Created by Shohanur on 3/21/2019.
 */
/**
 * Created by Shohanur on 3/20/2019.
 */
import _ from "lodash"
import axios from 'axios'
import * as actionTypes from '../../../API'
export const requestRoleData = (pageSize, page, sorted, filtered,filter) => {
    return new Promise((resolve, reject) => {
        var config = {
            headers: {'app_key':  '123456','Content-Type':'application/json','auth_token':localStorage.getItem('_token')}
        };

        axios.get(actionTypes.ROLE_INFO_URL,config ).then(res => {

          let record = res.data.data.length;

          let records = 0
          let filteredData = ''
          if(record > 0 && record !== undefined && record !== null && record !== ''){
            records = record;
            filteredData = res.data.data;
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

