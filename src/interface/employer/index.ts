export interface IFormInputsJobDetail {
  title: string
  department: { value: string; label: string; }
  jobsRole: { value: string; label: string; }
  employmentType: { value: string; label: string; }
  workMode: { value: string; label: string; }
  jobLocation: string[]
  jobsType: { value: string; label: string; }
  candidateRelocate: boolean
  currency: { value: string; label: string; }
  toSalaryRange: { value: string; label: string; }
  fromSalaryRange: { value: string; label: string; }
  numberSystem: { value: string; label: string; }
  recurrence: { value: string; label: string; }
  roleCategory: { value: string; label: string; }
  jobDescription: string
  jobsOpening: number
  keyResponsibility: string

}

export interface IFormInputsRequirement {

  keySkills: string[]
  education: string[]
  premiumBTech: boolean
  premiumMBAAll: boolean
  fromWorkExperience: { value: string; label: string; }
  toWorkExperience: { value: string; label: string; }
  candidateIndustry: string[]
  diversityHiring: boolean
  jobLocality: string[]
  companyType: { value: string; label: string; }

}

export interface IFormInputsResponse {
  hideSalaryDetails: boolean
  videoProfile: boolean
  includeWalkInDetails: boolean
  notifyMeAbout: boolean
  notificationEmailAddress1: string
  notificationEmailAddress2: string
}

export interface IFormInputsCompany {
  companyName: { value: string; label: string; }
  companyWebsite: string
  aboutCompany: string
  companyAddress: string
  hideCompanyRating: boolean
  fillCompanyInformation: boolean
}

export interface IFormInputsRecruiter {
  fillCompanyInformation: boolean
}


export interface IFormInputsResponse {
  //receiveUpdateOnEmail: string[]
  notificationEmailAddress1: string
  notificationEmailAddress2: string
  hideSalaryDetails: boolean
  videoProfile: boolean
  includeWalkInDetails: boolean
  notifyMeAbout: boolean

}



export interface IFormInputsPostAJob {
  title: string
  jobsType: { value: string; label: string; }
  employmentType: { value: string; label: string; }
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
  companyType: { value: string; label: string; }
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
  company: { value: string; label: string; }
  companyWebsite: string
  aboutCompany: string
  companyAddress: string
  // receiveUpdateOnEmail: string[]

}

export interface IFormInputsRequirementDraft {
  title: string
  jobsType: { value: string; label: string; }
  employmentType: { value: string; label: string; }
  keySkills: string[]
  education: string[]
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
  companyType: { value: string; label: string; }
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
  company: { value: string; label: string; }
  companyWebsite: string
  aboutCompany: string
  companyAddress: string
  // receiveUpdateOnEmail: string[]

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
  employmentType: string
  payScaleUpperRange: string;
  payScaleLowerRange: string;
  hideSalaryDetails: boolean
  companyType: string;
  jobEducation: { education: { id: string }; }[]
  premiumBTech: boolean
  hideCompanyRating: boolean
  isDraft: boolean
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
  company: string | null
  companyWebsite: string
  aboutCompany: string
  companyAddress: string
  user: string
  status: boolean

}



export interface IFormInputsJobDetailDraft {
  title: string
  jobsType: { value: string; label: string; }
  employmentType: { value: string; label: string; }
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
  companyType: { value: string; label: string; }
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
  totalExpYearStart: string | null;
  totalExpYearEnd: string | null;
  notificationEmailAddress1: string
  notificationEmailAddress2: string
  keyResponsibility: string
  company: { value: string; label: string; }
  companyWebsite: string
  aboutCompany: string
  companyAddress: string
  // receiveUpdateOnEmail: string[]

}


export interface PostJobDetailDraft {
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
  jobsLocation: { location: { id: string; } }[]
  candidateRelocate: boolean
  jobLocality: { locality: { id: string; } }[]
  totalExpYearStart: string | null;
  totalExpYearEnd: string | null;
  numberSystem: string;
  recurrence: string;
  currency: string;
  keyResponsibility: string
  employmentType: string
  payScaleUpperRange: string;
  payScaleLowerRange: string;
  hideSalaryDetails: boolean
  companyType: string | null;
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
  company: string | null
  isDraft: boolean
  companyWebsite: string
  aboutCompany: string
  companyAddress: string
  user: string
  status: boolean

}


export interface PostRequirementDraft {
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
  totalExpYearStart: string | null;
  totalExpYearEnd: string | null;
  numberSystem: string;
  recurrence: string;
  currency: string;
  keyResponsibility: string
  employmentType: string
  payScaleUpperRange: string;
  payScaleLowerRange: string;
  hideSalaryDetails: boolean
  companyType: string | null;
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
  company: string | null
  isDraft: boolean
  companyWebsite: string
  aboutCompany: string
  companyAddress: string
  user: string
  status: boolean

}



export interface PostCompanyDraft {
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
  totalExpYearStart: string | null;
  totalExpYearEnd: string | null;
  numberSystem: string;
  recurrence: string;
  currency: string;
  keyResponsibility: string
  employmentType: string
  payScaleUpperRange: string;
  payScaleLowerRange: string;
  hideSalaryDetails: boolean
  companyType: string | null;
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
  isDraft: boolean
  companyWebsite: string
  aboutCompany: string
  companyAddress: string
  user: string
  status: boolean

}



