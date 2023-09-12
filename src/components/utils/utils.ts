import axios from "axios";

export const getCourseList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/course/get`).then((res: any) => res.data.data)
}

export const getEducationTypeList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/educationtype/get`).then((res: any) => res.data.data)
}

export const getInstituteList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/universityInstitute/get`).then((res: any) => res.data.data)
}

export const getPassOutYearList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/passOutYear/get`).then((res: any) => res.data.data)
}

export const getTotalYearsExpList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/totalExpYear/get`).then((res: any) => res.data.data)
}

export const getTotalMonthsExpList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/totalExpMonth/get`).then((res: any) => res.data.data)
}

export const getJoiningDateYearList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/joiningDateYear/get`).then((res: any) => res.data.data)
}

export const getJoiningDateMonthList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/joiningDateMonth/get`).then((res: any) => res.data.data)
}

export const getCurrencyList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/currency/get`).then((res: any) => res.data.data)
}

export const getNoticePeriodList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/noticePeriod/get`).then((res: any) => res.data.data)
}

export const getLocationList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/location/get`).then((res: any) => res.data.data)
}

export const getDayList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/days/get`).then((res: any) => res.data.data)
}

export const getMaritalStatusList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/maritalStatus/get`).then((res: any) => res.data.data)
}

export const getCategoryList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/category/get`).then((res: any) => res.data.data)
}

export const getGenderList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/gender/get`).then((res: any) => res.data.data)
}

export const getProficiencyList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/proficiency/get`).then((res: any) => res.data.data)
}
