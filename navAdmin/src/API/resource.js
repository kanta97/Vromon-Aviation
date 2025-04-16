import axios from 'axios';

import * as actionTypes from './index';

export const tourType =() =>{
  return new Promise((resolve, reject) => {
    axios.get(actionTypes.TOUR_TYPE_URL)
      .then((response) => {
        console.log(response.data.status)
        if (response.data.status === '200') {
          localStorage.setItem('tour_type', JSON.stringify(response.data.body));
          resolve(response.data.body)
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const loadtourTypeSession = () =>{
  let type = localStorage.getItem('tour_type')
  if(type !== '' && type !== null && type !== undefined && type.length > 0){
    return JSON.parse(type)
  } else {
    return new Promise((resolve, reject) => {
      actionTypes.tourType()
        .then((response) => {
          if (response) {
            resolve(response)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

/*function formatTourType(data){
  let optionValue = []
  let option = {}
  if(data !== ''){
    option = {
      value: '',
      label: 'Select Tour Type'
    }
    optionValue.push(option)

    data.map( (item,i) =>{
      option = {
        value: item.tour_type,
        label: item.tour_type
      }
      optionValue.push(option)
    })
    return optionValue
  }
}*/