export interface IFormInputsCompanyDraft {
  title: string
  jobsType: { value: string; label: string; }
  employmentType: { value: string; label: string; }
  keySkills: string[]
  education: string[]
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
  companyType: { value: string; label: string; }
  company: string
  companyName: { value: string; label: string; }
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
  companyWebsite: string
  aboutCompany: string
  companyAddress: string
  fillCompanyInformation: boolean
  // receiveUpdateOnEmail: string[]

}


export interface PostResponseDraft {
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
  totalExpYearStart: string | null;
  totalExpYearEnd: string | null;
  numberSystem: string;
  recurrence: string;
  currency: string;
  keyResponsibility: string
  employmentType: string
  payScaleUpperRange: string;
  payScaleLowerRange: string;
  hideSalaryDetails: boolean
  companyType: string | null;
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
  isDraft: boolean
  companyWebsite: string
  aboutCompany: string
  companyAddress: string
  user: string
  status: boolean

}

export interface IFormInputsResponseDraft {
  title: string
  jobsType: { value: string; label: string; }
  employmentType: { value: string; label: string; }
  keySkills: string[]
  education: string[]
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
  companyType: { value: string; label: string; }
  company: string
  companyName: { value: string; label: string; }
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
  companyWebsite: string
  aboutCompany: string
  companyAddress: string
  fillCompanyInformation: boolean
  // receiveUpdateOnEmail: string[]

}


export interface IFormInputsJobDetailSave {
  title: string
  toSalaryRange: { value: string; label: string; }
  fromSalaryRange: { value: string; label: string; }
  jobsOpening: number
  jobDescription: string
  numberSystem: { value: string; label: string; }
  recurrence: { value: string; label: string; }
  jobLocation: string[]
  jobsType: { value: string; label: string; }
  jobsRole: { value: string; label: string; }
  department: { value: string; label: string; }
  roleCategory: { value: string; label: string; }
  employmentType: { value: string; label: string; }
  workMode: { value: string; label: string; }
  candidateRelocate: boolean
  currency: { value: string; label: string; }
  keyResponsibility: string
}


export interface PostJobDetailSave {
  id: number | null
  title: string
  payScaleUpperRange: string;
  payScaleLowerRange: string;
  jobsOpening: number
  userType: string
  jobDescription: string
  numberSystem: string;
  recurrence: string;
  jobsLocation: { location: { id: string }; }[]
  jobsType: string;
  jobsRole: string;
  department: string;
  roleCategory: string;
  user: string
  status: boolean
  isDraft: boolean
  employmentType: string
  workMode: string;
  candidateRelocate: boolean
  currency: string;
  keyResponsibility: string
}


export interface PostRequirementSave {
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
  totalExpYearStart: string | null;
  totalExpYearEnd: string | null;
  numberSystem: string;
  recurrence: string;
  currency: string;
  keyResponsibility: string
  employmentType: string
  payScaleUpperRange: string;
  payScaleLowerRange: string;
  companyType: string | null;
  jobEducation: { education: { id: string }; }[]
  premiumBTech: boolean
  premiumMBAAll: boolean
  jobCandidateIndustry: { candidateIndustry: { id: string; } }[]
  diversityHiring: boolean
  jobDescription: string
  jobsOpening: number
  userType: string
  isDraft: boolean
  user: string
  status: boolean

}


export interface IFormInputsRequirementSave {
  title: string
  jobsType: { value: string; label: string; }
  employmentType: { value: string; label: string; }
  keySkills: string[]
  education: string[]
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
  companyType: { value: string; label: string; }
  highestQualification: string[]
  premiumBTech: boolean
  premiumMBAAll: boolean
  candidateIndustry: string[]
  diversityHiring: boolean
  jobDescription: string
  jobsOpening: number
  keyResponsibility: string
  // receiveUpdateOnEmail: string[]

}


export interface PostCompanySave {
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
  totalExpYearStart: string | null;
  totalExpYearEnd: string | null;
  numberSystem: string;
  recurrence: string;
  currency: string;
  keyResponsibility: string
  employmentType: string
  payScaleUpperRange: string;
  payScaleLowerRange: string;
  companyType: string | null;
  jobEducation: { education: { id: string }; }[]
  premiumBTech: boolean
  hideCompanyRating: boolean
  premiumMBAAll: boolean
  jobCandidateIndustry: { candidateIndustry: { id: string; } }[]
  diversityHiring: boolean
  jobDescription: string
  jobsOpening: number
  userType: string
  company: string
  isDraft: boolean
  companyWebsite: string
  aboutCompany: string
  companyAddress: string
  user: string
  status: boolean

}


export interface IFormInputsCompanySave {
  title: string
  jobsType: { value: string; label: string; }
  employmentType: { value: string; label: string; }
  keySkills: string[]
  education: string[]
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
  companyType: { value: string; label: string; }
  company: string
  companyName: { value: string; label: string; }
  highestQualification: string[]
  premiumBTech: boolean
  premiumMBAAll: boolean
  candidateIndustry: string[]
  diversityHiring: boolean
  jobDescription: string
  jobsOpening: number
  hideCompanyRating: boolean
  keyResponsibility: string
  companyWebsite: string
  aboutCompany: string
  companyAddress: string
  fillCompanyInformation: boolean
  // receiveUpdateOnEmail: string[]

}
