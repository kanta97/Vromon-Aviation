import * as helper from "../Helpers";
export const isInArray = (value,array) => {
  return array.indexOf(value) > -1
}

export const isBDMobile = (mobile) => {

  let phone_no = /^(?:\+?88)?01[13-9]\d{8}$/;
  if (phone_no.test(mobile)) {
    return true;
  } else {
    return false;
  }
}

export const dateYYYMMDDBar = (date) => {
  let today = new Date(date);
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return  yyyy+ '/' + mm + '/' +  dd;
}

export const dateYYYMMDDHyphens = (date) => {
  let today = new Date(date);
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return  yyyy+ '-' + mm + '-' +  dd;
}
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
export const datetimeYYYMMDDSSHyphens = (date) => {
  let today = new Date(date);
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  let h = addZero(today.getHours());
  let m = addZero(today.getMinutes());
  let s = addZero(today.getSeconds());
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return  yyyy+ '-' + mm + '-' +  dd+' '+h + ":" + m + ":" + s;
}


export const dateMMDDYYYYHyphens = (date) => {
  let today = new Date(date);
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return  mm+ '-' + dd + '-' +  yyyy;
}

export const dateMMDDYYYYBar = (date) => {
  let today = new Date(date);
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return  mm+ '/' + dd + '/' +  yyyy;
}

export const tomorrowDDMMYYYYBar = () => {
  let tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
  let dd = tomorrow.getDate();
  let mm = tomorrow.getMonth() + 1;
  let yyyy = tomorrow.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  console.log(mm+ '/' + dd + '/' +  yyyy)
  let val = mm+ '/' + dd + '/' +  yyyy;
  console.log(val)
  return  val;
}

export const tomorrowYYYYMMDDHyphens = () => {
  let tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
  let dd = tomorrow.getDate();
  let mm = tomorrow.getMonth() + 1;
  let yyyy = tomorrow.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return  yyyy+ '-' + mm + '-' +  dd;;
}

