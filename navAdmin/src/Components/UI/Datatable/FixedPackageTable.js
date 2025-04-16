import _ from "lodash"
import axios from 'axios'
import * as actionTypes from '../../../API'

export const requestFixedPackageData = (pageSize, page, sorted, filtered,filter) => {
  return new Promise((resolve, reject) => {
    let offset = pageSize*page
    axios.get(actionTypes.FIXED_PACKAGE_URL+'/'+pageSize+'/'+offset).then(res => {
      let record = res.data.records;
      //console.log(records);
      let records = 0
      let filteredData = ''
      if(record > 0 && record !== undefined && record !== null && record !== ''){
        records = record;
        filteredData = res.data.body;
      }
      if (filtered.length) {
        filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
          return filteredSoFar.filter(row => {
            return (row[nextFilter.id] + "").includes(nextFilter.value);
          });
        }, filteredData);
      }
      const sortedData = _.orderBy(
        filteredData,
        sorted.map(sort => {
          return row => {
            return typeof row[sort.id] === "string"
              ? row[sort.id].toLowerCase()
              : row[sort.id];
          };
        }),
        sorted.map(d => (d.desc ? "desc" : "asc"))
      );
      let resss = {
        rows: sortedData,
        pages: Math.ceil(records / pageSize)
      };
      resolve(resss)
    });
  });
};


