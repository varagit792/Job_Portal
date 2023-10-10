export interface IFormInputsPostAJob {
  title: string
  jobsType: { value: string; label: string; }
  keySkills: string[]
  department: { value: string; label: string; }
  roleCategory: { value: string; label: string; }
  jobsRole: { value: string; label: string; }
  workMode: { value: string; label: string; }
  jobLocation: string[]
  candidateRelocate: boolean
  jobLocality: string[]
  fromWorkExperience: { value: string; label: string; }
  toWorkExperience: { value: string; label: string; }
  currency: { value: string; label: string; }
  toSalaryRange: { value: string; label: string; }
  fromSalaryRange: { value: string; label: string; }
  numberSystem: { value: string; label: string; }
  recurrence: { value: string; label: string; }
  hideSalaryDetails: boolean
  companyIndustry: { value: string; label: string; }
  highestQualification: string[]
  premiumBTech: boolean
  premiumMBAAll: boolean
  candidateIndustry: string[]
  diversityHiring: boolean
  jobDescription: string
  jobsOpening: number
  videoProfile: boolean
  includeWalkInDetails: boolean
  notifyMeAbout: boolean
  hideCompanyRating: boolean
  notificationEmailAddress1: string
  notificationEmailAddress2: string
  keyResponsibility: string
  fillCompanyInformation: boolean
  company: { value: string; label: string; }
  companyWebsite: string
  aboutCompany: string
  companyAddress: string

}

export interface PostJobUpdate {
  id: number | null
  title: string
  jobsKeySkills: {
    preferred: boolean,
    keySkills: {
      id: string
    }
  }[]

  department: string;
  roleCategory: string;
  jobsRole: string;
  jobsType: string;
  workMode: string;
  jobsLocation: { location: string; }[]
  candidateRelocate: boolean
  jobLocality: { locality: { id: string; } }[]
  totalExpYearStart: string;
  totalExpYearEnd: string;
  numberSystem: string;
  recurrence: string;
  currency: string;
  keyResponsibility: string
  fillCompanyInformation: boolean
  payScaleUpperRange: string;
  payScaleLowerRange: string;
  hideSalaryDetails: boolean
  companyIndustry: string;
  jobEducation: { education: { id: string }; }[]
  premiumBTech: boolean
  hideCompanyRating: boolean
  premiumMBAAll: boolean
  jobCandidateIndustry: { candidateIndustry: { id: string; } }[]
  diversityHiring: boolean
  jobDescription: string
  jobsOpening: number
  userType: string
  videoProfile: boolean
  includeWalkInDetails: boolean
  notifyMeAbout: boolean
  notificationEmailAddress1: string
  notificationEmailAddress2: string
  company: string
  companyWebsite: string
  aboutCompany: string
  companyAddress: string
  user: string
  status: boolean
}