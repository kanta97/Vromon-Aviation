import _ from "lodash";
import axios from "axios";
import * as actionTypes from "../../../API";

export const requestBookingHistoryData = (
  pageSize,
  page,
  sorted,
  filtered,
  filter
) => {
  return new Promise((resolve, reject) => {
    //console.log(pageSize)
    //console.log(page)

    let fil = "";
    filtered.map((val) => {
      fil += "&" + val.id + "=" + val.value;
    });

    let offset = pageSize * page;
    let filter = "?limit=" + pageSize + "&offset=" + offset + fil;

    //console.log(filter)

    /*filter = JSON.stringify(filter);
    axios.defaults.headers.common['app_key'] = actionTypes.app_key
    axios.defaults.headers.common['session_token'] = localStorage.getItem('shunka_admin_token')*/

    //axios.get('http://localhost:8085/auth/billboard/3/'+filter.user_id+'/'+filter.client_id+'/'+filter.stand_start_date+'/'+filter.stand_end_date+'/'+filter.is_active+'/'+filter.division+'/'+filter.district+'/'+filter.missing_image+'/'+filter.thana+'/'+pageSize+'/'+offset).then(res => {
    axios.get(actionTypes.BOOKED_PACKAGE_SEARCH + filter).then((res) => {
      let records = 0;
      let filteredData = "";
      if (
        res.data.body.length > 0 &&
        res.data.body.length !== undefined &&
        res.data.body.length !== null &&
        res.data.body.length !== ""
      ) {
        records = res.data.records;
        filteredData = res.data.body;
      }
      //console.log(filteredData);
      // You can use the filters in your request, but you are responsible for applying them.
      /*   if (filtered.length) {
        filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
          return filteredSoFar.filter(row => {
            return (row[nextFilter.id] + "").includes(nextFilter.value);
          });
        }, filteredData);
      }*/
      // You can also use the sorting in your request, but again, you are responsible for applying it.
      const sortedData = _.orderBy(
        filteredData,
        sorted.map((sort) => {
          return (row) => {
            /*if (row[sort.id] === null || row[sort.id] === undefined) {
                return -Infinity;
            }*/
            return typeof row[sort.id] === "string"
              ? row[sort.id].toLowerCase()
              : row[sort.id];
          };
        }),
        sorted.map((d) => (d.desc ? "desc" : "asc"))
      );
      //console.log(sortedData)
      // You must return an object containing the rows of the current page, and optionally the total pages number.
      let resss = {
        rows: sortedData, //.slice(pageSize * page, pageSize * page + pageSize),
        pages: Math.ceil(records / pageSize),
      };
      // Here we'll simulate a server response with 500ms of delay.
      // setTimeout(() => resolve(resss), 500);
      resolve(resss);
    });
  });
};
export const requestHotelBookingHistoryData = (
  pageSize,
  page,
  sorted,
  filtered,
  filter
) => {
  return new Promise((resolve, reject) => {
    let offset = pageSize * page;

    axios.get(actionTypes.HOTEL_BOOKING_HISTORY).then((res) => {
      // console.log(res);
      let records = 0;
      let filteredData = "";
      if (
        res.data.body.data.length > 0 &&
        res.data.body.data.length !== undefined &&
        res.data.body.data.length !== null &&
        res.data.body.data.length !== ""
      ) {
        records = res.data.body.data.length;
        filteredData = res.data.body.data;
      }

      if (filtered.length) {
        filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
          return filteredSoFar.filter((row) => {
            return (row[nextFilter.id] + "").includes(nextFilter.value);
          });
        }, filteredData);
      }
      const sortedData = _.orderBy(
        filteredData,
        sorted.map((sort) => {
          return (row) => {
            return typeof row[sort.id] === "string"
              ? row[sort.id].toLowerCase()
              : row[sort.id];
          };
        }),
        sorted.map((d) => (d.desc ? "desc" : "asc"))
      );
      let resss = {
        rows: sortedData, //.slice(pageSize * page, pageSize * page + pageSize),
        pages: Math.ceil(records / pageSize),
      };

      //console.log(resss, filteredData);

      resolve(resss);
    });
  });
};
