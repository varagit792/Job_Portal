export interface IFormApplyJobs {
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
  jobExpiry: { value: number; label: string; }
  jobStatus: { value: number; label: string; }
  roleCategory: { value: string; label: string; }
  jobDescription: string
  jobsOpening: number
  keyResponsibility: string

}