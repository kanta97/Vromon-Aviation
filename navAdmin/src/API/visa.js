import axios from "axios";

import * as actionTypes from "./index";

export const getAllVisa = async () => {
  try {
    return await axios.get(actionTypes.GET_ALL_VISA_DOC);
  } catch (err) {
    return err;
  }
};

export const addVisa = async (visa) => {
  try {
    return await axios.post(actionTypes.GET_ALL_VISA_DOC, visa);
  } catch (err) {
    return err;
  }
};

export const getVisa = async (id) => {
  try {
    return await axios.get(actionTypes.GET_ALL_VISA_DOC + "/" + id);
  } catch (err) {
    return err;
  }
};

export const editVisa = async (id, data) => {
  try {
    return await axios.put(actionTypes.GET_ALL_VISA_DOC + "/" + id, data);
  } catch (err) {
    return err;
  }
};

export const deleteVisa = async (id) => {
  try {
    return await axios.delete(actionTypes.GET_ALL_VISA_DOC + "/" + id);
  } catch (err) {
    return err;
  }
};
