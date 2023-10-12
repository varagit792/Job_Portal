import * as yup from "yup";

export const PostJobDetailSchema = yup.object().shape({
  title: yup.string().label("Please enter job title").required(),
  department: yup.object().shape({
    value: yup.string().required("Please select role category"),
    label: yup.string().required("Please select role category"),
  }),
  jobsRole: yup.object().shape({
    value: yup.string().required("Please select role"),
    label: yup.string().required("Please select role"),
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
    .min(3, 'Pick at least three location')
    .max(10, 'Pick at most ten location').required("Please select location"),
  jobsType: yup.object().shape({
    value: yup.string().required("Please select job type"),
    label: yup.string().required("Please select job type"),
  }),
  candidateRelocate: yup.boolean().label("Please checked candidate relocation").required(),
  toSalaryRange: yup.object().shape({
    value: yup.string().required("Please select salary"),
    label: yup.string().required("Please select salary"),
  }),
  fromSalaryRange: yup.object().shape({
    value: yup.string().required("Please select salary"),
    label: yup.string().required("Please select salary"),
  }),
  numberSystem: yup.object().shape({
    value: yup.string().required("Please select number system"),
    label: yup.string().required("Please select number system"),
  }),
  recurrence: yup.object().shape({
    value: yup.string().required("Please select recurrence"),
    label: yup.string().required("Please select recurrence"),
  }),
  roleCategory: yup.object().shape({
    value: yup.string().required("Please select role category"),
    label: yup.string().required("Please select role category"),
  }),
  jobsOpening: yup.number().label("Please enter jobs opening").required(),
  currency: yup.object().shape({
    value: yup.string().required("Please select currency"),
    label: yup.string().required("Please select currency"),
  }),
  jobDescription: yup.string().label("Please enter job description").required(),
  keyResponsibility: yup.string().label("Please enter key responsibility").required(),

}).required();


export const RequirementSchema = yup.object().shape({
  keySkills: yup.array()
    .min(2, 'Pick at least two keySkills')
    .max(10, 'Pick at most ten keySkills').required("Please select keySkills"),
  education: yup.array()
    .min(2, 'Pick at least two education')
    .max(10, 'Pick at most ten education').required("Please select education"),
  premiumBTech: yup.boolean().label("Please enter premium BTech").required(),
  premiumMBAAll: yup.boolean().label("Please enter premium MBA").required(),
  fromWorkExperience: yup.object().shape({
    value: yup.string().required("Please select experience"),
    label: yup.string().required("Please select experience"),
  }),
  toWorkExperience: yup.object().shape({
    value: yup.string().required("Please select experience"),
    label: yup.string().required("Please select experience"),
  }),
  candidateIndustry: yup.array()
    .min(2, 'Pick at least two industry')
    .max(10, 'Pick at most ten industry').required("Please select industry"),
  diversityHiring: yup.boolean().label("Please checked diversity hiring").required(),
  jobLocality: yup.array()
    .min(2, 'Pick at least three job locality')
    .max(3, 'Pick at most three job locality').required("Please select job locality"),
  companyType: yup.object().shape({
    value: yup.string().required("Please select industry"),
    label: yup.string().required("Please select industry"),
  }),
}).required();


export const CompanySchema = yup.object().shape({
  companyName: yup.object().shape({
    value: yup.string().required("Please select company"),
    label: yup.string().required("Please select company"),
  }),
  fillCompanyInformation: yup.boolean().label("Please checked fill company information").required(),
  companyWebsite: yup.string().label("Please enter company website").required(),
  aboutCompany: yup.string().label("Please enter about company").required(),
  companyAddress: yup.string().label("Please enter company address").required(),
  hideCompanyRating: yup.boolean().label("Please checked hide company rating").required(),

}).required();


export const RecruiterSchema = yup.object().shape({

  fillCompanyInformation: yup.boolean().label("Please checked fill company information").required(),

}).required();


export const ResponseSchema = yup.object().shape({
  // receiveUpdateOnEmail: yup.array()
  //   .min(1, 'Pick at least one location')
  //   .max(3, 'Pick at most three location').required("Please check at least one"),
  notificationEmailAddress1: yup.string().label("Please enter notification email address 1").required(),
  notificationEmailAddress2: yup.string().label("Please enter notification email address 2").required(),
  hideSalaryDetails: yup.boolean().label("Please checked hide salary details").required(),
  videoProfile: yup.boolean().label("Please checked video profile").required(),
  includeWalkInDetails: yup.boolean().label("Please checked walk-in").required(),
  notifyMeAbout: yup.boolean().label("Please checked notify me").required(),

}).required();



export const PostJobSchema = yup.object().shape({
  title: yup.string().label("Please enter job title").required(),
  jobsType: yup.object().shape({
    value: yup.string().required("Please select employment type"),
    label: yup.string().required("Please select employment type"),
  }),
  employmentType: yup.object().shape({
    value: yup.string().required("Please select employment type"),
    label: yup.string().required("Please select employment type"),
  }),
  keySkills: yup.array()
    .min(2, 'Pick at least two keySkills')
    .max(10, 'Pick at most ten keySkills').required("Please select keySkills"),

  department: yup.object().shape({
    value: yup.string().required("Please select role category"),
    label: yup.string().required("Please select role category"),
  }),
  roleCategory: yup.object().shape({
    value: yup.string().required("Please select role category"),
    label: yup.string().required("Please select role category"),
  }),
  jobsRole: yup.object().shape({
    value: yup.string().required("Please select role"),
    label: yup.string().required("Please select role"),
  }),
  workMode: yup.object().shape({
    value: yup.string().required("Please select work mode"),
    label: yup.string().required("Please select work mode"),
  }),
  jobLocation: yup.array()
    .min(3, 'Pick at least three location')
    .max(10, 'Pick at most ten location').required("Please select location"),

  candidateRelocate: yup.boolean().label("Please checked candidate relocation").required(),
  jobLocality: yup.array()
    .min(2, 'Pick at least three job locality')
    .max(3, 'Pick at most three job locality').required("Please select job locality"),
  fromWorkExperience: yup.object().shape({
    value: yup.string().required("Please select experience"),
    label: yup.string().required("Please select experience"),
  }),
  toWorkExperience: yup.object().shape({
    value: yup.string().required("Please select experience"),
    label: yup.string().required("Please select experience"),
  }),
  currency: yup.object().shape({
    value: yup.string().required("Please select currency"),
    label: yup.string().required("Please select currency"),
  }),
  toSalaryRange: yup.object().shape({
    value: yup.string().required("Please select salary"),
    label: yup.string().required("Please select salary"),
  }),
  fromSalaryRange: yup.object().shape({
    value: yup.string().required("Please select salary"),
    label: yup.string().required("Please select salary"),
  }),
  numberSystem: yup.object().shape({
    value: yup.string().required("Please select number system"),
    label: yup.string().required("Please select number system"),
  }),
  recurrence: yup.object().shape({
    value: yup.string().required("Please select recurrence"),
    label: yup.string().required("Please select recurrence"),
  }),
  hideSalaryDetails: yup.boolean().label("Please checked hide salary details").required(),
  companyType: yup.object().shape({
    value: yup.string().required("Please select industry"),
    label: yup.string().required("Please select industry"),
  }),
  highestQualification: yup.array()
    .min(2, 'Pick at least two education')
    .max(10, 'Pick at most ten education').required("Please select education"),
  premiumBTech: yup.boolean().label("Please enter premium BTech").required(),
  premiumMBAAll: yup.boolean().label("Please enter premium MBA").required(),
  candidateIndustry: yup.array()
    .min(2, 'Pick at least two industry')
    .max(10, 'Pick at most ten industry').required("Please select industry"),
  diversityHiring: yup.boolean().label("Please checked diversity hiring").required(),
  jobDescription: yup.string().label("Please enter job description").required(),
  jobsOpening: yup.number().label("Please enter jobs opening").required(),
  videoProfile: yup.boolean().label("Please checked video profile").required(),
  includeWalkInDetails: yup.boolean().label("Please checked walk-in").required(),
  hideCompanyRating: yup.boolean().label("Please checked hide company rating").required(),
  notifyMeAbout: yup.boolean().label("Please checked notify me").required(),
  notificationEmailAddress1: yup.string().label("Notification email address 1").required(),
  notificationEmailAddress2: yup.string().label("Notification email address 2").required(),
  company: yup.object().shape({
    value: yup.string().required("Please select company"),
    label: yup.string().required("Please select company"),
  }),
  companyWebsite: yup.string().label("Please enter company website").required(),
  keyResponsibility: yup.string().label("Please enter key responsibility").required(),
  aboutCompany: yup.string().label("Please enter about company").required(),
  companyAddress: yup.string().label("Please enter company address").required(),
  // receiveUpdateOnEmail: yup.array()
  //   .min(1, 'Pick at least one location')
  //   .max(3, 'Pick at most three location').required("Please check at least one"),
}).required();