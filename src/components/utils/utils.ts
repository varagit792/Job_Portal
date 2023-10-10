import axios from "axios";

export const getCourseList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/course/get`).then((res: any) => res.data.data)
}

export const getEducationTypeList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/educationtype/get`).then((res: any) => res.data.data)
}

export const getBoardList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/board/get`).then((res: any) => res.data.data)
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

export const getCompanyList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/company/get`).then((res: any) => res.data.data)
}

export const getjobTitleList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/jobTitle/get`).then((res: any) => res.data.data)
}

export const getDepartmentList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/department/get`).then((res: any) => res.data.data)
}

export const getEmployeeTypeList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/employeeType/get`).then((res: any) => res.data.data)
}

export const getKeySkillsList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/keySkills/get`).then((res: any) => res.data.data)
}

export const getRoleCategoryList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/roleCategory/get`).then((res: any) => res.data.data)
}

export const getJobRoleList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/jobRole/get`).then((res: any) => res.data.data)
}

export const getWorkModeList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/workMode/get`).then((res: any) => res.data.data)
}

export const getLocalityList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/locality/get`).then((res: any) => res.data.data)
}

export const getSalaryRangeList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/salaryRange/get`).then((res: any) => res.data.data)
}

export const getNumberSystemList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/numberSystem/get`).then((res: any) => res.data.data)
}

export const getRecurrenceList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/recurrence/get`).then((res: any) => res.data.data)
}

export const getIndustryList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/industry/get`).then((res: any) => res.data.data)
}

export const getHighestQualificationList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/highestQualification/get`).then((res: any) => res.data.data)
}

export const getCompanyTypeList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/companyType/get`).then((res: any) => res.data.data)
}

export const calculateWorkedTime = (startYear: any, startMonth: any) => {
  const months: any = [
    'Jan', 'Feb', 'Mar', 'Apr',
    'May', 'June', 'July', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const today = new Date();
  const startDate = new Date(startYear, months.indexOf(startMonth) - 1); // Note that months are 0-indexed in JavaScript

  let yearDiff = today.getFullYear() - startDate.getFullYear();
  let monthDiff = today.getMonth() - startDate.getMonth();

  if (monthDiff < 0) {
    yearDiff--;
    monthDiff += 12;
  }

  return { years: yearDiff, months: monthDiff };
}

