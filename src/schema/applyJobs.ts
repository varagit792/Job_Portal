import * as yup from "yup";

export const applyJobsSchema = yup.object().shape({
  title: yup.string().label("Please enter job title").required(),
  department: yup.object().shape({
    value: yup.string().required("Please select role category"),
    label: yup.string().required("Please select role category"),
  }),
  jobsRole: yup.object().shape({
    value: yup.string().required("Please select job role"),
    label: yup.string().required("Please select job role"),
  }),
  employmentType: yup.object().shape({
    value: yup.string().required("Please select employment type"),
    label: yup.string().required("Please select employment type"),
  }),
  workMode: yup.object().shape({
    value: yup.string().required("Please select work mode"),
    label: yup.string().required("Please select work mode"),
  }),
  jobLocation: yup.array()
    .min(1, 'Pick at least one location')
    .max(3, 'Pick at most three location').required("Please select location"),
  jobsType: yup.object().shape({
    value: yup.string().required("Please select job type"),
    label: yup.string().required("Please select job type"),
  }),
  candidateRelocate: yup.boolean().default(false),
  toSalaryRange: yup.object().shape({
    value: yup.string().required("Salary last range"),
    label: yup.string().required("Salary last range"),
  }),
  fromSalaryRange: yup.object().shape({
    value: yup.string().required("Salary start range"),
    label: yup.string().required("Salary start range"),
  }),
  numberSystem: yup.object().shape({
    value: yup.string().required("Number system"),
    label: yup.string().required("Number system"),
  }),
  recurrence: yup.object().shape({
    value: yup.string().required("Recurrence"),
    label: yup.string().required("Recurrence"),
  }),
  jobExpiry: yup.object().shape({
    value: yup.number().required("Please select job expiry"),
    label: yup.string().required("Please select job expiry"),
  }),
  jobStatus: yup.object().shape({
    value: yup.number().required("Please select job status"),
    label: yup.string().required("Please select job status"),
  }),
  roleCategory: yup.object().shape({
    value: yup.string().required("Please select role category"),
    label: yup.string().required("Please select role category"),
  }),
  jobsOpening: yup.number().label("Please enter jobs opening").required(),
  currency: yup.object().shape({
    value: yup.string().required("Currency"),
    label: yup.string().required("Currency"),
  }),
  jobDescription: yup.string().label("Please enter job description").required().test(
    'len', 'Minimum 200 characters are required',
    (data) => {
      if (data?.length < 200) {
        return false
      } else {
        return true
      }
    }
  ),
  keyResponsibility: yup.string().label("Please enter key responsibility").required().test(
    'len', 'Minimum 200 characters are required',
    (data) => {
      if (data?.length < 200) {
        return false
      } else {
        return true
      }
    }
  ),

}).required();